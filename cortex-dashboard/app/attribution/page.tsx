'use client'

import { useState } from 'react'
import { Brain, ArrowLeft, Sparkles, TrendingUp } from 'lucide-react'
import Link from 'next/link'
import { motion } from 'framer-motion'

export default function AttributionPage() {
  const [runningAnalysis, setRunningAnalysis] = useState(false)

  const recentAnalyses = Array.from({ length: 15 }, (_, i) => ({
    id: `attr_${String(i).padStart(4, '0')}`,
    query: ['Legal case precedent', 'Financial forecast', 'HR policy check', 'Sales pipeline'][Math.floor(Math.random() * 4)],
    memoriesAnalyzed: Math.floor(Math.random() * 5000 + 1000),
    topContributor: `mem_${String(Math.floor(Math.random() * 100000)).padStart(6, '0')}`,
    shapleyValue: (Math.random() * 0.5 + 0.3).toFixed(4),
    computeTime: (Math.random() * 20 + 3).toFixed(1),
    timestamp: new Date(Date.now() - Math.random() * 86400000 * 7).toISOString()
    }))

  const topMemories = [
    { id: 'mem_042315', shapley: 0.8234, impact: 'critical', uses: 4521 },
    { id: 'mem_089234', shapley: 0.7891, impact: 'high', uses: 3892 },
    { id: 'mem_156789', shapley: 0.7456, impact: 'high', uses: 3421 },
    { id: 'mem_234567', shapley: 0.6823, impact: 'medium', uses: 2987 },
    { id: 'mem_345678', shapley: 0.6234, impact: 'medium', uses: 2654 }
  ]

  const runAnalysis = () => {
    setRunningAnalysis(true)
    setTimeout(() => setRunningAnalysis(false), 3000)
  }

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
                <div className="p-2 rounded-lg bg-cyan-500/10 border border-cyan-500/30">
                  <Brain className="w-5 h-5 text-cyan-400" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-zinc-200">Attribution Engine</h1>
                  <p className="text-xs text-zinc-500">Amortized Shapley analysis</p>
                </div>
              </div>
            </div>
            <button
              onClick={runAnalysis}
              disabled={runningAnalysis}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 text-sm text-cyan-400 transition-colors disabled:opacity-50"
            >
              <Sparkles className="w-4 h-4" />
              {runningAnalysis ? 'Running...' : 'Run Analysis'}
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 max-w-7xl mx-auto">
        {/* Stats */}
        <div className="grid grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Total Analyses', value: '12.4K', change: '+18%' },
            { label: 'Avg Compute Time', value: '8.2ms', change: '-23%' },
            { label: 'Memories Analyzed', value: '1.24M', change: '+12%' },
            { label: 'Accuracy', value: '96.8%', change: '+2.1%' }
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="p-4 rounded-lg bg-zinc-900 border border-zinc-800"
            >
              <div className="text-xs text-zinc-600 mb-2 uppercase tracking-wider">
                {stat.label}
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold text-zinc-200">{stat.value}</span>
                <span className="text-xs font-mono text-green-400">{stat.change}</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Top Contributing Memories */}
        <div className="mb-8">
          <h2 className="text-lg font-bold text-zinc-200 mb-4">Top Contributing Memories</h2>
          <div className="space-y-3">
            {topMemories.map((mem, i) => {
              const impactColors = {
                critical: 'text-red-400 bg-red-500/10 border-red-500/30',
                high: 'text-yellow-400 bg-yellow-500/10 border-yellow-500/30',
                medium: 'text-blue-400 bg-blue-500/10 border-blue-500/30'
              }
              return (
                <motion.div
                  key={mem.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="p-4 rounded-lg bg-zinc-900 border border-zinc-800 hover:border-zinc-700 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/30">
                        <span className="text-sm font-bold text-cyan-400">{i + 1}</span>
                      </div>
                      <div>
                        <div className="flex items-center gap-3 mb-1">
                          <span className="text-sm font-mono font-bold text-blue-400">{mem.id}</span>
                          <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded border ${impactColors[mem.impact as keyof typeof impactColors]}`}>
                            {mem.impact}
                          </span>
                        </div>
                        <div className="flex items-center gap-4 text-xs text-zinc-500">
                          <span>Used {mem.uses.toLocaleString()} times</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs text-zinc-600 mb-1">Shapley Value</div>
                      <div className="text-2xl font-bold text-green-400">{mem.shapley}</div>
                    </div>
                  </div>
                  {/* Progress bar */}
                  <div className="mt-3 h-2 bg-zinc-800 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-cyan-500 to-green-400"
                      initial={{ width: 0 }}
                      animate={{ width: `${mem.shapley * 100}%` }}
                      transition={{ duration: 1, delay: i * 0.1 }}
                    />
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>

        {/* Recent Analyses */}
        <div>
          <h2 className="text-lg font-bold text-zinc-200 mb-4">Recent Analyses</h2>
          <div className="space-y-2">
            {recentAnalyses.map((analysis, i) => (
              <motion.div
                key={analysis.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.05 }}
                className="p-3 rounded-lg bg-zinc-900/50 border border-zinc-800 hover:bg-zinc-900 hover:border-zinc-700 transition-colors cursor-pointer"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <span className="text-xs font-mono text-zinc-600">{analysis.id}</span>
                    <span className="text-sm text-zinc-400">{analysis.query}</span>
                  </div>
                  <div className="flex items-center gap-6 text-xs">
                    <div>
                      <span className="text-zinc-600">Memories: </span>
                      <span className="font-mono text-cyan-400">{analysis.memoriesAnalyzed.toLocaleString()}</span>
                    </div>
                    <div>
                      <span className="text-zinc-600">Top: </span>
                      <span className="font-mono text-blue-400">{analysis.topContributor}</span>
                    </div>
                    <div>
                      <span className="text-zinc-600">Shapley: </span>
                      <span className="font-mono text-green-400">{analysis.shapleyValue}</span>
                    </div>
                    <div>
                      <span className="text-zinc-600">Time: </span>
                      <span className="font-mono text-zinc-400">{analysis.computeTime}ms</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
