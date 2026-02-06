'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { TrendingUp, TrendingDown, AlertCircle, CheckCircle, Activity } from 'lucide-react'

interface TickerItem {
  id: string
  label: string
  value: string
  change: number
  status: 'up' | 'down' | 'alert' | 'success' | 'neutral'
  unit?: string
}

export default function MarketTicker() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [items, setItems] = useState<TickerItem[]>([
    {
      id: 'agents',
      label: 'AGENTS',
      value: '847',
      change: 2.3,
      status: 'up',
      unit: 'active'
    },
    {
      id: 'memory',
      label: 'MEMORY',
      value: '1.24M',
      change: 12.5,
      status: 'up',
      unit: 'vectors'
    },
    {
      id: 'latency',
      label: 'P95 LAT',
      value: '8.2',
      change: -15.3,
      status: 'up',
      unit: 'ms'
    },
    {
      id: 'quality',
      label: 'QUALITY',
      value: '94.7',
      change: 1.2,
      status: 'up',
      unit: '%'
    },
    {
      id: 'contradictions',
      label: 'CONFLICTS',
      value: '23',
      change: -45.2,
      status: 'up',
      unit: 'detected'
    },
    {
      id: 'hot-tier',
      label: 'HOT TIER',
      value: '45.2K',
      change: 5.8,
      status: 'neutral',
      unit: 'cached'
    },
    {
      id: 'queries',
      label: 'QUERIES',
      value: '12.4K',
      change: 18.7,
      status: 'up',
      unit: '/min'
    },
    {
      id: 'cost',
      label: 'COST',
      value: '$0.042',
      change: -8.3,
      status: 'up',
      unit: '/req'
    },
  ])

  useEffect(() => {
    const interval = setInterval(() => {
      setItems(prev => prev.map(item => ({
        ...item,
        change: item.change + (Math.random() - 0.5) * 2
      })))
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="h-10 bg-black/90 border-b border-zinc-800/50 overflow-hidden">
      <div className="h-full flex items-center">
        {/* Live indicator */}
        <div className="flex-shrink-0 px-4 border-r border-zinc-800/50 flex items-center gap-2">
          <motion.div
            className="w-2 h-2 bg-red-500 rounded-full"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [1, 0.6, 1]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
          />
          <span className="text-[10px] font-mono font-bold text-red-500 uppercase tracking-wider">
            LIVE
          </span>
        </div>

        {/* Scrolling ticker */}
        <div className="flex-1 relative overflow-hidden">
          <motion.div
            className="flex items-center gap-6 absolute"
            animate={{
              x: [0, -2000]
            }}
            transition={{
              duration: 40,
              repeat: Infinity,
              ease: 'linear'
            }}
          >
            {[...items, ...items].map((item, index) => {
              const isPositive = item.change > 0
              const Icon = item.status === 'alert' ? AlertCircle :
                          item.status === 'success' ? CheckCircle :
                          isPositive ? TrendingUp : TrendingDown

              return (
                <div
                  key={`${item.id}-${index}`}
                  className="flex items-center gap-2 px-4 border-r border-zinc-800/50"
                >
                  <span className="text-[9px] font-mono font-bold text-zinc-600 uppercase tracking-wider">
                    {item.label}
                  </span>
                  <span className="text-sm font-mono font-bold text-zinc-200">
                    {item.value}
                  </span>
                  {item.unit && (
                    <span className="text-[9px] font-mono text-zinc-600">
                      {item.unit}
                    </span>
                  )}
                  <div className={`flex items-center gap-1 ${
                    isPositive ? 'text-green-500' : 'text-red-500'
                  }`}>
                    <Icon className="w-3 h-3" />
                    <span className="text-[10px] font-mono font-bold">
                      {Math.abs(item.change).toFixed(1)}%
                    </span>
                  </div>
                </div>
              )
            })}
          </motion.div>
        </div>

        {/* Time */}
        <div className="flex-shrink-0 px-4 border-l border-zinc-800/50">
          <span className="text-[10px] font-mono text-zinc-600">
            {new Date().toLocaleTimeString('en-US', {
              hour12: false,
              hour: '2-digit',
              minute: '2-digit',
              second: '2-digit'
            })}
          </span>
        </div>
      </div>
    </div>
  )
}
