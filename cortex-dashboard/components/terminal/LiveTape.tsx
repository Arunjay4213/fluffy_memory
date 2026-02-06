'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Brain, AlertCircle, CheckCircle, Clock, Zap, TrendingUp } from 'lucide-react'
import { Virtuoso } from 'react-virtuoso'

interface Event {
  id: string
  timestamp: Date
  type: 'query' | 'contradiction' | 'attribution' | 'health'
  severity: 'critical' | 'warning' | 'info' | 'success'
  title: string
  details: string
  memories: string[]
  shapley?: number
  latency?: number
}

const mockEvents: Event[] = [
  // Harvey AI - Legal Brief with Contradictory Precedents
  {
    id: 'harvey_1',
    timestamp: new Date(Date.now() - 2000),
    type: 'contradiction',
    severity: 'critical',
    title: 'CONTRADICTION DETECTED - Legal Precedents',
    details: 'Ross v. Jenkins (broad discovery) vs State Bar Ethics Opinion (limits discovery)',
    memories: ['mem_harvey_001', 'mem_harvey_002'],
    shapley: 0.89,
    latency: 12
  },
  {
    id: 'harvey_2',
    timestamp: new Date(Date.now() - 5000),
    type: 'query',
    severity: 'warning',
    title: '[Harvey AI] Draft motion to compel discovery',
    details: 'Attribution: 89% mem_harvey_001 (Ross v. Jenkins) - Conflicting precedent detected',
    memories: ['mem_harvey_001', 'mem_harvey_002'],
    shapley: 0.89,
    latency: 12
  },

  // Intercom - Stale Pricing Information
  {
    id: 'intercom_1',
    timestamp: new Date(Date.now() - 8000),
    type: 'query',
    severity: 'critical',
    title: '[Intercom] What does Enterprise plan include?',
    details: 'Attribution: 94% mem_intercom_001 (OLD PRICING $499) - NEW PRICING NOT RETRIEVED',
    memories: ['mem_intercom_001'],
    shapley: 0.94,
    latency: 8
  },
  {
    id: 'intercom_2',
    timestamp: new Date(Date.now() - 11000),
    type: 'contradiction',
    severity: 'critical',
    title: 'STALE DATA ALERT - Pricing Mismatch',
    details: 'Old: $499/month vs New: Tiered $199-$799 (Jan 2024 update)',
    memories: ['mem_intercom_001', 'mem_intercom_002'],
  },

  // Perplexity AI - Location Conflict
  {
    id: 'perplexity_1',
    timestamp: new Date(Date.now() - 14000),
    type: 'query',
    severity: 'warning',
    title: '[Perplexity] Best pizza places near me',
    details: 'Attribution: 87% mem_perplexity_001 (NYC) - User currently in London!',
    memories: ['mem_perplexity_001', 'mem_perplexity_002'],
    shapley: 0.87,
    latency: 9
  },

  // Replit Agent - Framework Version Conflict
  {
    id: 'replit_1',
    timestamp: new Date(Date.now() - 17000),
    type: 'query',
    severity: 'critical',
    title: '[Replit] Create React timer component',
    details: 'Attribution: 81% mem_replit_001 (class components) - Project uses React 18 hooks!',
    memories: ['mem_replit_001', 'mem_replit_002'],
    shapley: 0.81,
    latency: 11
  },
  {
    id: 'replit_2',
    timestamp: new Date(Date.now() - 20000),
    type: 'contradiction',
    severity: 'warning',
    title: 'FRAMEWORK MISMATCH',
    details: 'Historical preference (class components) vs Current project (React 18.2.0 hooks)',
    memories: ['mem_replit_001', 'mem_replit_002'],
  },

  // Personal AI - Credential Safety
  {
    id: 'personal_1',
    timestamp: new Date(Date.now() - 23000),
    type: 'query',
    severity: 'success',
    title: '[Personal AI] What\'s my WiFi password?',
    details: 'Attribution: 95% mem_personal_001 (credentials) + 91% mem_personal_002 (work context) ✅ BLOCKED',
    memories: ['mem_personal_001', 'mem_personal_002'],
    shapley: 0.95,
    latency: 4823
  },
  {
    id: 'personal_2',
    timestamp: new Date(Date.now() - 26000),
    type: 'health',
    severity: 'success',
    title: 'SAFETY INTERVENTION - Context-aware blocking',
    details: 'Prevented credential exposure during screen-sharing context',
    memories: ['mem_personal_001', 'mem_personal_002'],
  },

  // General System Events
  {
    id: 'sys_1',
    timestamp: new Date(Date.now() - 29000),
    type: 'attribution',
    severity: 'info',
    title: 'Amortized model retrained',
    details: 'LDS confidence improved: 0.87 → 0.91',
    memories: [],
  },
]

