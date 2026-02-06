'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Network, Maximize2, Filter, Search, ZoomIn, ZoomOut, Play } from 'lucide-react'

interface Node {
  id: string
  label: string
  cluster: number
  connections: number
  criticality: number
  x: number
  y: number
}

const generateNodes = (): Node[] => {
  const clusters = ['legal', 'email', 'data', 'support', 'search']
  const nodes: Node[] = []

  for (let i = 0; i < 50; i++) {
    nodes.push({
      id: `mem_${i}`,
      label: `Memory ${i}`,
      cluster: i % 5,
      connections: Math.floor(Math.random() * 10) + 1,
      criticality: Math.random(),
      x: Math.random() * 100,
      y: Math.random() * 100
    })
  }

  return nodes
}

export default function MemoryGraph() {
  const [nodes, setNodes] = useState<Node[]>(generateNodes())
  const [selectedCluster, setSelectedCluster] = useState<number | null>(null)
  const [isAnimating, setIsAnimating] = useState(false)
  const [zoom, setZoom] = useState(1)

  useEffect(() => {
    // Simulate physics animation
    if (isAnimating) {
      const interval = setInterval(() => {
        setNodes(prev => prev.map(node => ({
          ...node,
          x: node.x + (Math.random() - 0.5) * 2,
          y: node.y + (Math.random() - 0.5) * 2
        })))
      }, 100)

      setTimeout(() => setIsAnimating(false), 2000)
      return () => clearInterval(interval)
    }
  }, [isAnimating])

  const clusterColors = [
    'bg-red-500',
    'bg-blue-500',
    'bg-green-500',
    'bg-amber-500',
    'bg-purple-500'
  ]

  const clusterNames = ['Legal', 'Email', 'Data', 'Support', 'Search']

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-3 border-b border-zinc-800/50 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Network className="w-4 h-4 text-purple-400" />
          <span className="text-xs font-bold text-zinc-300 uppercase">Memory Relationship Graph</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsAnimating(true)}
            disabled={isAnimating}
            className="p-1.5 rounded bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-zinc-200 border border-zinc-800 transition-all disabled:opacity-50"
            title="Animate"
          >
            <Play className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setZoom(z => Math.max(0.5, z - 0.1))}
            className="p-1.5 rounded bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-zinc-200 border border-zinc-800 transition-all"
            title="Zoom Out"
          >
            <ZoomOut className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setZoom(z => Math.min(2, z + 0.1))}
            className="p-1.5 rounded bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-zinc-200 border border-zinc-800 transition-all"
            title="Zoom In"
          >
            <ZoomIn className="w-3.5 h-3.5" />
          </button>
          <button className="p-1.5 rounded bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-zinc-200 border border-zinc-800 transition-all">
            <Maximize2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Cluster Legend */}
      <div className="p-3 border-b border-zinc-800/50 flex items-center gap-3 flex-wrap">
        <span className="text-[10px] text-zinc-600 uppercase">Clusters:</span>
        {clusterNames.map((name, i) => (
          <button
            key={i}
            onClick={() => setSelectedCluster(selectedCluster === i ? null : i)}
            className={`flex items-center gap-1.5 px-2 py-1 rounded text-[10px] font-medium transition-all ${
              selectedCluster === i
                ? 'bg-zinc-800 text-zinc-200 border border-zinc-700'
                : 'text-zinc-500 hover:text-zinc-300 hover:bg-zinc-900'
            }`}
          >
            <div className={`w-2 h-2 rounded-full ${clusterColors[i]}`} />
            {name}
            <span className="text-zinc-600">({nodes.filter(n => n.cluster === i).length})</span>
          </button>
        ))}
      </div>

      {/* Graph Canvas */}
      <div className="flex-1 relative bg-[#050508] overflow-hidden">
        {/* Grid */}
        <div className="absolute inset-0" style={{
          backgroundImage: 'linear-gradient(#18181b 1px, transparent 1px), linear-gradient(90deg, #18181b 1px, transparent 1px)',
          backgroundSize: '20px 20px',
          opacity: 0.3
        }} />

        {/* Connections (Lines) */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          {nodes.map((node, i) => {
            // Draw connections to nearby nodes
            return nodes.slice(i + 1, i + 4).map((target, j) => {
              if (selectedCluster !== null && node.cluster !== selectedCluster && target.cluster !== selectedCluster) {
                return null
              }

              return (
                <motion.line
                  key={`${node.id}-${target.id}`}
                  x1={`${node.x}%`}
                  y1={`${node.y}%`}
                  x2={`${target.x}%`}
                  y2={`${target.y}%`}
                  stroke={node.cluster === target.cluster ? '#3b82f6' : '#52525b'}
                  strokeWidth="1"
                  strokeOpacity={node.cluster === target.cluster ? 0.4 : 0.1}
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1, delay: i * 0.01 }}
                />
              )
            })
          })}
        </svg>

        {/* Nodes */}
        <div className="absolute inset-0" style={{ transform: `scale(${zoom})`, transformOrigin: 'center' }}>
          {nodes.map((node, i) => {
            if (selectedCluster !== null && node.cluster !== selectedCluster) {
              return null
            }

            const size = 8 + (node.criticality * 12) // 8-20px based on criticality

            return (
              <motion.div
                key={node.id}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.02 }}
                className="absolute group cursor-pointer"
                style={{
                  left: `${node.x}%`,
                  top: `${node.y}%`,
                  width: `${size}px`,
                  height: `${size}px`,
                  transform: 'translate(-50%, -50%)'
                }}
              >
                <div className={`w-full h-full rounded-full ${clusterColors[node.cluster]} opacity-80 group-hover:opacity-100 group-hover:scale-150 transition-all`} />

                {/* Tooltip */}
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-zinc-900 border border-zinc-700 rounded text-[9px] text-zinc-300 whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-10">
                  <div className="font-mono font-bold">{node.id}</div>
                  <div className="text-zinc-500">Cluster: {clusterNames[node.cluster]}</div>
                  <div className="text-zinc-500">Connections: {node.connections}</div>
                  <div className="text-zinc-500">Criticality: {(node.criticality * 100).toFixed(0)}%</div>
                </div>

                {/* Pulse effect for high criticality */}
                {node.criticality > 0.8 && (
                  <div className={`absolute inset-0 rounded-full ${clusterColors[node.cluster]} animate-ping opacity-20`} />
                )}
              </motion.div>
            )
          })}
        </div>

        {/* Info Panel */}
        <div className="absolute bottom-3 left-3 bg-zinc-900/80 backdrop-blur-sm border border-zinc-800 rounded-lg p-3 space-y-2">
          <div className="text-[10px] text-zinc-500 uppercase font-bold">Graph Stats</div>
          <div className="space-y-1 text-[11px]">
            <div className="flex items-center justify-between gap-4">
              <span className="text-zinc-600">Total Nodes:</span>
              <span className="text-zinc-300 font-bold">{selectedCluster !== null ? nodes.filter(n => n.cluster === selectedCluster).length : nodes.length}</span>
            </div>
            <div className="flex items-center justify-between gap-4">
              <span className="text-zinc-600">Avg Connections:</span>
              <span className="text-zinc-300 font-bold">{(nodes.reduce((sum, n) => sum + n.connections, 0) / nodes.length).toFixed(1)}</span>
            </div>
            <div className="flex items-center justify-between gap-4">
              <span className="text-zinc-600">Zoom Level:</span>
              <span className="text-zinc-300 font-bold">{(zoom * 100).toFixed(0)}%</span>
            </div>
          </div>
        </div>

        {/* Conflict Zone Indicator */}
        <div className="absolute top-3 right-3 bg-red-500/10 backdrop-blur-sm border border-red-500/30 rounded-lg p-2 flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
          <span className="text-[10px] text-red-400 font-bold">3 Conflict Zones Detected</span>
        </div>
      </div>
    </div>
  )
}
