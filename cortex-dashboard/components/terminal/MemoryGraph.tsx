'use client'

import { useCallback, useState } from 'react'
import { motion } from 'framer-motion'
import ReactFlow, {
  Node,
  Edge,
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
  addEdge,
  Connection,
} from 'reactflow'
import 'reactflow/dist/style.css'
import { Flame, Sun, Snowflake, Shield, AlertTriangle } from 'lucide-react'

const initialNodes: Node[] = [
  // Harvey AI - Legal Research
  {
    id: 'mem_harvey_001',
    type: 'custom',
    position: { x: 100, y: 50 },
    data: {
      label: 'Ross v. Jenkins (2019)',
      criticality: 0.85,
      tier: 'hot',
      retrievals: 234,
    },
  },
  {
    id: 'mem_harvey_002',
    type: 'custom',
    position: { x: 300, y: 50 },
    data: {
      label: 'State Bar Ethics (2022)',
      criticality: 0.82,
      tier: 'hot',
      retrievals: 187,
      contradicts: 'mem_harvey_001'
    },
  },

  // Intercom - Customer Support
  {
    id: 'mem_intercom_001',
    type: 'custom',
    position: { x: 100, y: 200 },
    data: {
      label: 'OLD: Enterprise $499',
      criticality: 0.75,
      tier: 'warm',
      retrievals: 1842,
    },
  },
  {
    id: 'mem_intercom_002',
    type: 'custom',
    position: { x: 300, y: 200 },
    data: {
      label: 'NEW: Tiered $199-$799',
      criticality: 0.95,
      tier: 'hot',
      retrievals: 412,
      contradicts: 'mem_intercom_001'
    },
  },

  // Perplexity AI - Location
  {
    id: 'mem_perplexity_001',
    type: 'custom',
    position: { x: 500, y: 50 },
    data: {
      label: 'Lives in NYC',
      criticality: 0.65,
      tier: 'warm',
      retrievals: 823,
    },
  },
  {
    id: 'mem_perplexity_002',
    type: 'custom',
    position: { x: 500, y: 200 },
    data: {
      label: 'Currently in London',
      criticality: 0.85,
      tier: 'hot',
      retrievals: 156,
      contradicts: 'mem_perplexity_001'
    },
  },

  // Replit Agent - Code Generation
  {
    id: 'mem_replit_001',
    type: 'custom',
    position: { x: 100, y: 350 },
    data: {
      label: 'Prefers React classes',
      criticality: 0.45,
      tier: 'warm',
      retrievals: 567,
    },
  },
  {
    id: 'mem_replit_002',
    type: 'custom',
    position: { x: 300, y: 350 },
    data: {
      label: 'Project: React 18 hooks',
      criticality: 0.90,
      tier: 'hot',
      retrievals: 94,
      contradicts: 'mem_replit_001'
    },
  },

  // Personal AI - Credentials
  {
    id: 'mem_personal_001',
    type: 'custom',
    position: { x: 500, y: 350 },
    data: {
      label: 'WiFi credentials',
      criticality: 0.95,
      tier: 'hot',
      retrievals: 23,
      safety: true
    },
  },
  {
    id: 'mem_personal_002',
    type: 'custom',
    position: { x: 500, y: 480 },
    data: {
      label: 'Screen sharing context',
      criticality: 0.70,
      tier: 'hot',
      retrievals: 45,
    },
  },
]

const initialEdges: Edge[] = [
  // Harvey AI - contradiction between precedents
  { id: 'e_harvey', source: 'mem_harvey_001', target: 'mem_harvey_002', animated: false, style: { stroke: '#ef4444', strokeDasharray: '5,5' } },

  // Intercom - stale vs new pricing
  { id: 'e_intercom', source: 'mem_intercom_001', target: 'mem_intercom_002', animated: false, style: { stroke: '#ef4444', strokeDasharray: '5,5' } },

  // Perplexity - location temporal conflict
  { id: 'e_perplexity', source: 'mem_perplexity_001', target: 'mem_perplexity_002', animated: false, style: { stroke: '#f59e0b', strokeDasharray: '5,5' } },

  // Replit - framework version conflict
  { id: 'e_replit', source: 'mem_replit_001', target: 'mem_replit_002', animated: false, style: { stroke: '#ef4444', strokeDasharray: '5,5' } },

  // Personal AI - safety link between credentials and context
  { id: 'e_personal', source: 'mem_personal_001', target: 'mem_personal_002', animated: true, style: { stroke: '#10b981' } },
]

