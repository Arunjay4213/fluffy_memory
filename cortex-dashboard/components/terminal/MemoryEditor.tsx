'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Edit3, Save, X, History, Tag, Link2, Trash2, Copy,
  RotateCcw, AlertTriangle, CheckCircle, Sliders, Database
} from 'lucide-react'

interface Memory {
  id: string
  agentId: string
  text: string
  criticality: number
  tier: 'hot' | 'warm' | 'cold'
  tags: string[]
  relatedMemories: string[]
  createdAt: Date
  updatedAt: Date
  versions: MemoryVersion[]
  embedding?: number[]
}

interface MemoryVersion {
  version: number
  text: string
  criticality: number
  editedBy: string
  editedAt: Date
  changeReason: string
}

const mockMemory: Memory = {
  id: 'mem_legal_042',
  agentId: 'agent_legal_001',
  text: 'Ross v. Jenkins (2nd Circuit, 2019): Broad discovery is allowed in employment discrimination cases when the scope is reasonably calculated to lead to admissible evidence.',
  criticality: 0.85,
  tier: 'hot',
  tags: ['case_law', 'employment', 'discovery', 'federal', '2nd_circuit'],
  relatedMemories: ['mem_legal_043', 'mem_legal_001', 'mem_legal_089'],
  createdAt: new Date('2024-01-15'),
  updatedAt: new Date('2024-02-03'),
  versions: [
    {
      version: 3,
      text: 'Ross v. Jenkins (2nd Circuit, 2019): Broad discovery is allowed in employment discrimination cases when the scope is reasonably calculated to lead to admissible evidence.',
      criticality: 0.85,
      editedBy: 'sarah@consultco.ai',
      editedAt: new Date('2024-02-03T14:30:00'),
      changeReason: 'Added jurisdictional context (2nd Circuit) and scope qualifier'
    },
    {
      version: 2,
      text: 'Ross v. Jenkins (2019): Broad discovery allowed in employment discrimination',
      criticality: 0.80,
      editedBy: 'john@consultco.ai',
      editedAt: new Date('2024-01-20T10:15:00'),
      changeReason: 'Simplified for faster retrieval'
    },
    {
      version: 1,
      text: 'Ross v. Jenkins case law regarding discovery in employment discrimination cases',
      criticality: 0.75,
      editedBy: 'system',
      editedAt: new Date('2024-01-15T09:00:00'),
      changeReason: 'Initial import from Partner A knowledge base'
    }
  ],
  embedding: [0.234, -0.512, 0.891, 0.123, -0.445] // Truncated for display
}

