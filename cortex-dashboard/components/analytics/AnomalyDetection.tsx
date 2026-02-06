'use client'

import { Brain, AlertTriangle, TrendingUp, Zap } from 'lucide-react'
import { motion } from 'framer-motion'

const anomalies = [
  {
    id: 1,
    type: 'Memory Drift',
    severity: 'critical',
    agent: 'Legal Research Agent',
    description: 'mem_legal_042 showing 34% semantic drift from original embedding',
    impact: '247 queries affected, $920K ARR at risk',
    confidence: 0.94,
    detectedAt: '2min ago'
  },
  {
    id: 2,
    type: 'Query Pattern Shift',
    severity: 'warning',
    agent: 'Email Writer',
    description: 'Unusual spike in formal tone queries (+280% from baseline)',
    impact: '89 queries, possible client preference change',
    confidence: 0.87,
    detectedAt: '12min ago'
  },
  {
    id: 3,
    type: 'Retrieval Degradation',
    severity: 'warning',
    agent: 'Support Agent',
    description: 'Accuracy dropped from 96% to 89% in last hour',
    impact: '142 queries with low confidence scores',
    confidence: 0.91,
    detectedAt: '45min ago'
  }
]

export default function AnomalyDetection() {
  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-3 border-b border-zinc-800/50 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Brain className="w-4 h-4 text-purple-400" />
          <span className="text-xs font-bold text-zinc-300 uppercase">AI-Powered Anomaly Detection</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="px-2 py-1 rounded bg-red-500/20 border border-red-500/30 text-[10px] font-bold text-red-400">
            1 CRITICAL
          </div>
          <div className="px-2 py-1 rounded bg-amber-500/20 border border-amber-500/30 text-[10px] font-bold text-amber-400">
            2 WARNINGS
          </div>
        </div>
      </div>

      {/* Anomalies List */}
      <div className="flex-1 p-3 space-y-3 overflow-y-auto">
        {anomalies.map((anomaly, i) => (
          <motion.div
            key={anomaly.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            className={`border rounded-lg p-3 space-y-2 cursor-pointer transition-all hover:scale-[1.01] ${
              anomaly.severity === 'critical'
                ? 'bg-red-500/10 border-red-500/30 hover:bg-red-500/20'
                : 'bg-amber-500/10 border-amber-500/30 hover:bg-amber-500/20'
            }`}
          >
            {/* Header */}
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-center gap-2">
                <AlertTriangle className={`w-4 h-4 ${
                  anomaly.severity === 'critical' ? 'text-red-400' : 'text-amber-400'
                }`} />
                <div>
                  <div className="text-xs font-bold text-zinc-200">{anomaly.type}</div>
                  <div className="text-[10px] text-zinc-500">{anomaly.agent}</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="text-[10px] text-zinc-600">{anomaly.detectedAt}</div>
                <div className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase ${
                  anomaly.severity === 'critical'
                    ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                    : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                }`}>
                  {anomaly.severity}
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="text-xs text-zinc-300">{anomaly.description}</div>

            {/* Impact */}
            <div className="flex items-center gap-2 text-[10px]">
              <span className="text-zinc-600">Impact:</span>
              <span className="text-zinc-400">{anomaly.impact}</span>
            </div>

            {/* Confidence */}
            <div className="flex items-center gap-2">
              <span className="text-[10px] text-zinc-600">AI Confidence:</span>
              <div className="flex-1 h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                <motion.div
                  className={`h-full ${anomaly.severity === 'critical' ? 'bg-red-500' : 'bg-amber-500'}`}
                  initial={{ width: 0 }}
                  animate={{ width: `${anomaly.confidence * 100}%` }}
                  transition={{ delay: i * 0.1 + 0.3 }}
                />
              </div>
              <span className="text-[10px] font-bold text-zinc-300">{(anomaly.confidence * 100).toFixed(0)}%</span>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 pt-2 border-t border-zinc-800/50">
              <button className="px-2 py-1 rounded text-[10px] bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 border border-blue-500/30 transition-all">
                Investigate
              </button>
              <button className="px-2 py-1 rounded text-[10px] bg-green-500/20 hover:bg-green-500/30 text-green-400 border border-green-500/30 transition-all">
                Auto-Fix
              </button>
              <button className="px-2 py-1 rounded text-[10px] bg-zinc-900 hover:bg-zinc-800 text-zinc-400 border border-zinc-800 transition-all">
                Dismiss
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* ML Model Info */}
      <div className="p-3 border-t border-zinc-800/50 bg-zinc-900/30">
        <div className="flex items-center justify-between text-[10px]">
          <div className="flex items-center gap-2 text-zinc-600">
            <Zap className="w-3 h-3" />
            <span>ML Model: GPT-4o • Last trained: 2h ago</span>
          </div>
          <div className="text-purple-400 font-bold">Detection Rate: 99.2%</div>
        </div>
      </div>
    </div>
  )
}
