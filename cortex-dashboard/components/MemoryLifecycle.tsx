'use client'

import { useState } from 'react'
import { Database, Flame, Sun, Snowflake, Shield, TrendingUp, Clock, Search } from 'lucide-react'
import { Memory } from '@/lib/types'
import { formatPercentage } from '@/lib/utils'
import { format } from 'date-fns'

interface Props {
  memories: Memory[]
}

export default function MemoryLifecycle({ memories }: Props) {
  const [selectedTier, setSelectedTier] = useState<'all' | 'hot' | 'warm' | 'cold'>('all')
  const [searchTerm, setSearchTerm] = useState('')

  const filtered = memories.filter(m => {
    const matchesTier = selectedTier === 'all' || m.tier === selectedTier
    const matchesSearch = m.text.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesTier && matchesSearch
  })

  const tierStats = {
    hot: memories.filter(m => m.tier === 'hot').length,
    warm: memories.filter(m => m.tier === 'warm').length,
    cold: memories.filter(m => m.tier === 'cold').length,
  }

  const getTierIcon = (tier: Memory['tier']) => {
    switch (tier) {
      case 'hot': return Flame
      case 'warm': return Sun
      case 'cold': return Snowflake
    }
  }

  const getTierColors = (tier: Memory['tier']) => {
    switch (tier) {
      case 'hot':
        return { bg: 'bg-red-500/10', border: 'border-red-500/30', text: 'text-red-400', glow: 'glow-red' }
      case 'warm':
        return { bg: 'bg-amber-500/10', border: 'border-amber-500/30', text: 'text-amber-400', glow: 'glow-amber' }
      case 'cold':
        return { bg: 'bg-blue-500/10', border: 'border-blue-500/30', text: 'text-blue-400', glow: 'glow-blue' }
    }
  }

  const getCriticalityColor = (criticality: number) => {
    if (criticality >= 0.7) return 'text-red-400'
    if (criticality >= 0.4) return 'text-amber-400'
    return 'text-green-400'
  }

  return (
    <div className="space-y-6">
      {/* Engine Header */}
      <div>
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 rounded-lg bg-amber-500/10 border border-amber-500/20">
            <Database className="w-6 h-6 text-amber-500" />
          </div>
          <div>
            <h2 className="text-2xl font-bold">Memory Lifecycle</h2>
            <p className="text-sm text-zinc-500 font-mono">Tiered Storage with Criticality Guards</p>
          </div>
        </div>
        <p className="text-zinc-400 max-w-2xl">
          Manages memory across hot/warm/cold tiers based on retrieval patterns. Criticality scoring ensures
          safety-critical memories (health, financial, legal) are never auto-archived.
        </p>
      </div>

      {/* Tier Overview */}
      <div className="grid grid-cols-3 gap-4">
        <div className="p-6 rounded-lg bg-zinc-900/50 border border-zinc-800 hover:border-red-500/30 transition-all group">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 group-hover:bg-red-500/20 transition-colors">
              <Flame className="w-6 h-6 text-red-400" />
            </div>
            <div>
              <p className="text-xs font-mono text-zinc-500 uppercase">Hot Tier</p>
              <p className="text-3xl font-bold">{tierStats.hot}</p>
            </div>
          </div>
          <p className="text-xs text-zinc-500">Retrieved in last 30 days. In-memory index.</p>
          <div className="mt-3 h-2 bg-zinc-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-red-500 to-orange-500 rounded-full"
              style={{ width: `${(tierStats.hot / memories.length) * 100}%` }}
            />
          </div>
        </div>

        <div className="p-6 rounded-lg bg-zinc-900/50 border border-zinc-800 hover:border-amber-500/30 transition-all group">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/20 group-hover:bg-amber-500/20 transition-colors">
              <Sun className="w-6 h-6 text-amber-400" />
            </div>
            <div>
              <p className="text-xs font-mono text-zinc-500 uppercase">Warm Tier</p>
              <p className="text-3xl font-bold">{tierStats.warm}</p>
            </div>
          </div>
          <p className="text-xs text-zinc-500">Not retrieved in 30-180 days. Disk-backed.</p>
          <div className="mt-3 h-2 bg-zinc-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-amber-500 to-yellow-500 rounded-full"
              style={{ width: `${(tierStats.warm / memories.length) * 100}%` }}
            />
          </div>
        </div>

        <div className="p-6 rounded-lg bg-zinc-900/50 border border-zinc-800 hover:border-blue-500/30 transition-all group">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20 group-hover:bg-blue-500/20 transition-colors">
              <Snowflake className="w-6 h-6 text-blue-400" />
            </div>
            <div>
              <p className="text-xs font-mono text-zinc-500 uppercase">Cold Tier</p>
              <p className="text-3xl font-bold">{tierStats.cold}</p>
            </div>
          </div>
          <p className="text-xs text-zinc-500">180+ days. Excluded from default retrieval.</p>
          <div className="mt-3 h-2 bg-zinc-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full"
              style={{ width: `${(tierStats.cold / memories.length) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-3">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
          <input
            type="text"
            placeholder="Search memories..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-lg bg-zinc-900 border border-zinc-800 text-sm font-mono focus:outline-none focus:border-amber-500/50 transition-colors"
          />
        </div>
        <div className="flex gap-2">
          {(['all', 'hot', 'warm', 'cold'] as const).map(tier => (
            <button
              key={tier}
              onClick={() => setSelectedTier(tier)}
              className={`px-4 py-2 rounded-lg font-mono text-sm transition-all capitalize ${
                selectedTier === tier
                  ? 'bg-amber-500/20 text-amber-400 border border-amber-500/50'
                  : 'bg-zinc-900 text-zinc-500 border border-zinc-800 hover:border-zinc-700'
              }`}
            >
              {tier}
            </button>
          ))}
        </div>
      </div>

      {/* Memory List */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-mono text-zinc-500 uppercase tracking-wide">
            Memories ({filtered.length})
          </h3>
          <div className="flex items-center gap-2 text-xs font-mono text-zinc-600">
            <Shield className="w-3 h-3" />
            <span>{memories.filter(m => m.criticality >= 0.7).length} Critical Protected</span>
          </div>
        </div>

        {filtered.map((memory, idx) => {
          const TierIcon = getTierIcon(memory.tier)
          const colors = getTierColors(memory.tier)

          return (
            <div
              key={memory.id}
              className={`p-4 rounded-lg border ${colors.bg} ${colors.border} hover:${colors.glow} transition-all`}
              style={{ animationDelay: `${idx * 50}ms` }}
            >
              <div className="flex items-start gap-4">
                {/* Tier Badge */}
                <div className={`p-2 rounded-lg ${colors.bg} border ${colors.border}`}>
                  <TierIcon className={`w-5 h-5 ${colors.text}`} />
                </div>

                {/* Memory Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-0.5 rounded text-xs font-mono bg-zinc-800 text-zinc-400 border border-zinc-700">
                      {memory.id}
                    </span>
                    <span className="text-xs text-zinc-600 font-mono">
                      {format(memory.timestamp, 'MMM d, yyyy')}
                    </span>
                    {memory.criticality >= 0.7 && (
                      <span className="px-2 py-0.5 rounded text-xs font-mono bg-red-500/10 text-red-400 border border-red-500/20 flex items-center gap-1">
                        <Shield className="w-3 h-3" />
                        Protected
                      </span>
                    )}
                  </div>

                  <p className="text-sm text-zinc-200 mb-3">{memory.text}</p>

                  <div className="grid grid-cols-4 gap-4">
                    <div>
                      <p className="text-xs text-zinc-600 font-mono mb-1">Criticality</p>
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full ${getCriticalityColor(memory.criticality)}`}
                            style={{
                              width: formatPercentage(memory.criticality),
                              background: memory.criticality >= 0.7
                                ? 'linear-gradient(90deg, #ef4444, #dc2626)'
                                : memory.criticality >= 0.4
                                ? 'linear-gradient(90deg, #f59e0b, #d97706)'
                                : 'linear-gradient(90deg, #10b981, #059669)'
                            }}
                          />
                        </div>
                        <span className={`text-xs font-mono font-bold ${getCriticalityColor(memory.criticality)}`}>
                          {formatPercentage(memory.criticality)}
                        </span>
                      </div>
                    </div>

                    <div>
                      <p className="text-xs text-zinc-600 font-mono mb-1">Retrievals</p>
                      <div className="flex items-center gap-1">
                        <TrendingUp className="w-3 h-3 text-zinc-500" />
                        <span className="text-sm font-mono font-bold">{memory.retrievalCount}</span>
                      </div>
                    </div>

                    <div>
                      <p className="text-xs text-zinc-600 font-mono mb-1">Last Retrieved</p>
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3 text-zinc-500" />
                        <span className="text-sm font-mono text-zinc-400">
                          {memory.lastRetrieved ? format(memory.lastRetrieved, 'MM/dd') : 'Never'}
                        </span>
                      </div>
                    </div>

                    <div>
                      <p className="text-xs text-zinc-600 font-mono mb-1">Category</p>
                      <span className="text-sm font-mono text-zinc-400">
                        {memory.metadata.category || 'N/A'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Info Box */}
      <div className="p-4 rounded-lg bg-amber-500/5 border border-amber-500/20">
        <div className="flex gap-3">
          <Shield className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
          <div className="space-y-1">
            <p className="text-sm font-medium text-amber-300">Criticality Guards Prevent Data Loss</p>
            <p className="text-xs text-zinc-400">
              Memories with criticality ≥0.7 (health, financial, legal info) are PERMANENTLY in the Hot tier
              regardless of retrieval frequency. The system never auto-deletes — only users can trigger GDPR deletion
              with 30-day grace period.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
