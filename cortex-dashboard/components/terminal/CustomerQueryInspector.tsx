'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Search, AlertCircle, CheckCircle, DollarSign, Users, Clock } from 'lucide-react'

interface CustomerIssue {
  id: string
  customerId: string
  customerName: string
  tier: 'enterprise' | 'smb' | 'free'
  timestamp: Date
  query: string
  problem: string
  wrongMemory: string
  correctMemory: string
  wrongOutput: string
  correctOutput: string
  impact: string
  status: 'open' | 'investigating' | 'fixed' | 'verified'
}

const mockIssues: CustomerIssue[] = [
  // Harvey AI - Enterprise customer with legal contradiction
  {
    id: 'issue_harvey_001',
    customerId: 'harvey_ai',
    customerName: 'Harvey AI (Enterprise)',
    tier: 'enterprise',
    timestamp: new Date(Date.now() - 300000),
    query: 'Draft motion to compel discovery in employment discrimination case',
    problem: 'Used contradictory precedents in same brief',
    wrongMemory: 'mem_harvey_001 (broad discovery) + mem_harvey_002 (limits discovery)',
    correctMemory: 'Need synthesis or single precedent',
    wrongOutput: 'Brief cites BOTH Ross v. Jenkins AND State Bar Ethics Opinion (contradictory)',
    correctOutput: 'Should note jurisdictional difference or choose one',
    impact: '$2M+ malpractice risk',
    status: 'open'
  },

  // Intercom - Enterprise customer got stale pricing
  {
    id: 'issue_intercom_001',
    customerId: 'acme_corp',
    customerName: 'ACME Corp (Enterprise)',
    tier: 'enterprise',
    timestamp: new Date(Date.now() - 600000),
    query: 'What does your Enterprise plan include?',
    problem: 'Served 6-month-old stale pricing data',
    wrongMemory: 'mem_intercom_001 (OLD: $499/month unlimited)',
    correctMemory: 'mem_intercom_002 (NEW: Tiered $199/$399/$799)',
    wrongOutput: 'Enterprise plan: $499/month with unlimited seats and API access',
    correctOutput: 'Enterprise now tiered: Standard $199 (10 seats), Plus $399 (50 seats), Premier $799 (unlimited)',
    impact: '$450K ARR customer confused, risk churn',
    status: 'investigating'
  },

  // Perplexity - SMB customer wrong location
  {
    id: 'issue_perplexity_001',
    customerId: 'user_12847',
    customerName: 'user_12847 (SMB)',
    tier: 'smb',
    timestamp: new Date(Date.now() - 900000),
    query: 'Best pizza places near me',
    problem: 'Used permanent NYC address instead of temporary London location',
    wrongMemory: 'mem_perplexity_001 (Lives in NYC - 6mo old)',
    correctMemory: 'mem_perplexity_002 (Currently in London - recent queries)',
    wrongOutput: 'Top NYC pizza: Juliana\'s in Brooklyn, Prince Street Pizza...',
    correctOutput: 'London pizza: Franco Manca, Homeslice, Pizza Pilgrims...',
    impact: 'Poor UX, user complained on Twitter',
    status: 'fixed'
  },

  // Replit - Enterprise customer build failures
  {
    id: 'issue_replit_001',
    customerId: 'startup_xyz',
    customerName: 'StartupXYZ (Enterprise)',
    tier: 'enterprise',
    timestamp: new Date(Date.now() - 1200000),
    query: 'Create a React component with timer',
    problem: 'Generated React class components for React 18 project',
    wrongMemory: 'mem_replit_001 (historical: prefers classes)',
    correctMemory: 'mem_replit_002 (current project: React 18.2.0 hooks)',
    wrongOutput: 'class Timer extends React.Component { componentDidMount()...',
    correctOutput: 'const Timer = () => { useEffect(() => {...}, []); ...',
    impact: '147 generated components broke builds',
    status: 'verified'
  },

  // Personal AI - Free tier safety catch
  {
    id: 'issue_personal_001',
    customerId: 'user_8291',
    customerName: 'user_8291 (Free)',
    tier: 'free',
    timestamp: new Date(Date.now() - 1800000),
    query: 'What\'s my WiFi password?',
    problem: 'Nearly exposed credentials during screen share',
    wrongMemory: 'Would have used mem_personal_001 (WiFi credentials)',
    correctMemory: 'Also checked mem_personal_002 (screen sharing context) - BLOCKED',
    wrongOutput: '[Would have shown password - PREVENTED]',
    correctOutput: 'I cannot share credentials during screen sharing. Please check privately.',
    impact: 'Privacy breach PREVENTED ✓',
    status: 'verified'
  },
]

