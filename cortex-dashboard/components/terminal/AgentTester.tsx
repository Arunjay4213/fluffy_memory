'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Play, Users, Clock, Database, TrendingUp, AlertCircle } from 'lucide-react'

interface QueryLog {
  id: string
  query: string
  timestamp: Date
  client: string
  memoriesUsed: { id: string; score: number; text: string }[]
  latency: number
  status: 'success' | 'warning' | 'error'
}

const mockQueryLogs: QueryLog[] = [
  {
    id: 'q_001',
    query: 'Find precedent for broad discovery in employment discrimination',
    timestamp: new Date(Date.now() - 120000),
    client: 'Partner A',
    memoriesUsed: [
      {
        id: 'mem_legal_042',
        score: 0.92,
        text: 'Ross v. Jenkins (2nd Circuit, 2019): Broad discovery allowed...'
      },
      {
        id: 'mem_legal_089',
        score: 0.78,
        text: 'Smith v. Corp (2020): Discovery scope in employment cases...'
      }
    ],
    latency: 12,
    status: 'success'
  },
  {
    id: 'q_002',
    query: 'Attorney-client privilege scope in preliminary interviews',
    timestamp: new Date(Date.now() - 180000),
    client: 'Partner A',
    memoriesUsed: [
      {
        id: 'mem_legal_001',
        score: 0.88,
        text: 'State Bar Ethics Opinion 2022-15: Privilege extends to interviews...'
      },
      {
        id: 'mem_legal_042',
        score: 0.65,
        text: 'Ross v. Jenkins (2nd Circuit, 2019): Broad discovery...'
      }
    ],
    latency: 15,
    status: 'warning'
  },
  {
    id: 'q_003',
    query: 'Employment discrimination case filing requirements California',
    timestamp: new Date(Date.now() - 300000),
    client: 'LegalTech Pro',
    memoriesUsed: [
      {
        id: 'mem_legal_156',
        score: 0.91,
        text: 'California FEHA filing requirements: 3-year statute...'
      }
    ],
    latency: 9,
    status: 'success'
  }
]

