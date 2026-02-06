'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Bot, Brain, Database, Zap, AlertTriangle, CheckCircle, XCircle,
  Activity, TrendingUp, Shield, Clock
} from 'lucide-react'

interface ActivityItem {
  id: string
  timestamp: Date
  type: 'agent' | 'memory' | 'query' | 'alert' | 'success' | 'error' | 'health'
  title: string
  description: string
  metadata?: Record<string, any>
}

export default function ActivityFeed() {
  const [activities, setActivities] = useState<ActivityItem[]>([])

  useEffect(() => {
    // Initialize with some activities
    const initialActivities: ActivityItem[] = [
      {
        id: '1',
        timestamp: new Date(),
        type: 'agent',
        title: 'Agent legal-001 started',
        description: 'Consulting agent initialized for case law queries'
      },
      {
        id: '2',
        timestamp: new Date(Date.now() - 5000),
        type: 'memory',
        title: 'Memory mem_legal_042 updated',
        description: 'Case precedent indexed with 0.94 confidence'
      },
      {
        id: '3',
        timestamp: new Date(Date.now() - 12000),
        type: 'success',
        title: 'Health check passed',
        description: 'All systems operational, 0 contradictions detected'
      },
      {
        id: '4',
        timestamp: new Date(Date.now() - 18000),
        type: 'alert',
        title: 'High memory usage detected',
        description: 'Hot tier at 87% capacity, consider scaling'
      },
      {
        id: '5',
        timestamp: new Date(Date.now() - 25000),
        type: 'query',
        title: 'Attribution query completed',
        description: 'Shapley values computed for 1,247 memories in 8.2ms'
      },
    ]

    setActivities(initialActivities)

    // Simulate real-time updates
    const interval = setInterval(() => {
      const newActivity: ActivityItem = {
        id: Math.random().toString(36).substr(2, 9),
        timestamp: new Date(),
        type: ['agent', 'memory', 'query', 'alert', 'success', 'health'][
          Math.floor(Math.random() * 6)
        ] as any,
        title: [
          'Agent finance-012 processing request',
          'Memory vector updated',
          'Attribution analysis completed',
          'Contradiction detected in mem_legal_089',
          'Backup completed successfully',
          'Health metrics updated'
        ][Math.floor(Math.random() * 6)],
        description: [
          'Processing financial data analysis',
          'Updated with latest context',
          'Computed in 6.3ms',
          'Requires manual review',
          'All data secured',
          'P95 latency: 7.8ms'
        ][Math.floor(Math.random() * 6)]
      }

      setActivities(prev => [newActivity, ...prev].slice(0, 50))
    }, 3000 + Math.random() * 2000)

    return () => clearInterval(interval)
  }, [])

  const getIcon = (type: ActivityItem['type']) => {
    switch (type) {
      case 'agent': return Bot
      case 'memory': return Database
      case 'query': return Brain
      case 'alert': return AlertTriangle
      case 'success': return CheckCircle
      case 'error': return XCircle
      case 'health': return Activity
      default: return Clock
    }
  }

  const getColor = (type: ActivityItem['type']) => {
    switch (type) {
      case 'agent': return 'text-blue-400 bg-blue-500/10 border-blue-500/30'
      case 'memory': return 'text-purple-400 bg-purple-500/10 border-purple-500/30'
      case 'query': return 'text-cyan-400 bg-cyan-500/10 border-cyan-500/30'
      case 'alert': return 'text-amber-400 bg-amber-500/10 border-amber-500/30'
      case 'success': return 'text-green-400 bg-green-500/10 border-green-500/30'
      case 'error': return 'text-red-400 bg-red-500/10 border-red-500/30'
      case 'health': return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30'
      default: return 'text-zinc-400 bg-zinc-500/10 border-zinc-500/30'
    }
  }

  const formatTime = (date: Date) => {
    const now = new Date()
    const diff = now.getTime() - date.getTime()

    if (diff < 60000) return 'Just now'
    if (diff < 3600000) return `${Math.floor(diff / 60000)}m ago`
    if (diff < 86400000) return `${Math.floor(diff / 3600000)}h ago`
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between px-3 py-2 border-b border-zinc-800/50 bg-black/30">
        <div className="flex items-center gap-2">
          <Activity className="w-3.5 h-3.5 text-green-400" />
          <span className="text-xs font-mono font-bold text-zinc-300 uppercase tracking-wide">
            Activity Stream
          </span>
          <motion.div
            className="w-1.5 h-1.5 bg-green-500 rounded-full"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [1, 0.6, 1]
            }}
            transition={{
              duration: 2,
              repeat: Infinity
            }}
          />
        </div>
        <span className="text-[10px] font-mono text-zinc-600">
          {activities.length} events
        </span>
      </div>

      {/* Activity list */}
      <div className="flex-1 overflow-y-auto">
        <AnimatePresence initial={false}>
          {activities.map((activity) => {
            const Icon = getIcon(activity.type)
            const colorClass = getColor(activity.type)

            return (
              <motion.div
                key={activity.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="border-b border-zinc-900/50 p-3 hover:bg-zinc-900/30 transition-colors group cursor-pointer"
              >
                <div className="flex items-start gap-3">
                  <div className={`p-2 rounded-lg border ${colorClass} flex-shrink-0`}>
                    <Icon className="w-3.5 h-3.5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <span className="text-xs font-medium text-zinc-200 group-hover:text-white transition-colors">
                        {activity.title}
                      </span>
                      <span className="text-[10px] font-mono text-zinc-600 whitespace-nowrap">
                        {formatTime(activity.timestamp)}
                      </span>
                    </div>
                    <p className="text-[11px] text-zinc-500 font-mono leading-relaxed">
                      {activity.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </AnimatePresence>
      </div>
    </div>
  )
}
