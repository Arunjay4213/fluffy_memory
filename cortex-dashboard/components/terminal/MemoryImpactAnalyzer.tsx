'use client'

import { motion } from 'framer-motion'
import { AlertTriangle, Users, DollarSign, Activity, TrendingUp, Trash2, Archive, Edit3, TestTube } from 'lucide-react'

interface MemoryImpact {
  memoryId: string
  memoryText: string
  criticality: number
  tier: 'hot' | 'warm' | 'cold'

  // Usage stats
  queriesLast30Days: number
  uniqueCustomers: number
  enterpriseCustomers: string[]
  smbCustomers: number
  freeCustomers: number

  // Impact analysis
  revenueImpact: string
  dependencies: string[]
  wouldBreak: number
  wouldImprove: number

  // Recommended action
  recommendation: 'archive' | 'update' | 'boost' | 'merge' | 'none'
  reason: string
}

const mockImpacts: Record<string, MemoryImpact> = {
  'mem_intercom_001': {
    memoryId: 'mem_intercom_001',
    memoryText: 'OLD PRICING: Enterprise plan - $499/month unlimited seats, API access',
    criticality: 0.75,
    tier: 'warm',

    queriesLast30Days: 247,
    uniqueCustomers: 89,
    enterpriseCustomers: ['ACME Corp ($450K ARR)', 'TechCo ($280K ARR)', 'StartupXYZ ($190K ARR)'],
    smbCustomers: 67,
    freeCustomers: 19,

    revenueImpact: '$920K ARR at risk',
    dependencies: ['mem_intercom_002 (new pricing)'],
    wouldBreak: 0,
    wouldImprove: 247,

    recommendation: 'archive',
    reason: 'Stale pricing causing customer confusion. New pricing exists (mem_intercom_002). Safe to archive.'
  },

  'mem_harvey_001': {
    memoryId: 'mem_harvey_001',
    memoryText: 'Ross v. Jenkins (2nd Circuit, 2019): Broad discovery allowed in employment discrimination cases',
    criticality: 0.85,
    tier: 'hot',

    queriesLast30Days: 234,
    uniqueCustomers: 12,
    enterpriseCustomers: ['Harvey AI ($2.1M ARR)', 'LegalTech Pro ($890K ARR)'],
    smbCustomers: 8,
    freeCustomers: 2,

    revenueImpact: '$2.99M ARR affected',
    dependencies: ['mem_harvey_002 (contradicts this)'],
    wouldBreak: 234,
    wouldImprove: 0,

    recommendation: 'merge',
    reason: 'Contradicts mem_harvey_002 (State Bar Ethics Opinion). Need synthesis noting jurisdictional differences.'
  },

  'mem_perplexity_001': {
    memoryId: 'mem_perplexity_001',
    memoryText: 'User lives in New York City - permanent address: Manhattan, registered 6 months ago',
    criticality: 0.65,
    tier: 'warm',

    queriesLast30Days: 823,
    uniqueCustomers: 1,
    enterpriseCustomers: [],
    smbCustomers: 1,
    freeCustomers: 0,

    revenueImpact: '$120/month SMB customer',
    dependencies: ['mem_perplexity_002 (temporary: currently in London)'],
    wouldBreak: 0,
    wouldImprove: 823,

    recommendation: 'update',
    reason: 'Permanent address but user traveling. Should lower weight when temporary location exists.'
  },

  'mem_replit_001': {
    memoryId: 'mem_replit_001',
    memoryText: 'User prefers React class components - historical projects use componentDidMount, this.state',
    criticality: 0.45,
    tier: 'warm',

    queriesLast30Days: 567,
    uniqueCustomers: 34,
    enterpriseCustomers: ['StartupXYZ ($190K ARR)'],
    smbCustomers: 28,
    freeCustomers: 5,

    revenueImpact: '$385K ARR affected',
    dependencies: ['mem_replit_002 (current: React 18 hooks)'],
    wouldBreak: 0,
    wouldImprove: 567,

    recommendation: 'archive',
    reason: 'Outdated preference. Current project uses React 18 hooks (mem_replit_002). Causing 94% build failures.'
  },

  'mem_personal_001': {
    memoryId: 'mem_personal_001',
    memoryText: 'Home WiFi credentials: SSID "SmithResidence", Password: "Tr0picBe@ch2024"',
    criticality: 0.95,
    tier: 'hot',

    queriesLast30Days: 23,
    uniqueCustomers: 1,
    enterpriseCustomers: [],
    smbCustomers: 0,
    freeCustomers: 1,

    revenueImpact: 'Free tier ($0 MRR)',
    dependencies: ['mem_personal_002 (screen sharing context - safety check)'],
    wouldBreak: 23,
    wouldImprove: 0,

    recommendation: 'boost',
    reason: 'Safety-critical credential. Already prevented exposure during screen share. Keep criticality at 0.95+.'
  }
}

