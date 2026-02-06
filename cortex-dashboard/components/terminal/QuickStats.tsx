'use client'

import { motion } from 'framer-motion'
import { TrendingUp, TrendingDown } from 'lucide-react'

export default function QuickStats() {
  const stats = [
    { label: 'MEM', value: '1.2M', change: '+2.3%', positive: true },
    { label: 'HOT', value: '45K', change: '+1.1%', positive: true },
    { label: 'LAT', value: '8ms', change: '-12%', positive: true },
    { label: 'LDS', value: '0.89', change: '+0.04', positive: true },
    { label: 'QUAL', value: '94%', change: '-6%', positive: false },
  ]

  return (
    <div className="flex items-center gap-3">
      {stats.map((stat, i) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.05 }}
          className="glass px-2.5 py-1.5 rounded border border-zinc-800/50 hover:border-zinc-700 transition-colors cursor-pointer"
        >
          <div className="flex items-center gap-2">
            <div>
              <div className="text-[9px] text-zinc-600 font-bold uppercase tracking-wide">{stat.label}</div>
              <div className="text-sm font-bold text-zinc-200 leading-none mt-0.5">{stat.value}</div>
            </div>
            <div className={`flex items-center gap-0.5 text-[10px] font-mono ${stat.positive ? 'text-green-400' : 'text-red-400'}`}>
              {stat.positive ? <TrendingUp className="w-2.5 h-2.5" /> : <TrendingDown className="w-2.5 h-2.5" />}
              {stat.change}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  )
}
