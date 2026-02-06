'use client'

import { useState, useMemo } from 'react'
import { Virtuoso } from 'react-virtuoso'
import { ArrowUpDown, ArrowUp, ArrowDown, Filter, Download } from 'lucide-react'
import { motion } from 'framer-motion'

interface Column {
  key: string
  label: string
  width?: string
  sortable?: boolean
  render?: (value: any, row: any) => React.ReactNode
}

interface DataGridProps {
  data: any[]
  columns: Column[]
  height?: string
  onRowClick?: (row: any) => void
}

export default function DataGrid({ data, columns, height = '600px', onRowClick }: DataGridProps) {
  const [sortKey, setSortKey] = useState<string | null>(null)
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc')
  const [selectedRow, setSelectedRow] = useState<number | null>(null)

  const sortedData = useMemo(() => {
    if (!sortKey) return data

    return [...data].sort((a, b) => {
      const aVal = a[sortKey]
      const bVal = b[sortKey]

      if (typeof aVal === 'number' && typeof bVal === 'number') {
        return sortDirection === 'asc' ? aVal - bVal : bVal - aVal
      }

      const aStr = String(aVal).toLowerCase()
      const bStr = String(bVal).toLowerCase()

      if (sortDirection === 'asc') {
        return aStr.localeCompare(bStr)
      } else {
        return bStr.localeCompare(aStr)
      }
    })
  }, [data, sortKey, sortDirection])

  const handleSort = (key: string) => {
    if (sortKey === key) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortKey(key)
      setSortDirection('asc')
    }
  }

  const handleRowClick = (index: number, row: any) => {
    setSelectedRow(index)
    onRowClick?.(row)
  }

  return (
    <div className="flex flex-col h-full bg-zinc-950 rounded-lg border border-zinc-800/50 overflow-hidden">
      {/* Toolbar */}
      <div className="flex items-center justify-between px-3 py-2 border-b border-zinc-800/50 bg-black/50">
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono text-zinc-500">
            {sortedData.length.toLocaleString()} rows
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button className="p-1.5 rounded hover:bg-zinc-800 transition-colors group">
            <Filter className="w-3.5 h-3.5 text-zinc-500 group-hover:text-zinc-300" />
          </button>
          <button className="p-1.5 rounded hover:bg-zinc-800 transition-colors group">
            <Download className="w-3.5 h-3.5 text-zinc-500 group-hover:text-zinc-300" />
          </button>
        </div>
      </div>

      {/* Header */}
      <div className="flex items-center border-b border-zinc-800/50 bg-zinc-900/50 sticky top-0 z-10">
        {columns.map((column) => {
          const isSorted = sortKey === column.key
          const SortIcon = !isSorted ? ArrowUpDown : sortDirection === 'asc' ? ArrowUp : ArrowDown

          return (
            <div
              key={column.key}
              className={`flex items-center gap-2 px-3 py-2 border-r border-zinc-800/50 last:border-r-0 ${
                column.width || 'flex-1'
              }`}
            >
              {column.sortable !== false ? (
                <button
                  onClick={() => handleSort(column.key)}
                  className="flex items-center gap-2 group hover:text-zinc-200 transition-colors"
                >
                  <span className="text-[10px] font-mono font-bold text-zinc-500 uppercase tracking-wider group-hover:text-zinc-300">
                    {column.label}
                  </span>
                  <SortIcon className={`w-3 h-3 ${
                    isSorted ? 'text-blue-400' : 'text-zinc-600 group-hover:text-zinc-400'
                  }`} />
                </button>
              ) : (
                <span className="text-[10px] font-mono font-bold text-zinc-500 uppercase tracking-wider">
                  {column.label}
                </span>
              )}
            </div>
          )
        })}
      </div>

      {/* Data rows with virtualization */}
      <div style={{ height }} className="flex-1">
        <Virtuoso
          data={sortedData}
          itemContent={(index, row) => (
            <motion.div
              className={`flex items-center border-b border-zinc-900/50 hover:bg-zinc-900/30 transition-colors cursor-pointer ${
                selectedRow === index ? 'bg-blue-500/10 border-blue-500/30' : ''
              }`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              onClick={() => handleRowClick(index, row)}
            >
              {columns.map((column) => (
                <div
                  key={column.key}
                  className={`px-3 py-2 border-r border-zinc-900/50 last:border-r-0 ${
                    column.width || 'flex-1'
                  }`}
                >
                  {column.render ? (
                    column.render(row[column.key], row)
                  ) : (
                    <span className="text-xs font-mono text-zinc-300">
                      {row[column.key]}
                    </span>
                  )}
                </div>
              ))}
            </motion.div>
          )}
        />
      </div>

      {/* Footer stats */}
      <div className="flex items-center justify-between px-3 py-2 border-t border-zinc-800/50 bg-black/50">
        <div className="text-[10px] font-mono text-zinc-600">
          {selectedRow !== null ? `Row ${selectedRow + 1} of ${sortedData.length}` : 'No selection'}
        </div>
        <div className="flex items-center gap-4 text-[10px] font-mono text-zinc-600">
          <span>↑↓ Navigate</span>
          <span>↵ Select</span>
          <span>⌘C Copy</span>
        </div>
      </div>
    </div>
  )
}