export default function AgentTester({ selectedAgentId }: { selectedAgentId: string | null }) {
  const [testQuery, setTestQuery] = useState('')
  const [testResult, setTestResult] = useState<any>(null)
  const [isTesting, setIsTesting] = useState(false)

  if (!selectedAgentId) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center space-y-3 p-8">
          <Play className="w-12 h-12 text-zinc-700 mx-auto" />
          <div className="text-sm text-zinc-500">
            Select an agent to test queries
          </div>
          <div className="text-xs text-zinc-600 max-w-xs">
            Type a query and see which memories get retrieved in real-time
          </div>
        </div>
      </div>
    )
  }

  const handleTestQuery = () => {
    if (!testQuery.trim()) return

    setIsTesting(true)

    // Simulate API call
    setTimeout(() => {
      setTestResult({
        query: testQuery,
        memoriesRetrieved: [
          {
            id: 'mem_legal_042',
            score: 0.92,
            text: 'Ross v. Jenkins (2nd Circuit, 2019): Broad discovery is allowed in employment discrimination cases when the scope is reasonably calculated to lead to admissible evidence.',
            criticality: 0.85,
            tier: 'hot'
          },
          {
            id: 'mem_legal_089',
            score: 0.78,
            text: 'Smith v. Corporation (2020): Discovery scope limited in cases without substantial showing of relevance.',
            criticality: 0.72,
            tier: 'hot'
          },
          {
            id: 'mem_legal_156',
            score: 0.64,
            text: 'Jones v. Employer (2018): Federal discovery rules apply when federal claims present.',
            criticality: 0.65,
            tier: 'warm'
          }
        ],
        latency: 14,
        timestamp: new Date()
      })
      setIsTesting(false)
    }, 1000)
  }

  const agentStats = {
    name: 'Legal Research Agent',
    clients: ['Partner A ($280K/yr)', 'LegalTech Pro ($190K/yr)'],
    queriesLast24h: 847,
    avgLatency: 12,
    memoryCount: 3420
  }

  return (
    <div className="flex flex-col h-full">
      {/* Agent context header */}
      <div className="p-3 border-b border-zinc-800/50 space-y-3">
        <div className="text-[10px] text-zinc-500 uppercase tracking-wide font-bold">
          Agent Context
        </div>

        <div className="bg-zinc-900/30 border border-zinc-800/50 rounded-lg p-3 space-y-2">
          <div className="text-xs font-bold text-zinc-200">{agentStats.name}</div>

          <div className="grid grid-cols-2 gap-2 text-[10px]">
            <div>
              <span className="text-zinc-600">Queries/24h:</span>
              <span className="ml-1 text-zinc-300 font-bold">{agentStats.queriesLast24h}</span>
            </div>
            <div>
              <span className="text-zinc-600">Latency:</span>
              <span className="ml-1 text-zinc-300 font-bold">{agentStats.avgLatency}ms</span>
            </div>
            <div className="col-span-2">
              <span className="text-zinc-600">Memories:</span>
              <span className="ml-1 text-zinc-300 font-bold">{agentStats.memoryCount.toLocaleString()}</span>
            </div>
          </div>

          <div className="pt-2 border-t border-zinc-800/50">
            <div className="text-[9px] text-zinc-600 uppercase mb-1">Clients Served</div>
            {agentStats.clients.map((client, i) => (
              <div key={i} className="text-[10px] text-zinc-400">• {client}</div>
            ))}
          </div>
        </div>
      </div>

      {/* Test query section */}
      <div className="p-3 border-b border-zinc-800/50 space-y-3">
        <div className="text-[10px] text-zinc-500 uppercase tracking-wide font-bold">
          Test Query
        </div>

        <div className="space-y-2">
          <textarea
            value={testQuery}
            onChange={(e) => setTestQuery(e.target.value)}
            rows={3}
            placeholder="Type a query to test memory retrieval... (e.g., 'Find precedent for discovery in employment cases')"
            className="w-full bg-zinc-900/50 border border-zinc-800 rounded-lg px-3 py-2 text-xs text-zinc-200 placeholder:text-zinc-700 focus:outline-none focus:border-blue-500/50 resize-none"
          />

          <button
            onClick={handleTestQuery}
            disabled={!testQuery.trim() || isTesting}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-blue-500/20 hover:bg-blue-500/30 hover:scale-[1.02] text-blue-400 border border-blue-500/30 text-xs font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm hover:shadow-lg hover:shadow-blue-500/20"
          >
            {isTesting ? (
              <>
                <div className="w-3 h-3 border-2 border-blue-400 border-t-transparent rounded-full animate-spin" />
                Testing...
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5" />
                Run Test
              </>
            )}
          </button>
        </div>

        {/* Test result */}
        {testResult && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-zinc-900/50 border border-zinc-800 rounded-lg p-3 space-y-3"
          >
            <div className="flex items-center justify-between text-[10px]">
              <span className="text-green-400 font-bold">✓ Retrieved {testResult.memoriesRetrieved.length} memories</span>
              <span className="text-zinc-600">{testResult.latency}ms</span>
            </div>

            <div className="space-y-2">
              {testResult.memoriesRetrieved.map((mem: any, i: number) => (
                <div
                  key={i}
                  className="bg-zinc-900/30 border border-zinc-800/50 rounded-lg p-2 space-y-1"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono text-blue-400">{mem.id}</span>
                    <div className="flex items-center gap-2">
                      <span className={`text-[10px] font-bold ${
                        mem.score >= 0.8 ? 'text-green-400' :
                        mem.score >= 0.6 ? 'text-amber-400' : 'text-red-400'
                      }`}>
                        {(mem.score * 100).toFixed(0)}%
                      </span>
                      <span className={`text-[9px] uppercase ${
                        mem.tier === 'hot' ? 'text-red-400' :
                        mem.tier === 'warm' ? 'text-amber-400' : 'text-blue-400'
                      }`}>
                        {mem.tier}
                      </span>
                    </div>
                  </div>
                  <div className="text-[10px] text-zinc-400 leading-tight">
                    {mem.text.length > 80 ? `${mem.text.substring(0, 80)}...` : mem.text}
                  </div>
                </div>
              ))}
            </div>

            <div className="text-[10px] text-zinc-600 italic">
              Test completed at {testResult.timestamp.toLocaleTimeString()}
            </div>
          </motion.div>
        )}
      </div>

      {/* Recent query logs */}
      <div className="flex-1 overflow-y-auto p-3 space-y-3">
        <div className="flex items-center justify-between">
          <div className="text-[10px] text-zinc-500 uppercase tracking-wide font-bold">
            Recent Queries
          </div>
          <div className="text-[9px] text-zinc-600 italic">Click to test</div>
        </div>

        <div className="space-y-2">
          {mockQueryLogs.map((log, index) => (
            <motion.div
              key={log.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              onClick={() => {
                setTestQuery(log.query)
                window.scrollTo({ top: 0, behavior: 'smooth' })
              }}
              className="bg-zinc-900/30 border border-zinc-800/50 rounded-lg p-2.5 hover:border-zinc-700 hover:bg-zinc-900/50 hover:scale-[1.01] transition-all duration-200 cursor-pointer group"
            >
              {/* Query header */}
              <div className="flex items-start justify-between gap-2 mb-2">
                <div className="flex-1 min-w-0">
                  <div className="text-[11px] text-zinc-300 font-medium mb-1 leading-tight">
                    {log.query}
                  </div>
                  <div className="text-[10px] text-zinc-600">
                    {log.client} • {Math.floor((Date.now() - log.timestamp.getTime()) / 60000)}m ago
                  </div>
                </div>
                <div className={`flex items-center gap-1 px-1.5 py-0.5 rounded text-[9px] font-bold uppercase ${
                  log.status === 'success' ? 'bg-green-500/20 text-green-400 border border-green-500/30' :
                  log.status === 'warning' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' :
                  'bg-red-500/20 text-red-400 border border-red-500/30'
                }`}>
                  {log.status === 'success' && '✓'}
                  {log.status === 'warning' && '⚠'}
                  {log.status === 'error' && '✗'}
                </div>
              </div>

              {/* Memories used */}
              <div className="space-y-1">
                {log.memoriesUsed.slice(0, 2).map((mem, i) => (
                  <div key={i} className="flex items-center justify-between text-[10px] text-zinc-500">
                    <span className="font-mono text-blue-400">{mem.id}</span>
                    <span className="font-bold text-zinc-400">{(mem.score * 100).toFixed(0)}%</span>
                  </div>
                ))}
              </div>

              {/* Latency */}
              <div className="mt-2 pt-2 border-t border-zinc-800/50 flex items-center justify-between text-[10px] text-zinc-600">
                <span>Latency: {log.latency}ms</span>
                <span>{log.memoriesUsed.length} memories used</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
