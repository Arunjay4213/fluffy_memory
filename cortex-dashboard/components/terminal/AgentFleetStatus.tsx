'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Bot, AlertCircle, CheckCircle, Clock, Database, Activity, TrendingUp } from 'lucide-react'

interface Agent {
  id: string
  name: string
  type: string
  status: 'healthy' | 'degraded' | 'critical'
  memoryCount: number
  issuesCount: number
  clientsServed: string[]
  lastQuery: Date
  queriesLast24h: number
  avgLatency: number
}

const mockAgents: Agent[] = [
  {
    id: 'agent_legal_001',
    name: 'Legal Research Agent',
    type: 'Research & Analysis',
    status: 'critical',
    memoryCount: 3420,
    issuesCount: 3,
    clientsServed: ['Partner A ($280K/yr)', 'LegalTech Pro ($190K/yr)'],
    lastQuery: new Date(Date.now() - 120000),
    queriesLast24h: 847,
    avgLatency: 12
  },
  {
    id: 'agent_email_001',
    name: 'Email Writer Agent',
    type: 'Communication',
    status: 'degraded',
    memoryCount: 1850,
    issuesCount: 1,
    clientsServed: ['ACME Corp ($450K/yr)', 'StartupXYZ ($90K/yr)'],
    lastQuery: new Date(Date.now() - 30000),
    queriesLast24h: 2341,
    avgLatency: 8
  },
  {
    id: 'agent_data_001',
    name: 'Data Analysis Agent',
    type: 'Analytics',
    status: 'healthy',
    memoryCount: 5670,
    issuesCount: 0,
    clientsServed: ['TechCo ($380K/yr)', 'DataCorp ($220K/yr)', 'Analytics Inc ($150K/yr)'],
    lastQuery: new Date(Date.now() - 5000),
    queriesLast24h: 4521,
    avgLatency: 15
  },
  {
    id: 'agent_code_001',
    name: 'Code Generation Agent',
    type: 'Development',
    status: 'degraded',
    memoryCount: 2890,
    issuesCount: 2,
    clientsServed: ['DevShop ($120K/yr)', 'StartupXYZ ($90K/yr)'],
    lastQuery: new Date(Date.now() - 45000),
    queriesLast24h: 1653,
    avgLatency: 11
  },
  {
    id: 'agent_support_001',
    name: 'Customer Support Agent',
    type: 'Support',
    status: 'critical',
    memoryCount: 4230,
    issuesCount: 4,
    clientsServed: ['ACME Corp ($450K/yr)', 'SupportCo ($180K/yr)'],
    lastQuery: new Date(Date.now() - 2000),
    queriesLast24h: 8924,
    avgLatency: 6
  },
  {
    id: 'agent_search_001',
    name: 'Search & Discovery Agent',
    type: 'Information Retrieval',
    status: 'healthy',
    memoryCount: 8940,
    issuesCount: 0,
    clientsServed: ['SearchTech ($320K/yr)', 'DataCorp ($220K/yr)'],
    lastQuery: new Date(Date.now() - 1000),
    queriesLast24h: 15237,
    avgLatency: 9
  },
  {
    id: 'agent_summary_001',
    name: 'Document Summarizer',
    type: 'Content Processing',
    status: 'healthy',
    memoryCount: 1120,
    issuesCount: 0,
    clientsServed: ['LegalTech Pro ($190K/yr)', 'ContentCo ($140K/yr)'],
    lastQuery: new Date(Date.now() - 60000),
    queriesLast24h: 456,
    avgLatency: 18
  },
  {
    id: 'agent_translation_001',
    name: 'Translation Agent',
    type: 'Language',
    status: 'healthy',
    memoryCount: 6780,
    issuesCount: 0,
    clientsServed: ['GlobalCorp ($890K/yr)', 'LangTech ($210K/yr)'],
    lastQuery: new Date(Date.now() - 15000),
    queriesLast24h: 3421,
    avgLatency: 14
  }
]

