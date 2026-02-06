'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Activity, Brain, Database, Shield, TrendingUp, AlertTriangle, Clock, Zap, Terminal } from 'lucide-react'
import AttributionEngine from '@/components/AttributionEngine'
import HealthMonitor from '@/components/HealthMonitor'
import MemoryLifecycle from '@/components/MemoryLifecycle'
import ComplianceAudit from '@/components/ComplianceAudit'
import ParticleBackground from '@/components/ParticleBackground'
import BrainNetwork from '@/components/custom-graphics/BrainNetwork'
import HealthPulse from '@/components/custom-graphics/HealthPulse'
import MemoryTiers from '@/components/custom-graphics/MemoryTiers'
import ShieldLock from '@/components/custom-graphics/ShieldLock'
import { mockAttributions, mockHealthMetrics, mockMemories, mockContradictions, mockDeletionRequests } from '@/lib/mock-data'

type Tab = 'attribution' | 'health' | 'lifecycle' | 'compliance'

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState<Tab>('attribution')

  const tabs = [
    {
      id: 'attribution' as Tab,
      name: 'Engine 1: Attribution',
      icon: Brain,
      customGraphic: BrainNetwork,
      color: 'text-blue-500',
      bgColor: 'bg-blue-500/10',
      borderColor: 'border-blue-500',
      glowColor: 'glow-blue',
      description: 'Amortized Shapley Attribution'
    },
    {
      id: 'health' as Tab,
      name: 'Engine 2: Health Monitor',
      icon: Activity,
      customGraphic: HealthPulse,
      color: 'text-green-500',
      bgColor: 'bg-green-500/10',
      borderColor: 'border-green-500',
      glowColor: 'glow-green',
      description: 'Contradiction Detection & Quality Metrics'
    },
    {
      id: 'lifecycle' as Tab,
      name: 'Engine 3: Memory Lifecycle',
      icon: Database,
      customGraphic: MemoryTiers,
      color: 'text-amber-500',
      bgColor: 'bg-amber-500/10',
      borderColor: 'border-amber-500',
      glowColor: 'glow-amber',
      description: 'Tiered Storage with Criticality Guards'
    },
    {
      id: 'compliance' as Tab,
      name: 'Engine 4: Compliance',
      icon: Shield,
      customGraphic: ShieldLock,
      color: 'text-purple-500',
      bgColor: 'bg-purple-500/10',
      borderColor: 'border-purple-500',
      glowColor: 'glow-purple',
      description: 'GDPR & Provenance Tracking'
    }
  ]

  const stats = [
    { label: 'Total Memories', value: '1.2M', icon: Database, change: '+12%', color: 'text-blue-500' },
    { label: 'Hot Tier', value: '45K', icon: Zap, change: '+5%', color: 'text-red-500' },
    { label: 'Avg Attribution Time', value: '8ms', icon: Clock, change: '-23%', color: 'text-green-500' },
    { label: 'Memory Quality', value: '94%', icon: TrendingUp, change: '+2%', color: 'text-green-500' },
  ]

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <ParticleBackground />
      <div className="grid-background absolute inset-0" />

      {/* Header */}
      <header className="border-b border-zinc-800/50 glass-strong sticky top-0 z-50 relative">
        <motion.div
          className="container mx-auto px-6 py-6"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <motion.div
                className="relative"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 blur-2xl opacity-50 rounded-full"></div>
                <div className="relative w-14 h-14 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-2xl flex items-center justify-center neon-border-blue">
                  <Brain className="w-8 h-8 text-white drop-shadow-lg" />
                </div>
              </motion.div>
              <div>
                <h1 className="text-3xl font-bold tracking-tight mb-1">
                  <span className="gradient-text text-4xl">
                    CortexOS
                  </span>
                </h1>
                <p className="text-sm text-zinc-400 font-mono">Memory Observability Layer • Production Ready</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Link href="/terminal">
                <motion.button
                  className="flex items-center gap-2 px-4 py-2 rounded-xl glass border border-purple-500/30 hover:border-purple-500/50 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Terminal className="w-4 h-4 text-purple-400" />
                  <span className="text-sm font-bold font-mono text-purple-400">TERMINAL MODE</span>
                </motion.button>
              </Link>
              <motion.div
                className="flex items-center gap-2 px-4 py-2 rounded-xl glass border border-green-500/30"
                animate={{
                  borderColor: ['rgba(16, 185, 129, 0.3)', 'rgba(16, 185, 129, 0.6)', 'rgba(16, 185, 129, 0.3)'],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <motion.div
                  className="w-2.5 h-2.5 bg-green-500 rounded-full"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [1, 0.7, 1],
                  }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
                <span className="text-sm font-bold font-mono text-green-400">LIVE</span>
              </motion.div>
              <div className="glass px-4 py-2 rounded-xl border border-zinc-700/50">
                <span className="text-sm font-mono text-zinc-400">
                  Mode: <span className="text-blue-400 font-bold">Async</span>
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </header>

      {/* Stats Bar */}
      <div className="border-b border-zinc-800/50 glass relative">
        <div className="container mx-auto px-6 py-6">
          <div className="grid grid-cols-4 gap-6">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                className="glass-strong rounded-2xl p-6 border border-zinc-800/50 hover:border-zinc-700 transition-all group card-3d relative overflow-hidden"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ y: -4, scale: 1.02 }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative flex items-start justify-between">
                  <div>
                    <p className="text-xs text-zinc-500 font-mono mb-2 uppercase tracking-wide">{stat.label}</p>
                    <motion.p
                      className="text-3xl font-bold tracking-tight mb-1"
                      initial={{ scale: 0.8 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.4, delay: i * 0.1 + 0.2 }}
                    >
                      {stat.value}
                    </motion.p>
                    <p className={`text-sm font-mono font-bold ${stat.color}`}>{stat.change}</p>
                  </div>
                  <div className={`p-3 rounded-xl bg-gradient-to-br ${stat.color.replace('text-', 'from-')}/10 to-transparent group-hover:scale-110 transition-transform`}>
                    <stat.icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-zinc-800/50 glass-strong relative">
        <div className="container mx-auto px-6">
          <div className="flex gap-2 overflow-x-auto py-4">
            {tabs.map((tab, index) => {
              const Icon = tab.icon
              const CustomGraphic = tab.customGraphic
              const isActive = activeTab === tab.id
              return (
                <motion.button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`relative flex items-center gap-4 px-6 py-4 rounded-2xl transition-all whitespace-nowrap group ${
                    isActive
                      ? `${tab.bgColor} ${tab.color} ${tab.glowColor} border ${tab.borderColor}`
                      : 'text-zinc-500 hover:text-zinc-300 hover:bg-zinc-900/30 border border-transparent hover:border-zinc-800'
                  }`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${isActive ? 'scale-110' : 'scale-100'} transition-transform`}>
                    {isActive ? (
                      <div className="scale-[0.4] -mt-1">
                        <CustomGraphic />
                      </div>
                    ) : (
                      <Icon className="w-6 h-6" />
                    )}
                  </div>
                  <div className="text-left">
                    <div className="font-bold text-base mb-0.5">{tab.name}</div>
                    <div className="text-xs opacity-70 font-mono">{tab.description}</div>
                  </div>
                  {isActive && (
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"
                      initial={{ x: '-100%' }}
                      animate={{ x: '100%' }}
                      transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                    />
                  )}
                </motion.button>
              )
            })}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8 relative">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4 }}
        >
          {activeTab === 'attribution' && (
            <AttributionEngine attributions={mockAttributions} />
          )}
          {activeTab === 'health' && (
            <HealthMonitor
              metrics={mockHealthMetrics}
              contradictions={mockContradictions}
            />
          )}
          {activeTab === 'lifecycle' && (
            <MemoryLifecycle memories={mockMemories} />
          )}
          {activeTab === 'compliance' && (
            <ComplianceAudit
              deletionRequests={mockDeletionRequests}
              memories={mockMemories}
            />
          )}
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-800/50 glass-strong mt-auto relative">
        <div className="container mx-auto px-6 py-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                <Brain className="w-4 h-4 text-white" />
              </div>
              <div className="text-sm font-mono">
                <span className="text-zinc-500">CortexOS</span>
                <span className="text-zinc-700 mx-2">•</span>
                <span className="text-zinc-600">v1.0.0</span>
                <span className="text-zinc-700 mx-2">•</span>
                <span className="text-zinc-600">Memory Infrastructure for LLM Agents</span>
              </div>
            </div>
            <div className="flex items-center gap-6">
              <motion.div
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg glass border border-green-500/20"
                animate={{
                  borderColor: ['rgba(16, 185, 129, 0.2)', 'rgba(16, 185, 129, 0.4)', 'rgba(16, 185, 129, 0.2)'],
                }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <span className="text-xs font-mono text-zinc-500">LDS Confidence</span>
                <span className="text-sm font-mono font-bold text-green-400">0.89</span>
              </motion.div>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg glass border border-blue-500/20">
                <span className="text-xs font-mono text-zinc-500">Latency</span>
                <span className="text-sm font-mono font-bold text-blue-400">8ms</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg glass border border-green-500/20">
                <span className="text-xs font-mono text-zinc-500">Uptime</span>
                <span className="text-sm font-mono font-bold text-green-400">99.9%</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
