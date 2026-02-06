'use client'

import { useState, useEffect } from 'react'
import { Activity, ArrowLeft, AlertTriangle, CheckCircle, XCircle, TrendingUp } from 'lucide-react'
import Link from 'next/link'
import { motion } from 'framer-motion'

export default function HealthPage() {
  const [healthScore, setHealthScore] = useState(94.7)

  useEffect(() => {
    const interval = setInterval(() => {
      setHealthScore(prev => Math.max(85, Math.min(99, prev + (Math.random() - 0.5) * 2)))
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  const contradictions = [
    {
      id: 'cont_001',
      severity: 'high',
      memories: ['mem_042315', 'mem_089234'],
      description: 'Conflicting legal precedents for case #2023-45',
      confidence: 0.92,
      detected: '2 hours ago'
    },
    {
      id: 'cont_002',
      severity: 'medium',
      memories: ['mem_123456', 'mem_654321'],
      description: 'Inconsistent financial projections Q4',
      confidence: 0.87,
      detected: '5 hours ago'
    },
    {
      id: 'cont_003',
      severity: 'low',
      memories: ['mem_098765', 'mem_567890'],
      description: 'Minor discrepancy in customer data',
      confidence: 0.73,
      detected: '1 day ago'
    }
  ]

  const metrics = [
    { label: 'Total Checks', value: '4.2M', change: '+12%', status: 'good' },
    { label: 'Contradictions Found', value: '23', change: '-45%', status: 'good' },
    { label: 'Resolution Rate', value: '98.2%', change: '+2.3%', status: 'good' },
    { label: 'Avg Detection Time', value: '3.2ms', change: '-18%', status: 'good' },
    { label: 'False Positives', value: '0.8%', change: '-12%', status: 'good' },
    { label: 'System Uptime', value: '99.97%', change: '+0.02%', status: 'good' }
  ]

  return (
    <div className="min-h-screen bg-black text-zinc-200 font-mono">
      {/* Header */}
      <div className="border-b border-zinc-800/50 bg-zinc-950 sticky top-0 z-50">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/">
                <button className="p-2 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 hover:border-zinc-700 transition-colors">
                  <ArrowLeft className="w-4 h-4 text-zinc-400" />
                </button>
              </Link>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-green-500/10 border border-green-500/30">
                  <Activity className="w-5 h-5 text-green-400" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-zinc-200">Health Monitor</h1>
                  <p className="text-xs text-zinc-500">Contradiction detection • Quality metrics</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 max-w-7xl mx-auto">
        {/* Health Score */}
        <div className="mb-8 p-8 rounded-2xl bg-gradient-to-br from-zinc-900 to-zinc-950 border border-zinc-800">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-zinc-200 mb-2">System Health Score</h2>
              <p className="text-sm text-zinc-500">Real-time quality assessment</p>
            </div>
            <motion.div
              className="relative"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <div className="absolute inset-0 bg-green-500 blur-3xl opacity-30" />
              <div className="relative text-6xl font-bold text-green-400">
                {healthScore.toFixed(1)}<span className="text-3xl">%</span>
              </div>
            </motion.div>
          </div>

          <div className="h-3 bg-zinc-800 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-green-500 to-emerald-400"
              initial={{ width: 0 }}
              animate={{ width: `${healthScore}%` }}
              transition={{ duration: 1, ease: 'easeOut' }}
            />
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {metrics.map((metric, i) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="p-4 rounded-lg bg-zinc-900 border border-zinc-800 hover:border-zinc-700 transition-colors"
            >
              <div className="text-xs text-zinc-600 mb-2 uppercase tracking-wider">
                {metric.label}
              </div>
              <div className="flex items-baseline gap-2 mb-1">
                <span className="text-2xl font-bold text-zinc-200">{metric.value}</span>
                <span className={`text-xs font-mono ${
                  metric.change.startsWith('+') || metric.change.includes('-') && !metric.change.startsWith('-')
                    ? 'text-green-400'
                    : 'text-red-400'
                }`}>
                  {metric.change}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Active Contradictions */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-zinc-200">Active Contradictions</h2>
            <button className="px-3 py-1.5 rounded-lg bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/30 text-xs text-blue-400 transition-colors">
              Run Full Scan
            </button>
          </div>

          <div className="space-y-3">
            {contradictions.map((item, i) => {
              const severityColors = {
                high: { bg: 'bg-red-500/10', border: 'border-red-500/30', text: 'text-red-400', icon: XCircle },
                medium: { bg: 'bg-yellow-500/10', border: 'border-yellow-500/30', text: 'text-yellow-400', icon: AlertTriangle },
                low: { bg: 'bg-blue-500/10', border: 'border-blue-500/30', text: 'text-blue-400', icon: CheckCircle }
              }
              const colors = severityColors[item.severity as keyof typeof severityColors]
              const Icon = colors.icon

              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className={`p-4 rounded-lg ${colors.bg} border ${colors.border} hover:border-opacity-50 transition-colors cursor-pointer`}
                >
                  <div className="flex items-start gap-4">
                    <Icon className={`w-5 h-5 ${colors.text} mt-0.5`} />
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-sm font-mono font-bold text-zinc-200">{item.id}</span>
                        <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded ${colors.bg} border ${colors.border} ${colors.text}`}>
                          {item.severity}
                        </span>
                        <span className="text-xs text-zinc-600">{item.detected}</span>
                      </div>
                      <p className="text-sm text-zinc-400 mb-2">{item.description}</p>
                      <div className="flex items-center gap-3 text-xs">
                        <span className="text-zinc-600">Memories:</span>
                        {item.memories.map(mem => (
                          <span key={mem} className="font-mono text-blue-400">{mem}</span>
                        ))}
                        <span className="text-zinc-600">•</span>
                        <span className="text-zinc-600">Confidence:</span>
                        <span className="font-mono text-green-400">{(item.confidence * 100).toFixed(1)}%</span>
                      </div>
                    </div>
                    <button className="px-3 py-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-xs text-zinc-400 transition-colors">
                      Resolve
                    </button>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
