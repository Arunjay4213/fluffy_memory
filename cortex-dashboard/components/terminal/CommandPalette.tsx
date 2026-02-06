'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Command, TrendingUp, Database, Bot, Zap, Brain, Shield, Activity, Home, Sparkles } from 'lucide-react'
import { useRouter } from 'next/navigation'

interface CommandItem {
  id: string
  title: string
  description: string
  category: string
  icon: any
  action: () => void
  shortcut?: string
}

interface CommandPaletteProps {
  isOpen: boolean
  onClose: () => void
}

export default function CommandPalette({ isOpen, onClose }: CommandPaletteProps) {
  const [search, setSearch] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  const commands: CommandItem[] = [
    {
      id: 'home',
      title: 'Go to Dashboard',
      description: 'Main Bloomberg-style terminal',
      category: 'Navigation',
      icon: Home,
      action: () => router.push('/'),
      shortcut: '⌘H'
    },
    {
      id: 'overview',
      title: 'Overview',
      description: 'Visual overview with engine dashboards',
      category: 'Navigation',
      icon: Sparkles,
      action: () => router.push('/overview'),
      shortcut: '⌘O'
    },
    {
      id: 'agents-live',
      title: 'Agent Fleet Management',
      description: 'Real-time monitoring of all 847 active agents',
      category: 'Navigation',
      icon: Bot,
      action: () => router.push('/agents'),
      shortcut: '⌘A'
    },
    {
      id: 'memory-search',
      title: 'Memory Store',
      description: 'Browse and search 1.24M+ memory vectors',
      category: 'Navigation',
      icon: Database,
      action: () => router.push('/memory'),
      shortcut: '⌘M'
    },
    {
      id: 'attribution',
      title: 'Attribution Engine',
      description: 'Amortized Shapley value computation',
      category: 'Navigation',
      icon: Brain,
      action: () => router.push('/attribution'),
      shortcut: '⌘R'
    },
    {
      id: 'health-check',
      title: 'Health Monitor',
      description: 'Scan for contradictions and anomalies',
      category: 'Navigation',
      icon: Activity,
      action: () => router.push('/health'),
      shortcut: '⌘S'
    },
    {
      id: 'compliance',
      title: 'Compliance Dashboard',
      description: 'GDPR deletion requests and provenance tracking',
      category: 'Navigation',
      icon: Shield,
      action: () => router.push('/compliance'),
      shortcut: '⌘C'
    },
    {
      id: 'terminal-view',
      title: 'Terminal View',
      description: 'Original agent fleet manager',
      category: 'Navigation',
      icon: Bot,
      action: () => router.push('/terminal'),
      shortcut: '⌘T'
    },
    {
      id: 'analytics',
      title: 'Analytics',
      description: 'Performance analytics dashboard',
      category: 'Navigation',
      icon: TrendingUp,
      action: () => router.push('/analytics'),
      shortcut: '⌘P'
    },
  ]

  const filteredCommands = commands.filter(cmd =>
    cmd.title.toLowerCase().includes(search.toLowerCase()) ||
    cmd.description.toLowerCase().includes(search.toLowerCase()) ||
    cmd.category.toLowerCase().includes(search.toLowerCase())
  )

  const categories = Array.from(new Set(filteredCommands.map(c => c.category)))

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus()
    }
  }, [isOpen])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onClose])

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[9999] flex items-start justify-center pt-[15vh] px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        {/* Backdrop */}
        <div className="absolute inset-0 bg-black/80 backdrop-blur-md" />

        {/* Command Palette */}
        <motion.div
          className="relative w-full max-w-2xl bg-zinc-900/95 border border-zinc-700/50 rounded-2xl shadow-2xl overflow-hidden"
          initial={{ opacity: 0, scale: 0.95, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Glow effect */}
          <div className="absolute -inset-[2px] bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-20 blur-xl" />

          {/* Search bar */}
          <div className="relative border-b border-zinc-800/50 p-4">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 px-2 py-1 rounded-lg bg-zinc-800/50 border border-zinc-700/50">
                <Command className="w-4 h-4 text-zinc-500" />
                <span className="text-xs font-mono text-zinc-500">⌘K</span>
              </div>
              <Search className="w-5 h-5 text-zinc-500" />
              <input
                ref={inputRef}
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search commands, agents, memories..."
                className="flex-1 bg-transparent text-zinc-200 placeholder:text-zinc-600 text-lg outline-none font-mono"
              />
            </div>
          </div>

          {/* Commands list */}
          <div className="relative max-h-[60vh] overflow-y-auto">
            {categories.map((category) => (
              <div key={category}>
                <div className="px-4 py-2 bg-zinc-900/50">
                  <span className="text-xs font-mono font-bold text-zinc-600 uppercase tracking-wider">
                    {category}
                  </span>
                </div>
                {filteredCommands
                  .filter((cmd) => cmd.category === category)
                  .map((cmd) => {
                    const Icon = cmd.icon
                    return (
                      <motion.button
                        key={cmd.id}
                        className="w-full px-4 py-3 flex items-center gap-4 hover:bg-zinc-800/50 transition-colors group"
                        whileHover={{ x: 4 }}
                        onClick={() => {
                          cmd.action()
                          onClose()
                        }}
                      >
                        <div className="w-10 h-10 rounded-lg bg-zinc-800 group-hover:bg-zinc-700 border border-zinc-700 group-hover:border-zinc-600 flex items-center justify-center transition-colors">
                          <Icon className="w-5 h-5 text-zinc-400 group-hover:text-blue-400 transition-colors" />
                        </div>
                        <div className="flex-1 text-left">
                          <div className="text-sm font-medium text-zinc-200 group-hover:text-white transition-colors">
                            {cmd.title}
                          </div>
                          <div className="text-xs text-zinc-500 font-mono mt-0.5">
                            {cmd.description}
                          </div>
                        </div>
                        {cmd.shortcut && (
                          <div className="flex items-center gap-1 px-2 py-1 rounded bg-zinc-800 border border-zinc-700 group-hover:border-zinc-600 transition-colors">
                            <span className="text-xs font-mono text-zinc-500">
                              {cmd.shortcut}
                            </span>
                          </div>
                        )}
                      </motion.button>
                    )
                  })}
              </div>
            ))}

            {filteredCommands.length === 0 && (
              <div className="px-4 py-12 text-center">
                <p className="text-zinc-500 text-sm font-mono">No commands found</p>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="relative border-t border-zinc-800/50 px-4 py-3 bg-zinc-900/50">
            <div className="flex items-center justify-between text-xs font-mono text-zinc-600">
              <div className="flex items-center gap-4">
                <span>↑↓ Navigate</span>
                <span>↵ Select</span>
                <span>ESC Close</span>
              </div>
              <span>{filteredCommands.length} commands</span>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
