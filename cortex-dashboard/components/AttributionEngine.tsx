'use client'

import { useState } from 'react'
import { Brain, Zap, Clock, TrendingUp, AlertCircle, ChevronDown, ChevronUp } from 'lucide-react'
import { QueryAttribution } from '@/lib/types'
import { formatPercentage } from '@/lib/utils'
import { format } from 'date-fns'

interface Props {
  attributions: QueryAttribution[]
}

export default function AttributionEngine({ attributions }: Props) {
  const [expandedQuery, setExpandedQuery] = useState<string | null>(attributions[0]?.queryId || null)
  const [selectedMode, setSelectedMode] = useState<'all' | 'amortized' | 'exact'>('all')

  const filtered = attributions.filter(a =>
    selectedMode === 'all' ? true : a.mode === selectedMode
  )

  return (
    <div className="space-y-6">
      {/* Engine Header */}
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-lg bg-blue-500/10 border border-blue-500/20">
              <Brain className="w-6 h-6 text-blue-500" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">Attribution Engine</h2>
              <p className="text-sm text-zinc-500 font-mono">Amortized Shapley Value Attribution</p>
            </div>
          </div>
          <p className="text-zinc-400 max-w-2xl">
            Identifies which memories influenced each LLM response. Uses amortized model for real-time attribution (&lt;10ms) with exact ContextCite on-demand.
          </p>
        </div>
        <div className="flex gap-2">
          {(['all', 'amortized', 'exact'] as const).map(mode => (
            <button
              key={mode}
              onClick={() => setSelectedMode(mode)}
              className={`px-4 py-2 rounded-lg font-mono text-sm transition-all ${
                selectedMode === mode
                  ? 'bg-blue-500/20 text-blue-400 border border-blue-500/50'
                  : 'bg-zinc-900 text-zinc-500 border border-zinc-800 hover:border-zinc-700'
              }`}
            >
              {mode}
            </button>
          ))}
        </div>
      </div>

      {/* Metrics Overview */}
      <div className="grid grid-cols-3 gap-4">
        <div className="p-4 rounded-lg bg-zinc-900/50 border border-zinc-800">
          <div className="flex items-center gap-2 mb-2">
            <Zap className="w-4 h-4 text-blue-500" />
            <span className="text-xs font-mono text-zinc-500">Avg Compute Time</span>
          </div>
          <p className="text-2xl font-bold">8.4ms</p>
          <p className="text-xs text-green-500 font-mono mt-1">Amortized Mode</p>
        </div>
        <div className="p-4 rounded-lg bg-zinc-900/50 border border-zinc-800">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-4 h-4 text-green-500" />
            <span className="text-xs font-mono text-zinc-500">LDS Confidence</span>
          </div>
          <p className="text-2xl font-bold">0.89</p>
          <p className="text-xs text-zinc-500 font-mono mt-1">Pearson correlation</p>
        </div>
        <div className="p-4 rounded-lg bg-zinc-900/50 border border-zinc-800">
          <div className="flex items-center gap-2 mb-2">
            <Clock className="w-4 h-4 text-amber-500" />
            <span className="text-xs font-mono text-zinc-500">Queries Analyzed</span>
          </div>
          <p className="text-2xl font-bold">2.4K</p>
          <p className="text-xs text-blue-500 font-mono mt-1">Last 24h</p>
        </div>
      </div>

      {/* Query List */}
      <div className="space-y-3">
        <h3 className="text-sm font-mono text-zinc-500 uppercase tracking-wide">Recent Attributions</h3>
        {filtered.map((query, idx) => {
          const isExpanded = expandedQuery === query.queryId
          const topAttribution = query.attributions[0]

          return (
            <div
              key={query.queryId}
              className="rounded-lg bg-zinc-900/50 border border-zinc-800 overflow-hidden hover:border-zinc-700 transition-all"
              style={{ animationDelay: `${idx * 100}ms` }}
            >
              {/* Query Header */}
              <button
                onClick={() => setExpandedQuery(isExpanded ? null : query.queryId)}
                className="w-full p-4 text-left flex items-center justify-between hover:bg-zinc-900/70 transition-colors"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="px-2 py-1 rounded text-xs font-mono font-medium ${
                      query.mode === 'amortized'
                        ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                        : 'bg-purple-500/10 text-purple-400 border border-purple-500/20'
                    }">
                      {query.mode}
                    </span>
                    <span className="text-xs text-zinc-600 font-mono">
                      {format(query.timestamp, 'MMM d, HH:mm:ss')}
                    </span>
                    <span className="text-xs text-zinc-600 font-mono">
                      Compute: {query.computeTime}ms
                    </span>
                  </div>
                  <p className="font-mono text-sm mb-1">{query.query}</p>
                  <p className="text-xs text-zinc-500 line-clamp-1">{query.response}</p>
                </div>
                <div className="ml-4">
                  {isExpanded ? (
                    <ChevronUp className="w-5 h-5 text-zinc-500" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-zinc-500" />
                  )}
                </div>
              </button>

              {/* Attribution Details */}
              {isExpanded && (
                <div className="border-t border-zinc-800 p-4 bg-black/30 space-y-3">
                  <div className="flex items-center gap-2 mb-3">
                    <Brain className="w-4 h-4 text-blue-500" />
                    <span className="text-sm font-mono text-zinc-400">Memory Attribution Breakdown</span>
                  </div>

                  {query.attributions.map((attr, i) => (
                    <div
                      key={attr.memoryId}
                      className="p-3 rounded-lg bg-zinc-900/50 border border-zinc-800 space-y-2"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="px-2 py-0.5 rounded text-xs font-mono bg-blue-500/10 text-blue-400">
                              {attr.memoryId}
                            </span>
                            <span className="text-xs text-zinc-600 font-mono">{attr.modelType}</span>
                          </div>
                          <p className="text-sm text-zinc-300">{attr.memoryText}</p>
                        </div>
                        <div className="ml-4 text-right">
                          <p className="text-2xl font-bold text-blue-400">{formatPercentage(attr.shapleyValue)}</p>
                          <p className="text-xs text-zinc-500 font-mono">Shapley</p>
                        </div>
                      </div>

                      {/* Attribution Bar */}
                      <div className="space-y-1">
                        <div className="flex justify-between text-xs font-mono text-zinc-500">
                          <span>Influence</span>
                          <span>Confidence: {formatPercentage(attr.confidence)}</span>
                        </div>
                        <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-blue-500 to-blue-400 rounded-full transition-all duration-500"
                            style={{ width: formatPercentage(attr.shapleyValue) }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}

                  {/* Action Buttons */}
                  <div className="flex gap-2 pt-2">
                    <button className="px-4 py-2 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-mono hover:bg-blue-500/20 transition-colors">
                      Run Exact ContextCite
                    </button>
                    <button className="px-4 py-2 rounded-lg bg-zinc-800 border border-zinc-700 text-zinc-400 text-sm font-mono hover:bg-zinc-700 transition-colors">
                      View Full Trace
                    </button>
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Info Box */}
      <div className="p-4 rounded-lg bg-blue-500/5 border border-blue-500/20">
        <div className="flex gap-3">
          <AlertCircle className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
          <div className="space-y-1">
            <p className="text-sm font-medium text-blue-300">How Attribution Works</p>
            <p className="text-xs text-zinc-400">
              The amortized model predicts Shapley values in &lt;10ms using a trained neural network. For critical queries,
              trigger exact ContextCite (64 ablations, ~5s) to compute ground-truth attribution. LDS confidence of 0.89 means
              predictions correlate with exact values at 89% accuracy.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