export default function AgentFleetStatus({
  onSelectAgent,
  selectedAgentId
}: {
  onSelectAgent: (agentId: string) => void
  selectedAgentId: string | null
}) {
  const [filter, setFilter] = useState<'all' | 'issues'>('all')
  const [sortBy, setSortBy] = useState<'status' | 'queries' | 'clients'>('status')

  const filteredAgents = mockAgents
    .filter(agent => filter === 'all' || agent.issuesCount > 0)
    .sort((a, b) => {
      if (sortBy === 'status') {
        const statusOrder = { critical: 0, degraded: 1, healthy: 2 }
        return statusOrder[a.status] - statusOrder[b.status]
      }
      if (sortBy === 'queries') return b.queriesLast24h - a.queriesLast24h
      if (sortBy === 'clients') return b.clientsServed.length - a.clientsServed.length
      return 0
    })

  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'critical':
        return {
          color: 'text-red-400',
          bgColor: 'bg-red-500/20',
          borderColor: 'border-red-500/30',
          icon: AlertCircle
        }
      case 'degraded':
        return {
          color: 'text-amber-400',
          bgColor: 'bg-amber-500/20',
          borderColor: 'border-amber-500/30',
          icon: Clock
        }
      default:
        return {
          color: 'text-green-400',
          bgColor: 'bg-green-500/20',
          borderColor: 'border-green-500/30',
          icon: CheckCircle
        }
    }
  }

  const totalIssues = mockAgents.reduce((sum, a) => sum + a.issuesCount, 0)
  const criticalAgents = mockAgents.filter(a => a.status === 'critical').length

  return (
    <div className="flex flex-col h-full">
      {/* Header with filters */}
      <div className="p-3 border-b border-zinc-800/50 space-y-3">
        <div className="flex items-center justify-between">
          <div className="text-[10px] text-zinc-500 uppercase tracking-wide font-bold">Agent Fleet</div>
          <div className="flex items-center gap-2">
            <div className="text-[10px] text-zinc-600">{mockAgents.length} active</div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setFilter('all')}
            className={`px-2 py-1 rounded text-[10px] font-medium transition-all duration-150 ${
              filter === 'all'
                ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30 shadow-sm'
                : 'bg-zinc-900 text-zinc-500 border border-zinc-800 hover:bg-zinc-800 hover:text-zinc-300 hover:border-zinc-700'
            }`}
          >
            All ({mockAgents.length})
          </button>
          <button
            onClick={() => setFilter('issues')}
            className={`px-2 py-1 rounded text-[10px] font-medium transition-all duration-150 ${
              filter === 'issues'
                ? 'bg-red-500/20 text-red-400 border border-red-500/30 shadow-sm'
                : 'bg-zinc-900 text-zinc-500 border border-zinc-800 hover:bg-zinc-800 hover:text-zinc-300 hover:border-zinc-700'
            }`}
          >
            Issues ({totalIssues})
          </button>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[10px] text-zinc-600 uppercase tracking-wide">Sort:</span>
          <button
            onClick={() => setSortBy('status')}
            className={`px-2 py-0.5 rounded text-[10px] transition-all duration-150 ${
              sortBy === 'status'
                ? 'bg-zinc-800 text-zinc-300'
                : 'text-zinc-600 hover:bg-zinc-900 hover:text-zinc-400'
            }`}
          >
            Status
          </button>
          <button
            onClick={() => setSortBy('queries')}
            className={`px-2 py-0.5 rounded text-[10px] transition-all duration-150 ${
              sortBy === 'queries'
                ? 'bg-zinc-800 text-zinc-300'
                : 'text-zinc-600 hover:bg-zinc-900 hover:text-zinc-400'
            }`}
          >
            Queries
          </button>
          <button
            onClick={() => setSortBy('clients')}
            className={`px-2 py-0.5 rounded text-[10px] transition-all duration-150 ${
              sortBy === 'clients'
                ? 'bg-zinc-800 text-zinc-300'
                : 'text-zinc-600 hover:bg-zinc-900 hover:text-zinc-400'
            }`}
          >
            Clients
          </button>
        </div>
      </div>

      {/* Agent list */}
      <div className="flex-1 overflow-y-auto p-2 space-y-2">
        {filteredAgents.map((agent, index) => {
          const config = getStatusConfig(agent.status)
          const StatusIcon = config.icon
          const isSelected = agent.id === selectedAgentId

          return (
            <motion.div
              key={agent.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              onClick={() => onSelectAgent(agent.id)}
              className={`rounded-lg p-3 cursor-pointer transition-all duration-200 ${
                isSelected
                  ? 'bg-blue-500/20 border-2 border-blue-500/60 shadow-lg shadow-blue-500/20'
                  : `bg-zinc-900/30 border ${config.borderColor} hover:bg-zinc-900/50 hover:border-opacity-70 hover:scale-[1.01]`
              }`}
            >
              {/* Header */}
              <div className="flex items-start justify-between gap-2 mb-2">
                <div className="flex items-center gap-2 flex-1 min-w-0">
                  <Bot className="w-4 h-4 text-blue-400 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-bold text-zinc-200 truncate">{agent.name}</div>
                    <div className="text-[10px] text-zinc-500">{agent.type}</div>
                  </div>
                </div>
                <div className={`flex items-center gap-1 px-2 py-0.5 rounded border ${config.bgColor} ${config.borderColor}`}>
                  <StatusIcon className={`w-3 h-3 ${config.color}`} />
                  <span className={`text-[10px] font-bold uppercase ${config.color}`}>
                    {agent.status}
                  </span>
                </div>
              </div>

              {/* Issues badge */}
              {agent.issuesCount > 0 && (
                <div className="mb-2">
                  <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-red-500/20 border border-red-500/30">
                    <AlertCircle className="w-3 h-3 text-red-400" />
                    <span className="text-[10px] font-bold text-red-400">
                      {agent.issuesCount} {agent.issuesCount === 1 ? 'issue' : 'issues'}
                    </span>
                  </div>
                </div>
              )}

              {/* Stats grid */}
              <div className="grid grid-cols-3 gap-2 mb-2">
                <div className="bg-zinc-900/50 rounded p-1.5">
                  <div className="text-[9px] text-zinc-600 uppercase">Memories</div>
                  <div className="text-xs font-bold text-zinc-300">{agent.memoryCount.toLocaleString()}</div>
                </div>
                <div className="bg-zinc-900/50 rounded p-1.5">
                  <div className="text-[9px] text-zinc-600 uppercase">Queries/24h</div>
                  <div className="text-xs font-bold text-zinc-300">{agent.queriesLast24h.toLocaleString()}</div>
                </div>
                <div className="bg-zinc-900/50 rounded p-1.5">
                  <div className="text-[9px] text-zinc-600 uppercase">Latency</div>
                  <div className="text-xs font-bold text-zinc-300">{agent.avgLatency}ms</div>
                </div>
              </div>

              {/* Clients served */}
              <div>
                <div className="text-[9px] text-zinc-600 uppercase mb-1">Clients Served</div>
                <div className="space-y-0.5">
                  {agent.clientsServed.slice(0, 2).map((client, i) => (
                    <div key={i} className="text-[10px] text-zinc-400 truncate">• {client}</div>
                  ))}
                  {agent.clientsServed.length > 2 && (
                    <div className="text-[10px] text-zinc-600">+ {agent.clientsServed.length - 2} more</div>
                  )}
                </div>
              </div>

              {/* Last activity */}
              <div className="mt-2 pt-2 border-t border-zinc-800/50 text-[10px] text-zinc-600">
                Last query: {Math.floor((Date.now() - agent.lastQuery.getTime()) / 1000)}s ago
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* Fleet summary */}
      <div className="border-t border-zinc-800/50 p-2 flex items-center justify-between text-[10px]">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-full bg-red-500" />
            <span className="text-zinc-500">Critical: {criticalAgents}</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-full bg-amber-500" />
            <span className="text-zinc-500">Issues: {totalIssues}</span>
          </div>
        </div>
        <div className="text-zinc-600">
          {filteredAgents.length} agents
        </div>
      </div>
    </div>
  )
}