export default function CustomerQueryInspector({ onSelectIssue }: { onSelectIssue: (issueId: string) => void }) {
  const [searchTerm, setSearchTerm] = useState('')
  const [filter, setFilter] = useState<'all' | 'open' | 'enterprise'>('all')

  const filteredIssues = mockIssues.filter(issue => {
    if (filter === 'open' && issue.status === 'verified') return false
    if (filter === 'enterprise' && issue.tier !== 'enterprise') return false
    if (searchTerm && !issue.customerName.toLowerCase().includes(searchTerm.toLowerCase()) &&
        !issue.query.toLowerCase().includes(searchTerm.toLowerCase())) return false
    return true
  })

  const getTierBadge = (tier: string) => {
    switch (tier) {
      case 'enterprise': return 'bg-purple-500/20 text-purple-400 border-purple-500/30'
      case 'smb': return 'bg-blue-500/20 text-blue-400 border-blue-500/30'
      case 'free': return 'bg-zinc-700 text-zinc-400 border-zinc-600'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open': return 'text-red-400'
      case 'investigating': return 'text-amber-400'
      case 'fixed': return 'text-blue-400'
      case 'verified': return 'text-green-400'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'open': return <AlertCircle className="w-3 h-3" />
      case 'investigating': return <Clock className="w-3 h-3" />
      case 'fixed': case 'verified': return <CheckCircle className="w-3 h-3" />
    }
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header with search and filters */}
      <div className="p-3 border-b border-zinc-800/50 space-y-3">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 w-3.5 h-3.5 text-zinc-600" />
          <input
            type="text"
            placeholder="Search customer, query..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-zinc-900/50 border border-zinc-800 rounded-lg pl-8 pr-3 py-2 text-xs text-zinc-200 placeholder:text-zinc-600 focus:outline-none focus:border-blue-500/50"
          />
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setFilter('all')}
            className={`px-2 py-1 rounded text-[10px] font-medium transition-colors ${
              filter === 'all' ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' : 'bg-zinc-900 text-zinc-500 border border-zinc-800'
            }`}
          >
            All ({mockIssues.length})
          </button>
          <button
            onClick={() => setFilter('open')}
            className={`px-2 py-1 rounded text-[10px] font-medium transition-colors ${
              filter === 'open' ? 'bg-red-500/20 text-red-400 border border-red-500/30' : 'bg-zinc-900 text-zinc-500 border border-zinc-800'
            }`}
          >
            Open ({mockIssues.filter(i => i.status !== 'verified').length})
          </button>
          <button
            onClick={() => setFilter('enterprise')}
            className={`px-2 py-1 rounded text-[10px] font-medium transition-colors ${
              filter === 'enterprise' ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30' : 'bg-zinc-900 text-zinc-500 border border-zinc-800'
            }`}
          >
            Enterprise ({mockIssues.filter(i => i.tier === 'enterprise').length})
          </button>
        </div>
      </div>

      {/* Issues list */}
      <div className="flex-1 overflow-y-auto p-2 space-y-2">
        {filteredIssues.map((issue, index) => (
          <motion.div
            key={issue.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            onClick={() => onSelectIssue(issue.id)}
            className="bg-zinc-900/30 border border-zinc-800/50 hover:border-zinc-700 rounded-lg p-2.5 cursor-pointer transition-all hover:bg-zinc-900/50"
          >
            {/* Header row */}
            <div className="flex items-start justify-between gap-2 mb-2">
              <div className="flex items-center gap-2 flex-1 min-w-0">
                <span className={`text-[10px] px-1.5 py-0.5 rounded border uppercase tracking-wide font-bold ${getTierBadge(issue.tier)}`}>
                  {issue.tier}
                </span>
                <span className="text-xs font-bold text-zinc-200 truncate">{issue.customerName}</span>
              </div>
              <div className={`flex items-center gap-1 text-[10px] font-medium ${getStatusColor(issue.status)}`}>
                {getStatusIcon(issue.status)}
                {issue.status.toUpperCase()}
              </div>
            </div>

            {/* Query */}
            <div className="text-[11px] text-zinc-400 mb-1.5 leading-tight">
              <span className="text-zinc-600">Query:</span> {issue.query}
            </div>

            {/* Problem */}
            <div className="text-[11px] text-red-400 mb-2 leading-tight font-medium">
              ⚠️ {issue.problem}
            </div>

            {/* Impact */}
            <div className="flex items-center gap-2 text-[10px]">
              <div className="flex items-center gap-1 text-amber-400">
                <DollarSign className="w-3 h-3" />
                <span>{issue.impact}</span>
              </div>
              <div className="text-zinc-600">•</div>
              <div className="text-zinc-500">
                {Math.floor((Date.now() - issue.timestamp.getTime()) / 60000)}m ago
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Stats footer */}
      <div className="border-t border-zinc-800/50 p-2 flex items-center justify-between text-[10px]">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-full bg-red-500" />
            <span className="text-zinc-500">Open: {mockIssues.filter(i => i.status === 'open').length}</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-full bg-green-500" />
            <span className="text-zinc-500">Verified: {mockIssues.filter(i => i.status === 'verified').length}</span>
          </div>
        </div>
        <div className="text-zinc-600">
          {filteredIssues.length} issues
        </div>
      </div>
    </div>
  )
}
