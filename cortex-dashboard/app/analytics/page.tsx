'use client'

import { useState } from 'react'
import { Terminal, Activity, TrendingUp, Zap, Brain, Shield, DollarSign, Network } from 'lucide-react'
import Link from 'next/link'
import MemoryGraph from '@/components/analytics/MemoryGraph'
import PerformanceDashboard from '@/components/analytics/PerformanceDashboard'
import AnomalyDetection from '@/components/analytics/AnomalyDetection'
import CostOptimization from '@/components/analytics/CostOptimization'
import QueryReplayDebugger from '@/components/analytics/QueryReplayDebugger'
import ABTesting from '@/components/analytics/ABTesting'
import CustomerImpactHeatmap from '@/components/analytics/CustomerImpactHeatmap'
import AutoFixSuggestions from '@/components/analytics/AutoFixSuggestions'
import ComplianceTracker from '@/components/analytics/ComplianceTracker'
import EmbeddingVisualizer from '@/components/analytics/EmbeddingVisualizer'

type ViewMode = 'overview' | 'graph' | 'performance' | 'anomalies' | 'cost' | 'debugger' | 'testing' | 'compliance'

export default function AnalyticsDashboard() {
  const [viewMode, setViewMode] = useState<ViewMode>('overview')

  return (
    <div className="h-screen bg-[#0a0a0f] flex flex-col overflow-hidden font-mono text-sm">
      {/* Top Bar */}
      <div className="h-14 border-b border-zinc-800/50 glass-strong flex items-center px-4 gap-4 flex-shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded bg-gradient-to-br from-purple-500 to-blue-600 flex items-center justify-center">
            <Activity className="w-4 h-4 text-white" />
          </div>
          <div>
            <span className="text-sm font-bold text-zinc-200">CortexOS Analytics</span>
            <div className="text-[10px] text-zinc-500 uppercase tracking-wider">Advanced Intelligence</div>
          </div>
        </div>

        <div className="ml-4 px-2.5 py-1 rounded-md bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-500/30">
          <span className="text-[10px] font-bold text-purple-400 uppercase tracking-wider">Live • 8 Agents Monitored</span>
        </div>

        <div className="flex-1" />

        {/* Quick stats */}
        <div className="flex items-center gap-3">
          <div className="glass px-2.5 py-1.5 rounded border border-zinc-800/50">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-3 h-3 text-green-400" />
              <div>
                <div className="text-[9px] text-zinc-600 font-bold uppercase tracking-wide">Accuracy</div>
                <div className="text-sm font-bold text-green-400 leading-none mt-0.5">94.2%</div>
              </div>
            </div>
          </div>

          <div className="glass px-2.5 py-1.5 rounded border border-zinc-800/50">
            <div className="flex items-center gap-2">
              <Zap className="w-3 h-3 text-amber-400" />
              <div>
                <div className="text-[9px] text-zinc-600 font-bold uppercase tracking-wide">AVG LATENCY</div>
                <div className="text-sm font-bold text-amber-400 leading-none mt-0.5">11ms</div>
              </div>
            </div>
          </div>

          <div className="glass px-2.5 py-1.5 rounded border border-zinc-800/50">
            <div className="flex items-center gap-2">
              <DollarSign className="w-3 h-3 text-blue-400" />
              <div>
                <div className="text-[9px] text-zinc-600 font-bold uppercase tracking-wide">COST/1K</div>
                <div className="text-sm font-bold text-blue-400 leading-none mt-0.5">$0.23</div>
              </div>
            </div>
          </div>
        </div>

        <Link href="/">
          <button className="px-3 py-1.5 rounded text-xs bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-zinc-200 border border-zinc-800 transition-colors">
            Agent Fleet
          </button>
        </Link>
      </div>

      {/* View Mode Tabs */}
      <div className="h-12 border-b border-zinc-800/50 glass flex items-center px-4 gap-2 flex-shrink-0 overflow-x-auto">
        <button
          onClick={() => setViewMode('overview')}
          className={`flex items-center gap-2 px-3 py-1.5 rounded text-xs font-medium transition-all duration-200 ${
            viewMode === 'overview'
              ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30 shadow-sm'
              : 'text-zinc-500 hover:text-zinc-300 hover:bg-zinc-900'
          }`}
        >
          <Activity className="w-3.5 h-3.5" />
          Overview
        </button>

        <button
          onClick={() => setViewMode('graph')}
          className={`flex items-center gap-2 px-3 py-1.5 rounded text-xs font-medium transition-all duration-200 ${
            viewMode === 'graph'
              ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30 shadow-sm'
              : 'text-zinc-500 hover:text-zinc-300 hover:bg-zinc-900'
          }`}
        >
          <Network className="w-3.5 h-3.5" />
          Memory Graph
        </button>

        <button
          onClick={() => setViewMode('performance')}
          className={`flex items-center gap-2 px-3 py-1.5 rounded text-xs font-medium transition-all duration-200 ${
            viewMode === 'performance'
              ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30 shadow-sm'
              : 'text-zinc-500 hover:text-zinc-300 hover:bg-zinc-900'
          }`}
        >
          <TrendingUp className="w-3.5 h-3.5" />
          Performance
        </button>

        <button
          onClick={() => setViewMode('anomalies')}
          className={`flex items-center gap-2 px-3 py-1.5 rounded text-xs font-medium transition-all duration-200 ${
            viewMode === 'anomalies'
              ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30 shadow-sm'
              : 'text-zinc-500 hover:text-zinc-300 hover:bg-zinc-900'
          }`}
        >
          <Brain className="w-3.5 h-3.5" />
          Anomaly Detection
        </button>

        <button
          onClick={() => setViewMode('cost')}
          className={`flex items-center gap-2 px-3 py-1.5 rounded text-xs font-medium transition-all duration-200 ${
            viewMode === 'cost'
              ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30 shadow-sm'
              : 'text-zinc-500 hover:text-zinc-300 hover:bg-zinc-900'
          }`}
        >
          <DollarSign className="w-3.5 h-3.5" />
          Cost Analysis
        </button>

        <button
          onClick={() => setViewMode('debugger')}
          className={`flex items-center gap-2 px-3 py-1.5 rounded text-xs font-medium transition-all duration-200 ${
            viewMode === 'debugger'
              ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30 shadow-sm'
              : 'text-zinc-500 hover:text-zinc-300 hover:bg-zinc-900'
          }`}
        >
          <Terminal className="w-3.5 h-3.5" />
          Query Debugger
        </button>

        <button
          onClick={() => setViewMode('testing')}
          className={`flex items-center gap-2 px-3 py-1.5 rounded text-xs font-medium transition-all duration-200 ${
            viewMode === 'testing'
              ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30 shadow-sm'
              : 'text-zinc-500 hover:text-zinc-300 hover:bg-zinc-900'
          }`}
        >
          <Zap className="w-3.5 h-3.5" />
          A/B Testing
        </button>

        <button
          onClick={() => setViewMode('compliance')}
          className={`flex items-center gap-2 px-3 py-1.5 rounded text-xs font-medium transition-all duration-200 ${
            viewMode === 'compliance'
              ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30 shadow-sm'
              : 'text-zinc-500 hover:text-zinc-300 hover:bg-zinc-900'
          }`}
        >
          <Shield className="w-3.5 h-3.5" />
          Compliance
        </button>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-hidden">
        {viewMode === 'overview' && (
          <div className="h-full grid grid-cols-2 grid-rows-2 gap-3 p-3">
            <div className="border border-zinc-800/50 rounded-lg glass overflow-hidden">
              <MemoryGraph />
            </div>
            <div className="border border-zinc-800/50 rounded-lg glass overflow-hidden">
              <PerformanceDashboard />
            </div>
            <div className="border border-zinc-800/50 rounded-lg glass overflow-hidden">
              <AnomalyDetection />
            </div>
            <div className="border border-zinc-800/50 rounded-lg glass overflow-hidden">
              <AutoFixSuggestions />
            </div>
          </div>
        )}

        {viewMode === 'graph' && <MemoryGraph />}
        {viewMode === 'performance' && <PerformanceDashboard />}
        {viewMode === 'anomalies' && (
          <div className="h-full grid grid-cols-2 gap-3 p-3">
            <div className="border border-zinc-800/50 rounded-lg glass overflow-hidden">
              <AnomalyDetection />
            </div>
            <div className="border border-zinc-800/50 rounded-lg glass overflow-hidden">
              <AutoFixSuggestions />
            </div>
          </div>
        )}
        {viewMode === 'cost' && <CostOptimization />}
        {viewMode === 'debugger' && <QueryReplayDebugger />}
        {viewMode === 'testing' && <ABTesting />}
        {viewMode === 'compliance' && (
          <div className="h-full grid grid-cols-2 gap-3 p-3">
            <div className="border border-zinc-800/50 rounded-lg glass overflow-hidden">
              <ComplianceTracker />
            </div>
            <div className="border border-zinc-800/50 rounded-lg glass overflow-hidden">
              <CustomerImpactHeatmap />
            </div>
          </div>
        )}
      </div>

      {/* Bottom Status Bar */}
      <div className="h-10 border-t border-zinc-800/50 glass-strong flex items-center px-4 gap-4 flex-shrink-0 text-[10px] text-zinc-600">
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          <span>Live</span>
        </div>
        <div>Last Update: {new Date().toLocaleTimeString()}</div>
        <div>•</div>
        <div>34,892 memories indexed</div>
        <div>•</div>
        <div>1,247 queries/min</div>
        <div className="flex-1" />
        <div>CortexOS v2.1.0</div>
      </div>
    </div>
  )
}