export default function MemoryEditor({ selectedAgentId }: { selectedAgentId: string | null }) {
  const [memory, setMemory] = useState<Memory | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [editedText, setEditedText] = useState('')
  const [editedCriticality, setEditedCriticality] = useState(0.5)
  const [editedTags, setEditedTags] = useState<string[]>([])
  const [newTag, setNewTag] = useState('')
  const [showVersionHistory, setShowVersionHistory] = useState(false)
  const [changeReason, setChangeReason] = useState('')
  const [isSaving, setIsSaving] = useState(false)
  const [saveSuccess, setSaveSuccess] = useState(false)

  // Load memory when agent is selected
  useEffect(() => {
    if (selectedAgentId) {
      // Simulate loading memory from backend
      setMemory(null) // Reset first
      setTimeout(() => {
        setMemory(mockMemory)
        setEditedText(mockMemory.text)
        setEditedCriticality(mockMemory.criticality)
        setEditedTags([...mockMemory.tags])
        setIsEditing(false)
        setShowVersionHistory(false)
        setChangeReason('')
      }, 200)
    } else {
      setMemory(null)
      setIsEditing(false)
    }
  }, [selectedAgentId])

  if (!memory) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center space-y-3 p-8">
          <Database className="w-12 h-12 text-zinc-700 mx-auto" />
          <div className="text-sm text-zinc-500">
            Select an agent to view and edit memories
          </div>
          <div className="text-xs text-zinc-600 max-w-xs">
            You'll have full control: edit text, adjust criticality, manage tags, connect memories
          </div>
        </div>
      </div>
    )
  }

  const handleStartEdit = () => {
    setIsEditing(true)
    setEditedText(memory.text)
    setEditedCriticality(memory.criticality)
    setEditedTags([...memory.tags])
  }

  const handleSave = async () => {
    if (!changeReason.trim()) {
      return
    }

    setIsSaving(true)
    setSaveSuccess(false)

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))

    // Update memory with new values
    if (memory) {
      const updatedMemory = {
        ...memory,
        text: editedText,
        criticality: editedCriticality,
        tags: editedTags,
        updatedAt: new Date(),
        versions: [
          {
            version: memory.versions[0].version + 1,
            text: editedText,
            criticality: editedCriticality,
            editedBy: 'you@consultco.ai',
            editedAt: new Date(),
            changeReason: changeReason
          },
          ...memory.versions
        ]
      }
      setMemory(updatedMemory)
    }

    setIsEditing(false)
    setChangeReason('')
    setIsSaving(false)
    setSaveSuccess(true)

    // Hide success message after 3 seconds
    setTimeout(() => setSaveSuccess(false), 3000)
  }

  const handleCancel = () => {
    setIsEditing(false)
    setEditedText(memory.text)
    setEditedCriticality(memory.criticality)
    setEditedTags([...memory.tags])
    setChangeReason('')
  }

  const handleAddTag = () => {
    if (newTag.trim() && !editedTags.includes(newTag.trim())) {
      setEditedTags([...editedTags, newTag.trim()])
      setNewTag('')
    }
  }

  const handleRemoveTag = (tag: string) => {
    setEditedTags(editedTags.filter(t => t !== tag))
  }

  const handleRollback = (version: number) => {
    const targetVersion = memory.versions.find(v => v.version === version)
    if (targetVersion) {
      setEditedText(targetVersion.text)
      setEditedCriticality(targetVersion.criticality)
      setIsEditing(true)
      setChangeReason(`Rolled back to version ${version}`)
    }
  }

  const getTierColor = () => {
    switch (memory.tier) {
      case 'hot': return 'text-red-400'
      case 'warm': return 'text-amber-400'
      case 'cold': return 'text-blue-400'
    }
  }

  const textDiff = editedText !== memory.text
  const criticalityDiff = editedCriticality !== memory.criticality
  const tagsDiff = JSON.stringify(editedTags.sort()) !== JSON.stringify([...memory.tags].sort())
  const hasChanges = textDiff || criticalityDiff || tagsDiff

  return (
    <div className="h-full overflow-y-auto">
      <div className="p-4 space-y-4">
        {/* Success Toast */}
        <AnimatePresence>
          {saveSuccess && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-green-500/20 border border-green-500/50 rounded-lg p-3 flex items-center gap-3"
            >
              <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
              <div className="flex-1">
                <div className="text-sm font-bold text-green-400">Memory updated successfully!</div>
                <div className="text-xs text-zinc-400">Changes are now live and will affect future queries</div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-mono text-blue-400 font-bold">{memory.id}</span>
              <span className={`text-[10px] font-bold uppercase ${getTierColor()}`}>
                {memory.tier} tier
              </span>
            </div>
            <div className="text-[10px] text-zinc-600">
              Created: {memory.createdAt.toLocaleDateString()} •
              Updated: {memory.updatedAt.toLocaleDateString()} •
              Version: {memory.versions[0].version}
            </div>
          </div>

          <div className="flex items-center gap-2">
            {!isEditing ? (
              <>
                <button
                  onClick={() => setShowVersionHistory(!showVersionHistory)}
                  className="p-2 rounded-lg bg-zinc-900 hover:bg-zinc-800 hover:scale-105 text-zinc-400 hover:text-zinc-300 border border-zinc-800 transition-all duration-200"
                  title="Version History"
                >
                  <History className="w-4 h-4" />
                </button>
                <button
                  onClick={handleStartEdit}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-blue-500/20 hover:bg-blue-500/30 hover:scale-105 text-blue-400 border border-blue-500/30 text-xs font-medium transition-all duration-200 shadow-sm hover:shadow-lg hover:shadow-blue-500/20"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  Edit Memory
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={handleCancel}
                  disabled={isSaving}
                  className="p-2 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-400 border border-zinc-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  title="Cancel"
                >
                  <X className="w-4 h-4" />
                </button>
                <button
                  onClick={handleSave}
                  disabled={!hasChanges || !changeReason.trim() || isSaving}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-green-500/20 hover:bg-green-500/30 text-green-400 border border-green-500/30 text-xs font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSaving ? (
                    <>
                      <div className="w-3.5 h-3.5 border-2 border-green-400 border-t-transparent rounded-full animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="w-3.5 h-3.5" />
                      Save Changes
                    </>
                  )}
                </button>
              </>
            )}
          </div>
        </div>

        {/* Change warning if editing */}
        {isEditing && hasChanges && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-3"
          >
            <div className="flex items-start gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <div className="text-xs font-bold text-amber-400 mb-1">Unsaved Changes</div>
                <div className="text-[11px] text-zinc-400">
                  {textDiff && '• Memory text modified'}
                  {criticalityDiff && '• Criticality changed'}
                  {tagsDiff && '• Tags updated'}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Memory Text Editor */}
        <div className="bg-zinc-900/30 border border-zinc-800/50 rounded-lg p-4 space-y-3">
          <div className="flex items-center justify-between">
            <div className="text-[10px] text-zinc-500 uppercase tracking-wide font-bold">Memory Content</div>
            {!isEditing && (
              <button className="text-[10px] text-zinc-600 hover:text-zinc-400 flex items-center gap-1">
                <Copy className="w-3 h-3" />
                Copy
              </button>
            )}
          </div>

          {isEditing ? (
            <textarea
              value={editedText}
              onChange={(e) => setEditedText(e.target.value)}
              rows={6}
              className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2 text-sm text-zinc-200 font-mono focus:outline-none focus:border-blue-500/50 resize-none"
              placeholder="Enter memory content..."
            />
          ) : (
            <div className="text-sm text-zinc-300 leading-relaxed font-mono whitespace-pre-wrap">
              {memory.text}
            </div>
          )}

          {isEditing && (
            <div className="text-[10px] text-zinc-600">
              {editedText.length} characters • {editedText.split(' ').length} words
            </div>
          )}
        </div>

        {/* Criticality Control */}
        <div className="bg-zinc-900/30 border border-zinc-800/50 rounded-lg p-4 space-y-3">
          <div className="flex items-center gap-2">
            <Sliders className="w-4 h-4 text-purple-400" />
            <div className="text-[10px] text-zinc-500 uppercase tracking-wide font-bold">Criticality Score</div>
          </div>

          <div className="space-y-2">
            {isEditing ? (
              <>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={editedCriticality}
                  onChange={(e) => setEditedCriticality(parseFloat(e.target.value))}
                  className="w-full"
                />
                <div className="flex items-center justify-between text-xs">
                  <span className="text-zinc-600">Low Priority</span>
                  <span className={`font-bold ${
                    editedCriticality >= 0.7 ? 'text-red-400' :
                    editedCriticality >= 0.4 ? 'text-amber-400' : 'text-green-400'
                  }`}>
                    {(editedCriticality * 100).toFixed(0)}%
                  </span>
                  <span className="text-zinc-600">Critical</span>
                </div>
              </>
            ) : (
              <div className="flex items-center gap-3">
                <div className="flex-1 h-2 bg-zinc-800 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${
                      memory.criticality >= 0.7 ? 'bg-red-500' :
                      memory.criticality >= 0.4 ? 'bg-amber-500' : 'bg-green-500'
                    }`}
                    style={{ width: `${memory.criticality * 100}%` }}
                  />
                </div>
                <span className="text-sm font-bold text-zinc-300 font-mono w-12">
                  {(memory.criticality * 100).toFixed(0)}%
                </span>
              </div>
            )}
          </div>

          <div className="text-[11px] text-zinc-500">
            {memory.criticality >= 0.7 ? 'High priority - will be retrieved frequently' :
             memory.criticality >= 0.4 ? 'Medium priority - retrieved when relevant' :
             'Low priority - rarely retrieved'}
          </div>
        </div>

        {/* Tags Manager */}
        <div className="bg-zinc-900/30 border border-zinc-800/50 rounded-lg p-4 space-y-3">
          <div className="flex items-center gap-2">
            <Tag className="w-4 h-4 text-green-400" />
            <div className="text-[10px] text-zinc-500 uppercase tracking-wide font-bold">Tags</div>
          </div>

          <div className="flex flex-wrap gap-2">
            {(isEditing ? editedTags : memory.tags).map((tag, i) => (
              <div
                key={i}
                className="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-zinc-800 border border-zinc-700 text-xs text-zinc-300"
              >
                <span className="font-mono">{tag}</span>
                {isEditing && (
                  <button
                    onClick={() => handleRemoveTag(tag)}
                    className="text-zinc-600 hover:text-red-400 transition-colors"
                  >
                    <X className="w-3 h-3" />
                  </button>
                )}
              </div>
            ))}
          </div>

          {isEditing && (
            <div className="flex gap-2">
              <input
                type="text"
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleAddTag()}
                placeholder="Add new tag..."
                className="flex-1 bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-1.5 text-xs text-zinc-200 focus:outline-none focus:border-blue-500/50"
              />
              <button
                onClick={handleAddTag}
                disabled={!newTag.trim()}
                className="px-3 py-1.5 rounded-lg bg-blue-500/20 hover:bg-blue-500/30 hover:scale-105 text-blue-400 border border-blue-500/30 text-xs font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Add
              </button>
            </div>
          )}
        </div>

        {/* Related Memories */}
        <div className="bg-zinc-900/30 border border-zinc-800/50 rounded-lg p-4 space-y-3">
          <div className="flex items-center gap-2">
            <Link2 className="w-4 h-4 text-blue-400" />
            <div className="text-[10px] text-zinc-500 uppercase tracking-wide font-bold">Related Memories</div>
          </div>

          <div className="space-y-2">
            {memory.relatedMemories.map((relId, i) => (
              <div
                key={i}
                className="flex items-center justify-between px-3 py-2 rounded-lg bg-zinc-900/50 border border-zinc-800 hover:border-zinc-700 transition-colors cursor-pointer"
              >
                <span className="text-xs font-mono text-blue-400">{relId}</span>
                <span className="text-[10px] text-zinc-600">Click to view</span>
              </div>
            ))}
          </div>

          {isEditing && (
            <button className="w-full px-3 py-2 rounded-lg border border-dashed border-zinc-700 hover:border-zinc-600 text-xs text-zinc-500 hover:text-zinc-400 transition-colors">
              + Link another memory
            </button>
          )}
        </div>

        {/* Change Reason (when editing) */}
        {isEditing && (
          <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-4 space-y-3">
            <div className="text-[10px] text-amber-400 uppercase tracking-wide font-bold">Change Reason (Required)</div>
            <textarea
              value={changeReason}
              onChange={(e) => setChangeReason(e.target.value)}
              rows={2}
              placeholder="Why are you making this change? (e.g., 'Fixed jurisdictional context', 'Updated with latest case law')"
              className="w-full bg-zinc-900 border border-amber-500/30 rounded-lg px-3 py-2 text-sm text-zinc-200 focus:outline-none focus:border-amber-500/50 resize-none"
            />
          </div>
        )}

        {/* Version History (expandable) */}
        {showVersionHistory && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="bg-zinc-900/50 border border-zinc-800 rounded-lg p-4 space-y-3"
          >
            <div className="flex items-center justify-between">
              <div className="text-[10px] text-zinc-500 uppercase tracking-wide font-bold">Version History</div>
              <button
                onClick={() => setShowVersionHistory(false)}
                className="text-zinc-600 hover:text-zinc-400"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3">
              {memory.versions.map((version) => (
                <div
                  key={version.version}
                  className="bg-zinc-900/30 border border-zinc-800/50 rounded-lg p-3 space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-zinc-300">v{version.version}</span>
                      <span className="text-[10px] text-zinc-600">
                        {version.editedAt.toLocaleString()}
                      </span>
                    </div>
                    {version.version !== memory.versions[0].version && (
                      <button
                        onClick={() => handleRollback(version.version)}
                        className="flex items-center gap-1 px-2 py-1 rounded text-[10px] bg-zinc-800 hover:bg-zinc-700 hover:scale-105 text-zinc-400 hover:text-zinc-300 border border-zinc-700 transition-all duration-200"
                      >
                        <RotateCcw className="w-3 h-3" />
                        Rollback
                      </button>
                    )}
                  </div>

                  <div className="text-[11px] text-zinc-400 font-mono">
                    {version.text.length > 100 ? `${version.text.substring(0, 100)}...` : version.text}
                  </div>

                  <div className="flex items-center justify-between text-[10px] text-zinc-600">
                    <span>By: {version.editedBy}</span>
                    <span>Criticality: {(version.criticality * 100).toFixed(0)}%</span>
                  </div>

                  <div className="text-[11px] text-amber-400 italic">
                    "{version.changeReason}"
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Danger Zone */}
        <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 space-y-3">
          <div className="text-[10px] text-red-400 uppercase tracking-wide font-bold">Danger Zone</div>
          <div className="flex items-center justify-between">
            <div className="text-xs text-zinc-400">
              Permanently delete this memory from the agent
            </div>
            <button
              onClick={() => {
                if (confirm('Are you sure you want to delete this memory? This action cannot be undone.')) {
                  alert('Memory deleted (Demo mode)')
                }
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-500/20 hover:bg-red-500/40 hover:scale-105 text-red-400 border border-red-500/30 hover:border-red-500/50 text-xs font-medium transition-all duration-200 shadow-sm hover:shadow-lg hover:shadow-red-500/20"
            >
              <Trash2 className="w-3 h-3" />
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
