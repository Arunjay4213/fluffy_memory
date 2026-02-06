'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Bot, Activity, Zap, Database, TrendingUp, AlertCircle, Terminal, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import DataGrid from '@/components/terminal/DataGrid'

export default function AgentsPage() {
  const [selectedAgent, setSelectedAgent] = useState<any>(null)

  // Generate agent data
  const agents = Array.from({ length: 847 }, (_, i) => ({
    id: `agent-${String(i).padStart(4, '0')}`,
    name: ['legal', 'finance', 'hr', 'sales', 'support', 'ops', 'research', 'analytics'][Math.floor(Math.random() * 8)] + `-${String(i).padStart(3, '0')}`,
    status: ['active', 'idle', 'busy', 'error'][Math.floor(Math.random() * 4)],
    uptime: `${Math.floor(Math.random() * 168)}h ${Math.floor(Math.random() * 60)}m`,
    queries: Math.floor(Math.random() * 10000),
    avgLatency: (Math.random() * 50 + 3).toFixed(1),
    memoryUsage: (Math.random() * 2048 + 512).toFixed(0),
    accuracy: (0.85 + Math.random() * 0.14).toFixed(3),
    lastActive: new Date(Date.now() - Math.random() * 3600000).toISOString()
  }))

  const columns = [
    {
      key: 'id',
      label: 'AGENT ID',
      width: 'w-32',
      render: (value: string) => (
        <span className="text-xs font-mono text-blue-400 font-bold">{value}</span>
      )
    },
    {
      key: 'name',
      label: 'NAME',
      width: 'w-40',
      render: (value: string) => (
        <span className="text-xs font-mono text-purple-400">{value}</span>
      )
    },
    {
      key: 'status',
      label: 'STATUS',
      width: 'w-24',
      render: (value: string) => {
        const colors = {
          active: 'bg-green-500/20 text-green-400 border-green-500/50',
          idle: 'bg-zinc-500/20 text-zinc-400 border-zinc-500/50',
          busy: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/50',
          error: 'bg-red-500/20 text-red-400 border-red-500/50'
        }
        return (
          <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border ${colors[value as keyof typeof colors]} uppercase`}>
            {value}
          </span>
        )
      }
    },
    {
      key: 'uptime',
      label: 'UPTIME',
      width: 'w-28',
      render: (value: string) => (
        <span className="text-xs font-mono text-zinc-400">{value}</span>
      )
    },
    {
      key: 'queries',
      label: 'QUERIES',
      width: 'w-24',
      render: (value: number) => (
        <span className="text-xs font-mono text-cyan-400">{value.toLocaleString()}</span>
      )
    },
    {
      key: 'avgLatency',
      label: 'AVG LAT',
      width: 'w-24',
      render: (value: string) => {
        const lat = parseFloat(value)
        const color = lat < 10 ? 'text-green-400' : lat < 30 ? 'text-yellow-400' : 'text-red-400'
        return <span className={`text-xs font-mono ${color}`}>{value}ms</span>
      }
    },
    {
      key: 'memoryUsage',
      label: 'MEMORY',
      width: 'w-24',
      render: (value: string) => (
        <span className="text-xs font-mono text-zinc-400">{value}MB</span>
      )
    },
    {
      key: 'accuracy',
      label: 'ACCURACY',
      width: 'w-24',
      render: (value: string) => {
        const acc = parseFloat(value)
        const color = acc > 0.95 ? 'text-green-400' : acc > 0.90 ? 'text-yellow-400' : 'text-red-400'
        return <span className={`text-xs font-mono ${color}`}>{(acc * 100).toFixed(1)}%</span>
      }
    }
  ]

  const stats = [
    { label: 'Total Agents', value: '847', icon: Bot, color: 'text-blue-400', change: '+23' },
    { label: 'Active', value: '724', icon: Activity, color: 'text-green-400', change: '+12' },
    { label: 'Busy', value: '98', icon: Zap, color: 'text-yellow-400', change: '+8' },
    { label: 'Errors', value: '25', icon: AlertCircle, color: 'text-red-400', change: '-5' },
    { label: 'Avg Latency', value: '8.2ms', icon: TrendingUp, color: 'text-cyan-400', change: '-15%' },
    { label: 'Total Queries', value: '4.2M', icon: Database, color: 'text-purple-400', change: '+18%' }
  ]

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
                <div className="p-2 rounded-lg bg-blue-500/10 border border-blue-500/30">
                  <Bot className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-zinc-200">Agent Fleet Management</h1>
                  <p className="text-xs text-zinc-500">Real-time monitoring and control</p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="px-3 py-1.5 rounded-lg bg-green-500/10 border border-green-500/30">
                <span className="text-xs font-bold text-green-400">847 AGENTS ONLINE</span>
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
                  <div className="flex items-baseline gap-2">
                    <span className="text-sm font-bold text-zinc-200">{stat.value}</span>
                    <span className={`text-[10px] font-mono ${
                      stat.change.startsWith('+') || stat.change.includes('-') && !stat.change.startsWith('-')
                        ? 'text-green-400'
                        : 'text-red-400'
                    }`}>
                      {stat.change}
                    </span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Terminal className="w-4 h-4 text-blue-400" />
            <span className="text-sm text-zinc-400">Showing all active agents</span>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="text"
              placeholder="Search agents... (⌘F)"
              className="px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-xs text-zinc-300 placeholder:text-zinc-600 outline-none focus:border-zinc-700"
            />
            <button className="px-3 py-1.5 rounded-lg bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/30 text-xs text-blue-400 transition-colors">
              Filter
            </button>
            <button className="px-3 py-1.5 rounded-lg bg-green-500/10 hover:bg-green-500/20 border border-green-500/30 text-xs text-green-400 transition-colors">
              Export
            </button>
          </div>
        </div>

        <DataGrid
          data={agents}
          columns={columns}
          height="calc(100vh - 280px)"
          onRowClick={(row) => setSelectedAgent(row)}
        />
      </div>

      {/* Agent Detail Sidebar */}
      {selectedAgent && (
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          className="fixed top-0 right-0 h-screen w-96 bg-zinc-950 border-l border-zinc-800/50 shadow-2xl z-50 overflow-y-auto"
        >
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-zinc-200">Agent Details</h2>
              <button
                onClick={() => setSelectedAgent(null)}
                className="p-2 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-400"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4">
              <div className="p-4 rounded-lg bg-zinc-900 border border-zinc-800">
                <div className="text-xs text-zinc-600 mb-1">AGENT ID</div>
                <div className="text-sm font-mono text-blue-400">{selectedAgent.id}</div>
              </div>

              <div className="p-4 rounded-lg bg-zinc-900 border border-zinc-800">
                <div className="text-xs text-zinc-600 mb-1">NAME</div>
                <div className="text-sm font-mono text-zinc-200">{selectedAgent.name}</div>
              </div>

              <div className="p-4 rounded-lg bg-zinc-900 border border-zinc-800">
                <div className="text-xs text-zinc-600 mb-1">STATUS</div>
                <div className="text-sm font-mono text-green-400 uppercase">{selectedAgent.status}</div>
              </div>

              <div className="p-4 rounded-lg bg-zinc-900 border border-zinc-800">
                <div className="text-xs text-zinc-600 mb-2">PERFORMANCE METRICS</div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-xs text-zinc-500">Uptime</span>
                    <span className="text-xs font-mono text-zinc-300">{selectedAgent.uptime}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-xs text-zinc-500">Queries</span>
                    <span className="text-xs font-mono text-cyan-400">{selectedAgent.queries.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-xs text-zinc-500">Avg Latency</span>
                    <span className="text-xs font-mono text-green-400">{selectedAgent.avgLatency}ms</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-xs text-zinc-500">Memory Usage</span>
                    <span className="text-xs font-mono text-zinc-300">{selectedAgent.memoryUsage}MB</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-xs text-zinc-500">Accuracy</span>
                    <span className="text-xs font-mono text-green-400">{(parseFloat(selectedAgent.accuracy) * 100).toFixed(1)}%</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <button className="w-full px-4 py-2 rounded-lg bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/30 text-sm text-blue-400 transition-colors">
                  View Logs
                </button>
                <button className="w-full px-4 py-2 rounded-lg bg-green-500/10 hover:bg-green-500/20 border border-green-500/30 text-sm text-green-400 transition-colors">
                  Restart Agent
                </button>
                <button className="w-full px-4 py-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-sm text-red-400 transition-colors">
                  Stop Agent
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  )
}