function CustomNode({ data }: { data: any }) {
  const getTierIcon = () => {
    switch (data.tier) {
      case 'hot': return <Flame className="w-3 h-3 text-red-400" />
      case 'warm': return <Sun className="w-3 h-3 text-amber-400" />
      case 'cold': return <Snowflake className="w-3 h-3 text-blue-400" />
    }
  }

  const getTierColor = () => {
    switch (data.tier) {
      case 'hot': return 'border-red-500/50 bg-red-500/10'
      case 'warm': return 'border-amber-500/50 bg-amber-500/10'
      case 'cold': return 'border-blue-500/50 bg-blue-500/10'
    }
  }

  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      className={`px-3 py-2 rounded-lg border ${getTierColor()} backdrop-blur-sm min-w-[140px]`}
      whileHover={{ scale: 1.05 }}
    >
      <div className="flex items-center gap-2 mb-1">
        {getTierIcon()}
        {data.safety && <Shield className="w-3 h-3 text-green-400" />}
        {data.contradicts && <AlertTriangle className="w-3 h-3 text-red-400" />}
        <span className="text-[10px] font-mono text-zinc-600">
          {data.retrievals} ret
        </span>
      </div>
      <div className="text-xs font-medium text-zinc-200 mb-1">
        {data.label}
      </div>
      <div className="flex items-center gap-1">
        <div className="flex-1 h-1 bg-zinc-800 rounded-full overflow-hidden">
          <div
            className={`h-full ${
              data.criticality >= 0.7 ? 'bg-red-500' : data.criticality >= 0.4 ? 'bg-amber-500' : 'bg-green-500'
            }`}
            style={{ width: `${data.criticality * 100}%` }}
          />
        </div>
        <span className="text-[9px] font-mono text-zinc-500">
          {(data.criticality * 100).toFixed(0)}
        </span>
      </div>
    </motion.div>
  )
}

const nodeTypes = {
  custom: CustomNode,
}

export default function MemoryGraph({ selectedMemory }: { selectedMemory: string | null }) {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes)
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges)

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  )

  return (
    <div className="flex-1 relative bg-black/20">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        fitView
        className="bg-transparent"
      >
        <Background color="#27272a" gap={20} size={1} />
        <Controls className="bg-zinc-900 border border-zinc-800" />
        <MiniMap
          className="bg-zinc-900/50 border border-zinc-800"
          nodeColor={(node) => {
            const tier = node.data.tier
            return tier === 'hot' ? '#ef4444' : tier === 'warm' ? '#f59e0b' : '#3b82f6'
          }}
        />
      </ReactFlow>

      {/* Legend */}
      <div className="absolute bottom-4 left-4 glass-strong rounded-lg p-3 border border-zinc-800/50">
        <div className="text-[10px] text-zinc-500 uppercase tracking-wide mb-2">Legend</div>
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded border border-red-500/50 bg-red-500/10" />
            <span className="text-xs text-zinc-400">Hot Tier</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded border border-amber-500/50 bg-amber-500/10" />
            <span className="text-xs text-zinc-400">Warm Tier</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded border border-blue-500/50 bg-blue-500/10" />
            <span className="text-xs text-zinc-400">Cold Tier</span>
          </div>
          <div className="border-t border-zinc-800 my-1.5" />
          <div className="flex items-center gap-2">
            <div className="w-3 h-0.5 bg-red-500" style={{ borderTop: '1px dashed' }} />
            <span className="text-xs text-zinc-400">Contradiction</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-0.5 bg-green-500" />
            <span className="text-xs text-zinc-400">Retrieval link</span>
          </div>
        </div>
      </div>
    </div>
  )
}
