'use client'

import { useState } from 'react'
import { Database, ArrowLeft, Zap, Clock, HardDrive, TrendingUp, Search, Filter } from 'lucide-react'
import Link from 'next/link'
import DataGrid from '@/components/terminal/DataGrid'
import { motion } from 'framer-motion'

export default function MemoryPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [tierFilter, setTierFilter] = useState<'all' | 'hot' | 'warm' | 'cold'>('all')

  // Generate massive memory dataset
  const memories = Array.from({ length: 50000 }, (_, i) => ({
    id: `mem_${String(i).padStart(6, '0')}`,
    content: [
      'Legal precedent analysis for merger',
      'Financial forecast Q4 2024',
      'HR policy documentation',
      'Customer support FAQ entry',
      'Product feature specification',
      'Security audit findings',
      'Marketing campaign metrics',
      'Sales pipeline data'
    ][Math.floor(Math.random() * 8)],
    agent: ['legal', 'finance', 'hr', 'support', 'product', 'security', 'marketing', 'sales'][Math.floor(Math.random() * 8)] + `-${String(Math.floor(Math.random() * 100)).padStart(3, '0')}`,
    tier: ['hot', 'warm', 'cold'][Math.floor(Math.random() * 3)],
    size: (Math.random() * 200 + 10).toFixed(1),
    confidence: (0.6 + Math.random() * 0.4).toFixed(3),
    accessCount: Math.floor(Math.random() * 1000),
    lastAccessed: new Date(Date.now() - Math.random() * 86400000 * 90).toISOString().split('T')[0],
    created: new Date(Date.now() - Math.random() * 86400000 * 365).toISOString().split('T')[0],
    vector: `[${Array.from({ length: 4 }, () => (Math.random() * 2 - 1).toFixed(3)).join(', ')}...]`
  }))

  const filteredMemories = memories.filter(m =>
    (tierFilter === 'all' || m.tier === tierFilter) &&
    (searchQuery === '' || m.content.toLowerCase().includes(searchQuery.toLowerCase()) || m.id.includes(searchQuery))
  )

  const columns = [
    {
      key: 'id',
      label: 'MEMORY ID',
      width: 'w-32',
      render: (value: string) => (
        <span className="text-xs font-mono text-blue-400 font-bold">{value}</span>
      )
    },
    {
      key: 'content',
      label: 'CONTENT',
      render: (value: string) => (
        <span className="text-xs text-zinc-400 truncate block">{value}</span>
      )
    },
    {
      key: 'agent',
      label: 'AGENT',
      width: 'w-32',
      render: (value: string) => (
        <span className="text-xs font-mono text-purple-400">{value}</span>
      )
    },
    {
      key: 'tier',
      label: 'TIER',
      width: 'w-20',
      render: (value: string) => {
        const colors = {
          hot: 'bg-red-500/20 text-red-400 border-red-500/50',
          warm: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/50',
          cold: 'bg-blue-500/20 text-blue-400 border-blue-500/50'
        }
        return (
          <span className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded border ${colors[value as keyof typeof colors]} uppercase`}>
            {value}
          </span>
        )
      }
    },
    {
      key: 'size',
      label: 'SIZE',
      width: 'w-24',
      render: (value: string) => (
        <span className="text-xs font-mono text-zinc-500">{value}KB</span>
      )
    },
    {
      key: 'confidence',
      label: 'CONF',
      width: 'w-20',
      render: (value: string) => {
        const conf = parseFloat(value)
        const color = conf > 0.9 ? 'text-green-400' : conf > 0.75 ? 'text-yellow-400' : 'text-red-400'
        return <span className={`text-xs font-mono ${color}`}>{value}</span>
      }
    },
    {
      key: 'accessCount',
      label: 'ACCESS',
      width: 'w-24',
      render: (value: number) => (
        <span className="text-xs font-mono text-cyan-400">{value}</span>
      )
    },
    {
      key: 'lastAccessed',
      label: 'LAST ACCESS',
      width: 'w-28',
      render: (value: string) => (
        <span className="text-xs font-mono text-zinc-500">{value}</span>
      )
    }
  ]

  const stats = [
    { label: 'Total Vectors', value: '1.24M', icon: Database, color: 'text-blue-400' },
    { label: 'Hot Tier', value: '45.2K', icon: Zap, color: 'text-red-400' },
    { label: 'Warm Tier', value: '312K', icon: Clock, color: 'text-yellow-400' },
    { label: 'Cold Tier', value: '882K', icon: HardDrive, color: 'text-blue-400' },
    { label: 'Avg Size', value: '42.8KB', icon: TrendingUp, color: 'text-green-400' }
  ]

  const tierCounts = {
    hot: memories.filter(m => m.tier === 'hot').length,
    warm: memories.filter(m => m.tier === 'warm').length,
    cold: memories.filter(m => m.tier === 'cold').length
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
                <div className="p-2 rounded-lg bg-purple-500/10 border border-purple-500/30">
                  <Database className="w-5 h-5 text-purple-400" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-zinc-200">Memory Store</h1>
                  <p className="text-xs text-zinc-500">Vector database • Tiered storage</p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="px-3 py-1.5 rounded-lg bg-purple-500/10 border border-purple-500/30">
                <span className="text-xs font-bold text-purple-400">{filteredMemories.length.toLocaleString()} VECTORS</span>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Bar */}
        <div className="px-6 py-3 border-t border-zinc-800/50 flex items-center gap-3 overflow-x-auto">
          {stats.map((stat) => {
            const Icon = stat.icon
            return (
              <div
                key={stat.label}
                className="flex items-center gap-3 px-3 py-2 rounded bg-zinc-900/50 border border-zinc-800/50 hover:border-zinc-700 transition-colors min-w-fit"
              >
                <Icon className={`w-4 h-4 ${stat.color}`} />
                <div>
                  <div className="text-[9px] text-zinc-600 uppercase tracking-wider">
                    {stat.label}
                  </div>
                  <span className="text-sm font-bold text-zinc-200">{stat.value}</span>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Filters & Search */}
      <div className="p-6">
        <div className="mb-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 flex-1">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search memories... (⌘F)"
                className="w-full pl-10 pr-4 py-2 rounded-lg bg-zinc-900 border border-zinc-800 text-sm text-zinc-300 placeholder:text-zinc-600 outline-none focus:border-zinc-700"
              />
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setTierFilter('all')}
                className={`px-3 py-2 rounded-lg text-xs transition-colors ${
                  tierFilter === 'all'
                    ? 'bg-blue-500/20 border border-blue-500/50 text-blue-400'
                    : 'bg-zinc-900 border border-zinc-800 text-zinc-400 hover:border-zinc-700'
                }`}
              >
                All ({memories.length.toLocaleString()})
              </button>
              <button
                onClick={() => setTierFilter('hot')}
                className={`px-3 py-2 rounded-lg text-xs transition-colors ${
                  tierFilter === 'hot'
                    ? 'bg-red-500/20 border border-red-500/50 text-red-400'
                    : 'bg-zinc-900 border border-zinc-800 text-zinc-400 hover:border-zinc-700'
                }`}
              >
                Hot ({tierCounts.hot.toLocaleString()})
              </button>
              <button
                onClick={() => setTierFilter('warm')}
                className={`px-3 py-2 rounded-lg text-xs transition-colors ${
                  tierFilter === 'warm'
                    ? 'bg-yellow-500/20 border border-yellow-500/50 text-yellow-400'
                    : 'bg-zinc-900 border border-zinc-800 text-zinc-400 hover:border-zinc-700'
                }`}
              >
                Warm ({tierCounts.warm.toLocaleString()})
              </button>
              <button
                onClick={() => setTierFilter('cold')}
                className={`px-3 py-2 rounded-lg text-xs transition-colors ${
                  tierFilter === 'cold'
                    ? 'bg-blue-500/20 border border-blue-500/50 text-blue-400'
                    : 'bg-zinc-900 border border-zinc-800 text-zinc-400 hover:border-zinc-700'
                }`}
              >
                Cold ({tierCounts.cold.toLocaleString()})
              </button>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="px-3 py-2 rounded-lg bg-green-500/10 hover:bg-green-500/20 border border-green-500/30 text-xs text-green-400 transition-colors">
              Export
            </button>
            <button className="px-3 py-2 rounded-lg bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/30 text-xs text-blue-400 transition-colors">
              Optimize Tiers
            </button>
          </div>
        </div>

        <DataGrid
          data={filteredMemories}
          columns={columns}
          height="calc(100vh - 300px)"
          onRowClick={(row) => console.log('Selected memory:', row)}
        />
      </div>
    </div>
  )
}
