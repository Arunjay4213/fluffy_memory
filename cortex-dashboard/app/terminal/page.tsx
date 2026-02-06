'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Activity, AlertTriangle, Database, Zap, TrendingUp, Search, Terminal, GitBranch, Shield, Clock } from 'lucide-react'
import LiveTape from '@/components/terminal/LiveTape'
import MemoryGraph from '@/components/terminal/MemoryGraph'
import AlertStream from '@/components/terminal/AlertStream'
import CommandBar from '@/components/terminal/CommandBar'
import QuickStats from '@/components/terminal/QuickStats'

export default function TerminalPage() {
  const [selectedMemory, setSelectedMemory] = useState<string | null>(null)
  const [liveMode, setLiveMode] = useState(true)

  return (
    <div className="h-screen bg-[#0a0a0f] flex flex-col overflow-hidden font-mono text-sm">
      {/* Top Bar - Quick Stats */}
      <div className="h-14 border-b border-zinc-800/50 glass-strong flex items-center px-4 gap-4 flex-shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
            <Terminal className="w-4 h-4 text-white" />
          </div>
          <div>
            <span className="text-xs text-zinc-500 uppercase tracking-wider">CortexOS Terminal</span>
            <div className="flex items-center gap-2 mt-0.5">
              <div className="flex items-center gap-1.5">
                <div className={`w-1.5 h-1.5 rounded-full ${liveMode ? 'bg-green-500 animate-pulse' : 'bg-zinc-600'}`} />
                <span className="text-xs text-zinc-400">{liveMode ? 'LIVE' : 'PAUSED'}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="ml-4 px-2.5 py-1 rounded-md bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/30">
          <span className="text-[10px] font-bold text-blue-400 uppercase tracking-wider">Real-World Production Scenarios</span>
        </div>

        <div className="flex-1" />

        <QuickStats />

        <div className="flex items-center gap-2">
          <button className="px-3 py-1.5 rounded bg-zinc-900 hover:bg-zinc-800 text-xs text-zinc-400 hover:text-zinc-200 border border-zinc-800">
            <Search className="w-3 h-3" />
          </button>
          <button
            onClick={() => setLiveMode(!liveMode)}
            className={`px-3 py-1.5 rounded text-xs border ${
              liveMode
                ? 'bg-green-500/10 text-green-400 border-green-500/30'
                : 'bg-zinc-900 text-zinc-400 border-zinc-800'
            }`}
          >
            {liveMode ? 'PAUSE' : 'RESUME'}
          </button>
        </div>
      </div>

      {/* Main Content - Bloomberg 3-Column Layout */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Panel - Live Tape */}
        <div className="w-[380px] border-r border-zinc-800/50 glass flex flex-col flex-shrink-0">
          <div className="h-10 border-b border-zinc-800/50 flex items-center px-3 bg-black/30">
            <Activity className="w-3.5 h-3.5 text-blue-400 mr-2" />
            <span className="text-xs font-bold text-zinc-300 uppercase tracking-wide">Live Tape</span>
            <div className="ml-auto text-xs text-zinc-600">142 events</div>
          </div>
          <LiveTape liveMode={liveMode} onSelectMemory={setSelectedMemory} />
        </div>

        {/* Center Panel - Memory Graph */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <div className="h-10 border-b border-zinc-800/50 glass-strong flex items-center px-3">
            <GitBranch className="w-3.5 h-3.5 text-purple-400 mr-2" />
            <span className="text-xs font-bold text-zinc-300 uppercase tracking-wide">Memory Graph Explorer</span>
            <div className="ml-4 flex items-center gap-2">
              <button className="px-2 py-0.5 rounded text-xs bg-zinc-900 hover:bg-zinc-800 text-zinc-400 border border-zinc-800">
                Layout
              </button>
              <button className="px-2 py-0.5 rounded text-xs bg-zinc-900 hover:bg-zinc-800 text-zinc-400 border border-zinc-800">
                Filter
              </button>
            </div>
            <div className="ml-auto text-xs text-zinc-600">1.2M nodes • 3.4M edges</div>
          </div>
          <MemoryGraph selectedMemory={selectedMemory} />
        </div>

        {/* Right Panel - Alert Stream & Actions */}
        <div className="w-[350px] border-l border-zinc-800/50 glass flex flex-col flex-shrink-0">
          <div className="h-10 border-b border-zinc-800/50 flex items-center px-3 bg-black/30">
            <AlertTriangle className="w-3.5 h-3.5 text-amber-400 mr-2" />
            <span className="text-xs font-bold text-zinc-300 uppercase tracking-wide">Alert Stream</span>
            <div className="ml-auto text-xs text-red-400 font-bold">3 CRITICAL</div>
          </div>
          <AlertStream />
        </div>
      </div>

      {/* Bottom Command Bar */}
      <CommandBar />
    </div>
  )
}
