'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  Terminal, Bot, Database, Brain, TrendingUp, Activity, Zap,
  Shield, AlertCircle, Clock, ChevronRight, Command, Grid3x3
} from 'lucide-react'
import CommandPalette from '@/components/terminal/CommandPalette'
import MarketTicker from '@/components/terminal/MarketTicker'
import DataGrid from '@/components/terminal/DataGrid'
import ActivityFeed from '@/components/terminal/ActivityFeed'

export default function BloombergTerminal() {
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false)
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setCommandPaletteOpen(true)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  // Generate sample memory data
  const memoryData = Array.from({ length: 10000 }, (_, i) => ({
    id: `mem_${String(i).padStart(6, '0')}`,
    agent: ['legal-001', 'finance-012', 'hr-003', 'sales-045', 'support-089'][Math.floor(Math.random() * 5)],
    content: [
      'Case precedent from 2023 merger agreement',
      'Q4 revenue projections and analysis',
      'Employee benefits policy update',
      'Client engagement metrics dashboard',
      'Support ticket resolution procedure'
    ][Math.floor(Math.random() * 5)],
    confidence: (0.7 + Math.random() * 0.3).toFixed(3),
    tier: ['hot', 'warm', 'cold'][Math.floor(Math.random() * 3)],
    lastAccessed: new Date(Date.now() - Math.random() * 86400000 * 30).toISOString().split('T')[0],
    attribution: (Math.random() * 100).toFixed(2),
    size: `${(Math.random() * 50 + 5).toFixed(1)}KB`
  }))

  const memoryColumns = [
    {
      key: 'id',
      label: 'MEMORY ID',
      width: 'w-32',
      render: (value: string) => (
        <span className="text-xs font-mono text-blue-400">{value}</span>
      )
    },
    {
      key: 'agent',
      label: 'AGENT',
      width: 'w-28',
      render: (value: string) => (
        <span className="text-xs font-mono text-purple-400">{value}</span>
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
      key: 'confidence',
      label: 'CONF',
      width: 'w-20',
      render: (value: string) => {
        const conf = parseFloat(value)
        const color = conf > 0.9 ? 'text-green-400' : conf > 0.8 ? 'text-yellow-400' : 'text-red-400'
        return <span className={`text-xs font-mono ${color}`}>{value}</span>
      }
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
      key: 'lastAccessed',
      label: 'ACCESSED',
      width: 'w-28',
      render: (value: string) => (
        <span className="text-xs font-mono text-zinc-500">{value}</span>
      )
    },
    {
      key: 'attribution',
      label: 'ATTR',
      width: 'w-20',
      render: (value: string) => (
        <span className="text-xs font-mono text-cyan-400">{value}%</span>
      )
    },
    {
      key: 'size',
      label: 'SIZE',
      width: 'w-20',
      render: (value: string) => (
        <span className="text-xs font-mono text-zinc-500">{value}</span>
      )
    }
  ]

  const quickStats = [
    { label: 'AGENTS', value: '847', change: '+23', icon: Bot, color: 'text-blue-400' },
    { label: 'MEMORIES', value: '1.24M', change: '+12.5K', icon: Database, color: 'text-purple-400' },
    { label: 'P95 LAT', value: '8.2ms', change: '-15%', icon: Zap, color: 'text-green-400' },
    { label: 'QUALITY', value: '94.7%', change: '+1.2%', icon: TrendingUp, color: 'text-emerald-400' },
    { label: 'ALERTS', value: '23', change: '-45%', icon: AlertCircle, color: 'text-amber-400' },
    { label: 'COST', value: '$0.042', change: '-8.3%', icon: Activity, color: 'text-cyan-400' }
  ]

  return (
    <div className="h-screen bg-black flex flex-col overflow-hidden font-mono text-xs">
      {/* Command Palette */}
      <CommandPalette isOpen={commandPaletteOpen} onClose={() => setCommandPaletteOpen(false)} />

      {/* Market Ticker */}
      <MarketTicker />

      {/* Main Header */}
      <div className="h-12 bg-zinc-950 border-b border-zinc-800/50 flex items-center px-4 gap-4 flex-shrink-0">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 blur-lg opacity-50" />
            <div className="relative w-7 h-7 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
              <Terminal className="w-4 h-4 text-white" />
            </div>
          </div>
          <div>
            <div className="text-sm font-bold text-zinc-200">
              CORTEX<span className="text-blue-400">OS</span>
            </div>
            <div className="text-[9px] text-zinc-600 uppercase tracking-wider">
              Agent Intelligence Platform
            </div>
          </div>
        </div>

        <div className="h-6 w-px bg-zinc-800" />

        <div className="flex items-center gap-2 px-2 py-1 rounded bg-zinc-900 border border-zinc-800">
          <span className="text-[9px] text-zinc-600 uppercase tracking-wider">Workspace</span>
          <span className="text-xs font-bold text-zinc-300">ConsultCo</span>
          <ChevronRight className="w-3 h-3 text-zinc-600" />
        </div>

        <button
          onClick={() => setCommandPaletteOpen(true)}
          className="flex items-center gap-2 px-3 py-1 rounded bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 hover:border-zinc-700 transition-colors group"
        >
          <Command className="w-3 h-3 text-zinc-500 group-hover:text-zinc-400" />
          <span className="text-[10px] text-zinc-500 group-hover:text-zinc-400">Command Palette</span>
          <kbd className="text-[9px] px-1 py-0.5 rounded bg-zinc-800 border border-zinc-700 text-zinc-600">⌘K</kbd>
        </button>

        <div className="flex-1" />

        {/* System Status */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 px-2 py-1 rounded bg-green-500/10 border border-green-500/30">
            <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
            <span className="text-[10px] font-bold text-green-400">OPERATIONAL</span>
          </div>

          <div className="h-4 w-px bg-zinc-800" />

          <div className="text-[10px] text-zinc-600">
            {currentTime.toLocaleString('en-US', {
              month: 'short',
              day: '2-digit',
              hour: '2-digit',
              minute: '2-digit',
              second: '2-digit',
              hour12: false
            })}
          </div>
        </div>
      </div>

      {/* Quick Stats Bar */}
      <div className="h-16 bg-zinc-950 border-b border-zinc-800/50 px-4 flex items-center gap-3 flex-shrink-0">
        {quickStats.map((stat) => {
          const Icon = stat.icon
          return (
            <div
              key={stat.label}
              className="flex items-center gap-3 px-3 py-2 rounded bg-zinc-900/50 border border-zinc-800/50 hover:border-zinc-700 transition-colors cursor-pointer group"
            >
              <div className="p-2 rounded bg-zinc-900 border border-zinc-800 group-hover:border-zinc-700 transition-colors">
                <Icon className={`w-4 h-4 ${stat.color}`} />
              </div>
              <div>
                <div className="text-[9px] text-zinc-600 uppercase tracking-wider mb-0.5">
                  {stat.label}
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-sm font-bold text-zinc-200">{stat.value}</span>
                  <span className={`text-[10px] font-mono ${
                    stat.change.startsWith('+') ? 'text-green-400' : 'text-red-400'
                  }`}>
                    {stat.change}
                  </span>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Main Content Area - Multi-Panel Layout */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Panel - Quick Access */}
        <div className="w-56 bg-zinc-950 border-r border-zinc-800/50 flex flex-col flex-shrink-0">
          <div className="p-3 border-b border-zinc-800/50">
            <div className="text-[9px] font-bold text-zinc-600 uppercase tracking-wider mb-2">
              Navigation
            </div>
            <div className="space-y-1">
              {[
                { icon: Grid3x3, label: 'Overview', active: true },
                { icon: Bot, label: 'Agent Fleet' },
                { icon: Database, label: 'Memory Store' },
                { icon: Brain, label: 'Attribution' },
                { icon: Activity, label: 'Health Monitor' },
                { icon: Shield, label: 'Compliance' }
              ].map((item) => {
                const Icon = item.icon
                return (
                  <button
                    key={item.label}
                    className={`w-full flex items-center gap-2 px-2 py-1.5 rounded transition-colors ${
                      item.active
                        ? 'bg-blue-500/10 text-blue-400 border border-blue-500/30'
                        : 'text-zinc-500 hover:text-zinc-300 hover:bg-zinc-900/50'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span className="text-[11px] font-medium">{item.label}</span>
                  </button>
                )
              })}
            </div>
          </div>

          <div className="flex-1 p-3 overflow-y-auto">
            <div className="text-[9px] font-bold text-zinc-600 uppercase tracking-wider mb-2">
              Recent Queries
            </div>
            <div className="space-y-2">
              {[
                'mem_legal_042 attribution',
                'agent:legal-001 status',
                'contradiction scan',
                'hot tier usage'
              ].map((query, i) => (
                <div
                  key={i}
                  className="text-[10px] text-zinc-500 hover:text-zinc-300 cursor-pointer font-mono p-1.5 rounded hover:bg-zinc-900/50 transition-colors"
                >
                  {query}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Center Panel - Data Grid */}
        <div className="flex-1 flex flex-col overflow-hidden p-2 gap-2">
          <div className="flex-1 overflow-hidden">
            <DataGrid
              data={memoryData}
              columns={memoryColumns}
              height="100%"
              onRowClick={(row) => console.log('Selected:', row)}
            />
          </div>
        </div>

        {/* Right Panel - Activity Feed & Quick Actions */}
        <div className="w-80 bg-zinc-950 border-l border-zinc-800/50 flex flex-col flex-shrink-0">
          <div className="flex-1 flex flex-col overflow-hidden">
            <ActivityFeed />
          </div>

          {/* Quick Actions */}
          <div className="p-3 border-t border-zinc-800/50 bg-black/50">
            <div className="text-[9px] font-bold text-zinc-600 uppercase tracking-wider mb-2">
              Quick Actions
            </div>
            <div className="space-y-1.5">
              {[
                { label: 'Run Attribution', shortcut: '⌘R', color: 'blue' },
                { label: 'Health Check', shortcut: '⌘H', color: 'green' },
                { label: 'Export Data', shortcut: '⌘E', color: 'purple' }
              ].map((action) => (
                <button
                  key={action.label}
                  className="w-full flex items-center justify-between px-2 py-1.5 rounded bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 hover:border-zinc-700 transition-colors group"
                >
                  <span className="text-[10px] text-zinc-400 group-hover:text-zinc-300">
                    {action.label}
                  </span>
                  <kbd className="text-[9px] px-1 py-0.5 rounded bg-zinc-800 border border-zinc-700 text-zinc-600">
                    {action.shortcut}
                  </kbd>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Command Bar */}
      <div className="h-8 bg-zinc-950 border-t border-zinc-800/50 flex items-center px-4 gap-3 flex-shrink-0">
        <Terminal className="w-3 h-3 text-blue-400" />
        <span className="text-zinc-600">&gt;</span>
        <input
          type="text"
          placeholder="Type command or query... (⌘K for palette)"
          className="flex-1 bg-transparent text-[11px] text-zinc-200 placeholder:text-zinc-700 outline-none"
        />
        <div className="flex items-center gap-3 text-[10px] text-zinc-600">
          <span>Ready</span>
          <span>•</span>
          <span>8ms avg</span>
          <span>•</span>
          <span>847 agents</span>
        </div>
      </div>
    </div>
  )
}
