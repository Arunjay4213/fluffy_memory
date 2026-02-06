'use client'

import { useState } from 'react'
import { Terminal, ChevronRight } from 'lucide-react'
import { motion } from 'framer-motion'

export default function CommandBar() {
  const [command, setCommand] = useState('')
  const [history, setHistory] = useState<string[]>([])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!command.trim()) return

    setHistory(prev => [...prev, command])
    // Process command here
    setCommand('')
  }

  const suggestions = [
    'search mem:peanut',
    'delete mem_005',
    'merge mem_old_001 mem_new_001',
    'boost criticality mem_001',
    'vaccinate "cited non-existent mem"',
    'retrain attribution',
  ]

  return (
    <div className="h-12 border-t border-zinc-800/50 glass-strong flex items-center px-4 gap-3 flex-shrink-0">
      <Terminal className="w-4 h-4 text-blue-400" />
      <ChevronRight className="w-3 h-3 text-zinc-600" />

      <form onSubmit={handleSubmit} className="flex-1 flex items-center gap-2">
        <input
          type="text"
          value={command}
          onChange={(e) => setCommand(e.target.value)}
          placeholder="Enter command... (e.g., search mem:peanut, delete mem_005, merge, vaccinate)"
          className="flex-1 bg-transparent text-sm text-zinc-200 placeholder:text-zinc-700 outline-none font-mono"
        />
      </form>

      <div className="flex items-center gap-2">
        <span className="text-[10px] text-zinc-600 uppercase tracking-wide">Quick:</span>
        {suggestions.slice(0, 3).map((sug, i) => (
          <button
            key={i}
            onClick={() => setCommand(sug)}
            className="text-[10px] px-2 py-1 rounded bg-zinc-900 hover:bg-zinc-800 text-zinc-500 hover:text-zinc-300 border border-zinc-800 transition-colors font-mono"
          >
            {sug.split(' ')[0]}
          </button>
        ))}
      </div>

      <div className="flex items-center gap-1.5 text-[10px] text-zinc-600">
        <kbd className="px-1.5 py-0.5 rounded bg-zinc-900 border border-zinc-800 font-mono">⌘</kbd>
        <span>+</span>
        <kbd className="px-1.5 py-0.5 rounded bg-zinc-900 border border-zinc-800 font-mono">K</kbd>
      </div>
    </div>
  )
}