export default function LiveTape({ liveMode, onSelectMemory }: { liveMode: boolean, onSelectMemory: (id: string) => void }) {
  const [events, setEvents] = useState<Event[]>(mockEvents)
  const virtuosoRef = useRef<any>(null)

  useEffect(() => {
    if (!liveMode) return

    const interval = setInterval(() => {
      // Simulate new events
      const newEvent: Event = {
        id: Math.random().toString(),
        timestamp: new Date(),
        type: ['query', 'contradiction', 'attribution', 'health'][Math.floor(Math.random() * 4)] as any,
        severity: ['critical', 'warning', 'info', 'success'][Math.floor(Math.random() * 4)] as any,
        title: 'New query processed',
        details: 'Amortized attribution: 8ms',
        memories: ['mem_' + Math.floor(Math.random() * 100)],
        shapley: Math.random(),
        latency: Math.floor(Math.random() * 100)
      }

      setEvents(prev => [newEvent, ...prev].slice(0, 100))
      virtuosoRef.current?.scrollTo({ top: 0 })
    }, 3000)

    return () => clearInterval(interval)
  }, [liveMode])

  const getSeverityColor = (severity: Event['severity']) => {
    switch (severity) {
      case 'critical': return 'text-red-400 bg-red-500/10 border-red-500/30'
      case 'warning': return 'text-amber-400 bg-amber-500/10 border-amber-500/30'
      case 'success': return 'text-green-400 bg-green-500/10 border-green-500/30'
      default: return 'text-blue-400 bg-blue-500/10 border-blue-500/30'
    }
  }

  const getTypeIcon = (type: Event['type']) => {
    switch (type) {
      case 'query': return Brain
      case 'contradiction': return AlertCircle
      case 'attribution': return Zap
      case 'health': return TrendingUp
    }
  }

  return (
    <div className="flex-1 overflow-hidden">
      <Virtuoso
        ref={virtuosoRef}
        data={events}
        className="h-full"
        itemContent={(index, event) => {
          const Icon = getTypeIcon(event.type)
          const colorClass = getSeverityColor(event.severity)

          return (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className={`p-2 border-b border-zinc-900/50 hover:bg-zinc-900/30 cursor-pointer transition-colors ${
                index === 0 ? 'bg-blue-500/5' : ''
              }`}
              onClick={() => event.memories[0] && onSelectMemory(event.memories[0])}
            >
              <div className="flex items-start gap-2">
                <div className={`w-6 h-6 rounded flex items-center justify-center flex-shrink-0 mt-0.5 ${colorClass}`}>
                  <Icon className="w-3 h-3" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2 mb-0.5">
                    <span className="text-xs font-bold text-zinc-200 truncate">
                      {event.title}
                    </span>
                    <span className="text-[10px] text-zinc-600 flex-shrink-0">
                      {event.timestamp.toLocaleTimeString()}
                    </span>
                  </div>
                  <div className="text-[11px] text-zinc-500 mb-1 leading-tight">
                    {event.details}
                  </div>
                  <div className="flex items-center gap-2 flex-wrap">
                    {event.memories.map(mem => (
                      <span
                        key={mem}
                        className="text-[10px] px-1.5 py-0.5 rounded bg-zinc-900 text-blue-400 border border-zinc-800 font-mono"
                      >
                        {mem}
                      </span>
                    ))}
                    {event.latency && (
                      <span className="text-[10px] text-zinc-600">
                        {event.latency}ms
                      </span>
                    )}
                    {event.shapley !== undefined && (
                      <span className={`text-[10px] font-bold ${event.shapley > 0.8 ? 'text-amber-400' : 'text-zinc-500'}`}>
                        {(event.shapley * 100).toFixed(0)}%
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          )
        }}
      />
    </div>
  )
}