export default function MemoryImpactAnalyzer({ selectedIssueId }: { selectedIssueId: string | null }) {
  // Map issue IDs to memory IDs for demo
  const issueToMemoryMap: Record<string, string> = {
    'issue_harvey_001': 'mem_harvey_001',
    'issue_intercom_001': 'mem_intercom_001',
    'issue_perplexity_001': 'mem_perplexity_001',
    'issue_replit_001': 'mem_replit_001',
    'issue_personal_001': 'mem_personal_001',
  }

  const memoryId = selectedIssueId ? issueToMemoryMap[selectedIssueId] : null
  const impact = memoryId ? mockImpacts[memoryId] : null

  if (!impact) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center space-y-3 p-8">
          <Activity className="w-12 h-12 text-zinc-700 mx-auto" />
          <div className="text-sm text-zinc-500">
            Select a customer issue to analyze memory impact
          </div>
          <div className="text-xs text-zinc-600 max-w-xs">
            See which customers are affected, revenue at risk, and what breaks if you make changes
          </div>
        </div>
      </div>
    )
  }

  const getTierColor = () => {
    switch (impact.tier) {
      case 'hot': return 'text-red-400'
      case 'warm': return 'text-amber-400'
      case 'cold': return 'text-blue-400'
    }
  }

  const getRecommendationColor = () => {
    switch (impact.recommendation) {
      case 'archive': return 'bg-amber-500/20 text-amber-400 border-amber-500/30'
      case 'update': return 'bg-blue-500/20 text-blue-400 border-blue-500/30'
      case 'boost': return 'bg-green-500/20 text-green-400 border-green-500/30'
      case 'merge': return 'bg-purple-500/20 text-purple-400 border-purple-500/30'
      default: return 'bg-zinc-700 text-zinc-400 border-zinc-600'
    }
  }

  return (
    <div className="h-full overflow-y-auto p-4 space-y-4">
      {/* Memory header */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-zinc-900/50 border border-zinc-800 rounded-lg p-3"
      >
        <div className="flex items-start justify-between mb-2">
          <span className="text-[10px] font-mono text-blue-400 font-bold">{impact.memoryId}</span>
          <span className={`text-[10px] font-bold uppercase ${getTierColor()}`}>
            {impact.tier} tier
          </span>
        </div>
        <div className="text-xs text-zinc-300 leading-relaxed mb-3">
          {impact.memoryText}
        </div>
        <div className="flex items-center gap-1">
          <div className="flex-1 h-1.5 bg-zinc-800 rounded-full overflow-hidden">
            <div
              className={`h-full ${
                impact.criticality >= 0.7 ? 'bg-red-500' : impact.criticality >= 0.4 ? 'bg-amber-500' : 'bg-green-500'
              }`}
              style={{ width: `${impact.criticality * 100}%` }}
            />
          </div>
          <span className="text-[10px] font-mono text-zinc-500 ml-2">
            criticality: {(impact.criticality * 100).toFixed(0)}%
          </span>
        </div>
      </motion.div>

      {/* Usage stats */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="space-y-3"
      >
        <div className="text-[10px] text-zinc-500 uppercase tracking-wide font-bold">Usage (Last 30 Days)</div>

        <div className="grid grid-cols-2 gap-3">
          <div className="bg-zinc-900/30 border border-zinc-800/50 rounded-lg p-3">
            <div className="text-[10px] text-zinc-600 mb-1">Total Queries</div>
            <div className="text-2xl font-bold text-zinc-200">{impact.queriesLast30Days}</div>
          </div>
          <div className="bg-zinc-900/30 border border-zinc-800/50 rounded-lg p-3">
            <div className="text-[10px] text-zinc-600 mb-1">Unique Customers</div>
            <div className="text-2xl font-bold text-zinc-200">{impact.uniqueCustomers}</div>
          </div>
        </div>
      </motion.div>

      {/* Customer breakdown */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-zinc-900/30 border border-zinc-800/50 rounded-lg p-3 space-y-2"
      >
        <div className="flex items-center gap-2 text-[10px]">
          <Users className="w-3 h-3 text-zinc-500" />
          <span className="text-zinc-500 uppercase tracking-wide font-bold">Customer Breakdown</span>
        </div>

        {impact.enterpriseCustomers.length > 0 && (
          <div className="space-y-1">
            <div className="text-[10px] text-purple-400 font-bold">ENTERPRISE ({impact.enterpriseCustomers.length})</div>
            {impact.enterpriseCustomers.map((customer, i) => (
              <div key={i} className="text-[11px] text-zinc-400 pl-2">• {customer}</div>
            ))}
          </div>
        )}

        {impact.smbCustomers > 0 && (
          <div className="text-[11px] text-zinc-400">
            <span className="text-blue-400 font-bold">SMB:</span> {impact.smbCustomers} customers
          </div>
        )}

        {impact.freeCustomers > 0 && (
          <div className="text-[11px] text-zinc-500">
            <span className="text-zinc-500 font-bold">Free:</span> {impact.freeCustomers} users
          </div>
        )}
      </motion.div>

      {/* Revenue impact */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-3"
      >
        <div className="flex items-center gap-2 mb-1">
          <DollarSign className="w-4 h-4 text-amber-400" />
          <span className="text-xs font-bold text-amber-400">Revenue Impact</span>
        </div>
        <div className="text-lg font-bold text-amber-300">{impact.revenueImpact}</div>
      </motion.div>

      {/* Impact simulation */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="space-y-3"
      >
        <div className="text-[10px] text-zinc-500 uppercase tracking-wide font-bold">If You Change This Memory</div>

        <div className="grid grid-cols-2 gap-3">
          <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3">
            <div className="text-[10px] text-red-400 mb-1">Would Break</div>
            <div className="text-2xl font-bold text-red-400">{impact.wouldBreak}</div>
            <div className="text-[10px] text-zinc-600">queries</div>
          </div>
          <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-3">
            <div className="text-[10px] text-green-400 mb-1">Would Improve</div>
            <div className="text-2xl font-bold text-green-400">{impact.wouldImprove}</div>
            <div className="text-[10px] text-zinc-600">queries</div>
          </div>
        </div>

        {impact.dependencies.length > 0 && (
          <div className="bg-zinc-900/30 border border-zinc-800/50 rounded-lg p-3">
            <div className="text-[10px] text-zinc-500 uppercase tracking-wide font-bold mb-2">Dependencies</div>
            {impact.dependencies.map((dep, i) => (
              <div key={i} className="text-[11px] text-blue-400 font-mono">• {dep}</div>
            ))}
          </div>
        )}
      </motion.div>

      {/* Recommendation */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-zinc-900/50 border border-zinc-800 rounded-lg p-4 space-y-3"
      >
        <div className="text-[10px] text-zinc-500 uppercase tracking-wide font-bold">Recommended Action</div>

        <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border font-bold text-xs ${getRecommendationColor()}`}>
          {impact.recommendation === 'archive' && <Archive className="w-3.5 h-3.5" />}
          {impact.recommendation === 'update' && <Edit3 className="w-3.5 h-3.5" />}
          {impact.recommendation === 'boost' && <TrendingUp className="w-3.5 h-3.5" />}
          {impact.recommendation === 'merge' && <AlertTriangle className="w-3.5 h-3.5" />}
          {impact.recommendation.toUpperCase()}
        </div>

        <div className="text-[11px] text-zinc-400 leading-relaxed">
          {impact.reason}
        </div>

        <div className="flex gap-2 pt-2">
          <button className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 border border-blue-500/30 text-xs font-medium transition-colors">
            <TestTube className="w-3.5 h-3.5" />
            Test on Sample
          </button>
          <button className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-green-500/20 hover:bg-green-500/30 text-green-400 border border-green-500/30 text-xs font-medium transition-colors">
            <Activity className="w-3.5 h-3.5" />
            Apply Fix
          </button>
        </div>
      </motion.div>
    </div>
  )
}
