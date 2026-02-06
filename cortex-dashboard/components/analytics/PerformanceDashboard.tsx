'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { TrendingUp, Zap, Target, Activity, Clock, Users } from 'lucide-react'

interface MetricPoint {
  timestamp: Date
  value: number
}

export default function PerformanceDashboard() {
  const [queryThroughput, setQueryThroughput] = useState<MetricPoint[]>([])
  const [latency, setLatency] = useState<MetricPoint[]>([])
  const [accuracy, setAccuracy] = useState<MetricPoint[]>([])

  useEffect(() => {
    // Simulate real-time data
    const interval = setInterval(() => {
      const now = new Date()

      setQueryThroughput(prev => [
        ...prev.slice(-29),
        { timestamp: now, value: 1000 + Math.random() * 500 }
      ])

      setLatency(prev => [
        ...prev.slice(-29),
        { timestamp: now, value: 10 + Math.random() * 5 }
      ])

      setAccuracy(prev => [
        ...prev.slice(-29),
        { timestamp: now, value: 90 + Math.random() * 8 }
      ])
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  const currentThroughput = queryThroughput[queryThroughput.length - 1]?.value || 0
  const currentLatency = latency[latency.length - 1]?.value || 0
  const currentAccuracy = accuracy[accuracy.length - 1]?.value || 0

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-3 border-b border-zinc-800/50 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Activity className="w-4 h-4 text-green-400" />
          <span className="text-xs font-bold text-zinc-300 uppercase">Real-Time Performance</span>
        </div>
        <div className="flex items-center gap-1.5 text-[10px] text-zinc-600">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          <span>LIVE</span>
        </div>
      </div>

      {/* KPIs */}
      <div className="p-3 grid grid-cols-3 gap-2">
        <div className="bg-zinc-900/30 border border-zinc-800/50 rounded-lg p-3">
          <div className="flex items-center gap-2 mb-2">
            <Zap className="w-3.5 h-3.5 text-amber-400" />
            <div className="text-[10px] text-zinc-600 uppercase font-bold">Throughput</div>
          </div>
          <div className="text-2xl font-bold text-amber-400 font-mono">{currentThroughput.toFixed(0)}</div>
          <div className="text-[10px] text-zinc-600">queries/min</div>
          <div className="mt-1 flex items-center gap-1 text-[10px]">
            <TrendingUp className="w-3 h-3 text-green-400" />
            <span className="text-green-400 font-bold">+12%</span>
            <span className="text-zinc-600">vs last hour</span>
          </div>
        </div>

        <div className="bg-zinc-900/30 border border-zinc-800/50 rounded-lg p-3">
          <div className="flex items-center gap-2 mb-2">
            <Clock className="w-3.5 h-3.5 text-blue-400" />
            <div className="text-[10px] text-zinc-600 uppercase font-bold">Avg Latency</div>
          </div>
          <div className="text-2xl font-bold text-blue-400 font-mono">{currentLatency.toFixed(1)}<span className="text-sm">ms</span></div>
          <div className="text-[10px] text-zinc-600">p50 latency</div>
          <div className="mt-1 flex items-center gap-1 text-[10px]">
            <TrendingUp className="w-3 h-3 text-green-400" />
            <span className="text-green-400 font-bold">-8%</span>
            <span className="text-zinc-600">improvement</span>
          </div>
        </div>

        <div className="bg-zinc-900/30 border border-zinc-800/50 rounded-lg p-3">
          <div className="flex items-center gap-2 mb-2">
            <Target className="w-3.5 h-3.5 text-green-400" />
            <div className="text-[10px] text-zinc-600 uppercase font-bold">Accuracy</div>
          </div>
          <div className="text-2xl font-bold text-green-400 font-mono">{currentAccuracy.toFixed(1)}<span className="text-sm">%</span></div>
          <div className="text-[10px] text-zinc-600">retrieval accuracy</div>
          <div className="mt-1 flex items-center gap-1 text-[10px]">
            <TrendingUp className="w-3 h-3 text-green-400" />
            <span className="text-green-400 font-bold">+2.3%</span>
            <span className="text-zinc-600">this week</span>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="flex-1 p-3 space-y-3 overflow-y-auto">
        {/* Throughput Chart */}
        <div className="bg-zinc-900/30 border border-zinc-800/50 rounded-lg p-3">
          <div className="text-[10px] text-zinc-500 uppercase font-bold mb-3">Query Throughput (Last 30s)</div>
          <div className="relative h-20">
            <svg className="w-full h-full" viewBox="0 0 300 80" preserveAspectRatio="none">
              {/* Grid lines */}
              {[0, 25, 50, 75].map(y => (
                <line
                  key={y}
                  x1="0"
                  y1={y}
                  x2="300"
                  y2={y}
                  stroke="#27272a"
                  strokeWidth="0.5"
                />
              ))}

              {/* Area chart */}
              {queryThroughput.length > 1 && (
                <motion.path
                  d={`
                    M 0 80
                    ${queryThroughput.map((point, i) => {
                      const x = (i / 29) * 300
                      const y = 80 - ((point.value - 500) / 1000) * 80
                      return `L ${x} ${y}`
                    }).join(' ')}
                    L 300 80 Z
                  `}
                  fill="url(#throughputGradient)"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.5 }}
                />
              )}

              {/* Line */}
              {queryThroughput.length > 1 && (
                <motion.path
                  d={`
                    M ${queryThroughput.map((point, i) => {
                      const x = (i / 29) * 300
                      const y = 80 - ((point.value - 500) / 1000) * 80
                      return `${x},${y}`
                    }).join(' L ')}
                  `}
                  stroke="#f59e0b"
                  strokeWidth="2"
                  fill="none"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                />
              )}

              <defs>
                <linearGradient id="throughputGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.5" />
                  <stop offset="100%" stopColor="#f59e0b" stopOpacity="0" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>

        {/* Latency Chart */}
        <div className="bg-zinc-900/30 border border-zinc-800/50 rounded-lg p-3">
          <div className="text-[10px] text-zinc-500 uppercase font-bold mb-3">Latency (Last 30s)</div>
          <div className="relative h-20">
            <svg className="w-full h-full" viewBox="0 0 300 80" preserveAspectRatio="none">
              {/* Grid lines */}
              {[0, 25, 50, 75].map(y => (
                <line
                  key={y}
                  x1="0"
                  y1={y}
                  x2="300"
                  y2={y}
                  stroke="#27272a"
                  strokeWidth="0.5"
                />
              ))}

              {/* Area chart */}
              {latency.length > 1 && (
                <motion.path
                  d={`
                    M 0 80
                    ${latency.map((point, i) => {
                      const x = (i / 29) * 300
                      const y = 80 - ((point.value - 5) / 15) * 80
                      return `L ${x} ${y}`
                    }).join(' ')}
                    L 300 80 Z
                  `}
                  fill="url(#latencyGradient)"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.5 }}
                />
              )}

              {/* Line */}
              {latency.length > 1 && (
                <motion.path
                  d={`
                    M ${latency.map((point, i) => {
                      const x = (i / 29) * 300
                      const y = 80 - ((point.value - 5) / 15) * 80
                      return `${x},${y}`
                    }).join(' L ')}
                  `}
                  stroke="#3b82f6"
                  strokeWidth="2"
                  fill="none"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                />
              )}

              <defs>
                <linearGradient id="latencyGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.5" />
                  <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>

        {/* Agent Performance Breakdown */}
        <div className="bg-zinc-900/30 border border-zinc-800/50 rounded-lg p-3">
          <div className="text-[10px] text-zinc-500 uppercase font-bold mb-3">Agent Performance</div>
          <div className="space-y-2">
            {[
              { name: 'Legal Research', accuracy: 96.2, latency: 11, color: 'bg-red-500' },
              { name: 'Email Writer', accuracy: 94.8, latency: 8, color: 'bg-blue-500' },
              { name: 'Data Analysis', accuracy: 97.1, latency: 15, color: 'bg-green-500' },
              { name: 'Code Gen', accuracy: 92.3, latency: 11, color: 'bg-amber-500' },
            ].map((agent, i) => (
              <div key={i} className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${agent.color}`} />
                <div className="flex-1 text-[10px] text-zinc-400">{agent.name}</div>
                <div className="text-[10px] text-green-400 font-bold">{agent.accuracy}%</div>
                <div className="text-[10px] text-blue-400 font-mono">{agent.latency}ms</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
