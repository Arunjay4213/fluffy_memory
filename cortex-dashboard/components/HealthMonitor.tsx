'use client'

import { Activity, AlertTriangle, TrendingUp, TrendingDown, CheckCircle, XCircle, Clock } from 'lucide-react'
import { HealthMetric, Contradiction } from '@/lib/types'
import { formatPercentage } from '@/lib/utils'
import { format } from 'date-fns'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'

interface Props {
  metrics: HealthMetric[]
  contradictions: Contradiction[]
}

export default function HealthMonitor({ metrics, contradictions }: Props) {
  const latestMetric = metrics[metrics.length - 1]

  const chartData = metrics.map(m => ({
    date: format(m.timestamp, 'MM/dd'),
    'Contradiction Rate': m.contradictionRate * 100,
    'Retrieval Efficiency': m.retrievalEfficiency * 100,
    'Memory Quality': m.memoryQuality * 100,
    'Semantic Drift': m.semanticDrift * 100,
  }))

  const getContradictionTypeColor = (type: Contradiction['type']) => {
    switch (type) {
      case 'logical':
        return { bg: 'bg-red-500/10', border: 'border-red-500/20', text: 'text-red-400' }
      case 'temporal_update':
        return { bg: 'bg-blue-500/10', border: 'border-blue-500/20', text: 'text-blue-400' }
      case 'concurrent_conflict':
        return { bg: 'bg-amber-500/10', border: 'border-amber-500/20', text: 'text-amber-400' }
      default:
        return { bg: 'bg-zinc-500/10', border: 'border-zinc-500/20', text: 'text-zinc-400' }
    }
  }

  return (
    <div className="space-y-6">
      {/* Engine Header */}
      <div>
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 rounded-lg bg-green-500/10 border border-green-500/20">
            <Activity className="w-6 h-6 text-green-500" />
          </div>
          <div>
            <h2 className="text-2xl font-bold">Health Monitor</h2>
            <p className="text-sm text-zinc-500 font-mono">Contradiction Detection & Quality Metrics</p>
          </div>
        </div>
        <p className="text-zinc-400 max-w-2xl">
          Tracks memory quality, detects contradictions with temporal awareness, and monitors retrieval efficiency.
          Write-time checks prevent logical conflicts before they reach production.
        </p>
      </div>

      {/* Current Health Status */}
      <div className="grid grid-cols-4 gap-4">
        <div className="p-4 rounded-lg bg-zinc-900/50 border border-zinc-800">
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle className="w-4 h-4 text-amber-500" />
            <span className="text-xs font-mono text-zinc-500">Contradiction Rate</span>
          </div>
          <p className="text-2xl font-bold">{formatPercentage(latestMetric.contradictionRate)}</p>
          <div className="flex items-center gap-1 mt-1">
            <TrendingDown className="w-3 h-3 text-green-500" />
            <p className="text-xs text-green-500 font-mono">Improved</p>
          </div>
        </div>
        <div className="p-4 rounded-lg bg-zinc-900/50 border border-zinc-800">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-4 h-4 text-green-500" />
            <span className="text-xs font-mono text-zinc-500">Retrieval Efficiency</span>
          </div>
          <p className="text-2xl font-bold">{formatPercentage(latestMetric.retrievalEfficiency)}</p>
          <div className="flex items-center gap-1 mt-1">
            <TrendingUp className="w-3 h-3 text-green-500" />
            <p className="text-xs text-green-500 font-mono">+2%</p>
          </div>
        </div>
        <div className="p-4 rounded-lg bg-zinc-900/50 border border-zinc-800">
          <div className="flex items-center gap-2 mb-2">
            <Activity className="w-4 h-4 text-blue-500" />
            <span className="text-xs font-mono text-zinc-500">Semantic Drift</span>
          </div>
          <p className="text-2xl font-bold">{formatPercentage(latestMetric.semanticDrift)}</p>
          <div className="flex items-center gap-1 mt-1">
            <TrendingDown className="w-3 h-3 text-green-500" />
            <p className="text-xs text-green-500 font-mono">Stable</p>
          </div>
        </div>
        <div className="p-4 rounded-lg bg-zinc-900/50 border border-zinc-800">
          <div className="flex items-center gap-2 mb-2">
            <CheckCircle className="w-4 h-4 text-green-500" />
            <span className="text-xs font-mono text-zinc-500">Memory Quality</span>
          </div>
          <p className="text-2xl font-bold text-green-400">{formatPercentage(latestMetric.memoryQuality)}</p>
          <div className="flex items-center gap-1 mt-1">
            <TrendingUp className="w-3 h-3 text-green-500" />
            <p className="text-xs text-green-500 font-mono">Excellent</p>
          </div>
        </div>
      </div>

      {/* Metrics Chart */}
      <div className="p-6 rounded-lg bg-zinc-900/50 border border-zinc-800">
        <h3 className="text-sm font-mono text-zinc-400 uppercase tracking-wide mb-4">Health Metrics Over Time</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />
            <XAxis dataKey="date" stroke="#71717a" style={{ fontSize: '12px', fontFamily: 'monospace' }} />
            <YAxis stroke="#71717a" style={{ fontSize: '12px', fontFamily: 'monospace' }} />
            <Tooltip
              contentStyle={{
                backgroundColor: '#18181b',
                border: '1px solid #27272a',
                borderRadius: '8px',
                fontFamily: 'monospace',
                fontSize: '12px'
              }}
            />
            <Legend wrapperStyle={{ fontFamily: 'monospace', fontSize: '12px' }} />
            <Line type="monotone" dataKey="Memory Quality" stroke="#10b981" strokeWidth={2} dot={{ r: 4 }} />
            <Line type="monotone" dataKey="Retrieval Efficiency" stroke="#3b82f6" strokeWidth={2} dot={{ r: 4 }} />
            <Line type="monotone" dataKey="Contradiction Rate" stroke="#ef4444" strokeWidth={2} dot={{ r: 4 }} />
            <Line type="monotone" dataKey="Semantic Drift" stroke="#f59e0b" strokeWidth={2} dot={{ r: 4 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Contradiction Detection */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-mono text-zinc-500 uppercase tracking-wide">Detected Contradictions</h3>
          <span className="px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-mono">
            {contradictions.filter(c => !c.resolved).length} Active
          </span>
        </div>

        {contradictions.map((contradiction, idx) => {
          const colors = getContradictionTypeColor(contradiction.type)

          return (
            <div
              key={contradiction.id}
              className={`p-4 rounded-lg border ${colors.bg} ${colors.border} space-y-3`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  {contradiction.resolved ? (
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  ) : (
                    <AlertTriangle className={`w-5 h-5 ${colors.text}`} />
                  )}
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`px-2 py-0.5 rounded text-xs font-mono font-medium ${colors.bg} ${colors.text} border ${colors.border}`}>
                        {contradiction.type.replace('_', ' ')}
                      </span>
                      <span className="text-xs text-zinc-600 font-mono">
                        Confidence: {formatPercentage(contradiction.confidence)}
                      </span>
                      <span className="text-xs text-zinc-600 font-mono">
                        {format(contradiction.detectedAt, 'MMM d, HH:mm')}
                      </span>
                    </div>
                    {contradiction.resolved && (
                      <span className="px-2 py-0.5 rounded text-xs font-mono bg-green-500/10 text-green-400 border border-green-500/20">
                        Resolved
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 rounded-lg bg-black/30 border border-zinc-800">
                  <div className="flex items-center gap-2 mb-2">
                    <Clock className="w-3 h-3 text-zinc-500" />
                    <span className="text-xs font-mono text-zinc-500">
                      {format(contradiction.memory1.timestamp, 'MMM d, yyyy')}
                    </span>
                  </div>
                  <p className="text-sm text-zinc-300">{contradiction.memory1.text}</p>
                  <p className="text-xs text-zinc-600 font-mono mt-2">{contradiction.memory1.id}</p>
                </div>
                <div className="p-3 rounded-lg bg-black/30 border border-zinc-800">
                  <div className="flex items-center gap-2 mb-2">
                    <Clock className="w-3 h-3 text-zinc-500" />
                    <span className="text-xs font-mono text-zinc-500">
                      {format(contradiction.memory2.timestamp, 'MMM d, yyyy')}
                    </span>
                  </div>
                  <p className="text-sm text-zinc-300">{contradiction.memory2.text}</p>
                  <p className="text-xs text-zinc-600 font-mono mt-2">{contradiction.memory2.id}</p>
                </div>
              </div>

              {!contradiction.resolved && (
                <div className="flex gap-2 pt-2">
                  <button className="px-4 py-2 rounded-lg bg-green-500/10 border border-green-500/20 text-green-400 text-sm font-mono hover:bg-green-500/20 transition-colors">
                    Resolve as Update
                  </button>
                  <button className="px-4 py-2 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm font-mono hover:bg-red-500/20 transition-colors">
                    Mark as Conflict
                  </button>
                  <button className="px-4 py-2 rounded-lg bg-zinc-800 border border-zinc-700 text-zinc-400 text-sm font-mono hover:bg-zinc-700 transition-colors">
                    View Details
                  </button>
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Info Box */}
      <div className="p-4 rounded-lg bg-green-500/5 border border-green-500/20">
        <div className="flex gap-3">
          <Activity className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
          <div className="space-y-1">
            <p className="text-sm font-medium text-green-300">Temporal Contradiction Resolution</p>
            <p className="text-xs text-zinc-400">
              The system distinguishes between logical contradictions (vegan vs. loves steak) and temporal updates
              (NYC → London). Write-time checks run NLI on top-k similar memories in O(k) time, not O(N²).
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
