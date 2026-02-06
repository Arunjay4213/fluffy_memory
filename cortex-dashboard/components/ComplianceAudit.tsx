'use client'

import { useState } from 'react'
import { Shield, Trash2, FileText, GitBranch, CheckCircle, Clock, AlertTriangle, Download } from 'lucide-react'
import { DeletionRequest, Memory } from '@/lib/types'
import { format, differenceInDays } from 'date-fns'

interface Props {
  deletionRequests: DeletionRequest[]
  memories: Memory[]
}

export default function ComplianceAudit({ deletionRequests, memories }: Props) {
  const [selectedRequest, setSelectedRequest] = useState<string | null>(null)

  const getStatusColor = (status: DeletionRequest['status']) => {
    switch (status) {
      case 'pending':
        return { bg: 'bg-amber-500/10', border: 'border-amber-500/20', text: 'text-amber-400' }
      case 'grace_period':
        return { bg: 'bg-blue-500/10', border: 'border-blue-500/20', text: 'text-blue-400' }
      case 'completed':
        return { bg: 'bg-green-500/10', border: 'border-green-500/20', text: 'text-green-400' }
    }
  }

  const mockProvenanceGraph = {
    memory: 'mem_005',
    children: [
      { id: 'summary_12', type: 'summary', text: 'User UI preferences summary' },
      { id: 'cluster_3', type: 'cluster', text: 'Preference cluster' },
      { id: 'output_456', type: 'output', text: 'Generated response about UI settings' },
    ]
  }

  return (
    <div className="space-y-6">
      {/* Engine Header */}
      <div>
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 rounded-lg bg-purple-500/10 border border-purple-500/20">
            <Shield className="w-6 h-6 text-purple-500" />
          </div>
          <div>
            <h2 className="text-2xl font-bold">Compliance & Audit</h2>
            <p className="text-sm text-zinc-500 font-mono">GDPR & Provenance Tracking</p>
          </div>
        </div>
        <p className="text-zinc-400 max-w-2xl">
          Tracks complete provenance from memories to derived artifacts. GDPR cascading deletion with 30-day
          grace period and compliance certificates. The only system that can prove what was deleted and why.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="p-4 rounded-lg bg-zinc-900/50 border border-zinc-800">
          <div className="flex items-center gap-2 mb-2">
            <Trash2 className="w-4 h-4 text-purple-500" />
            <span className="text-xs font-mono text-zinc-500">Deletion Requests</span>
          </div>
          <p className="text-2xl font-bold">{deletionRequests.length}</p>
          <p className="text-xs text-zinc-500 font-mono mt-1">All time</p>
        </div>
        <div className="p-4 rounded-lg bg-zinc-900/50 border border-zinc-800">
          <div className="flex items-center gap-2 mb-2">
            <Clock className="w-4 h-4 text-amber-500" />
            <span className="text-xs font-mono text-zinc-500">In Grace Period</span>
          </div>
          <p className="text-2xl font-bold">
            {deletionRequests.filter(r => r.status === 'grace_period').length}
          </p>
          <p className="text-xs text-zinc-500 font-mono mt-1">30-day window</p>
        </div>
        <div className="p-4 rounded-lg bg-zinc-900/50 border border-zinc-800">
          <div className="flex items-center gap-2 mb-2">
            <FileText className="w-4 h-4 text-green-500" />
            <span className="text-xs font-mono text-zinc-500">Audit Trail Events</span>
          </div>
          <p className="text-2xl font-bold">1.2K</p>
          <p className="text-xs text-zinc-500 font-mono mt-1">Last 30 days</p>
        </div>
      </div>

      {/* Deletion Requests */}
      <div className="space-y-3">
        <h3 className="text-sm font-mono text-zinc-500 uppercase tracking-wide">GDPR Deletion Requests</h3>

        {deletionRequests.map((request, idx) => {
          const colors = getStatusColor(request.status)
          const daysUntilDeletion = differenceInDays(request.deletionDate, new Date())
          const isExpanded = selectedRequest === request.id

          return (
            <div
              key={request.id}
              className={`rounded-lg border ${colors.bg} ${colors.border} overflow-hidden`}
            >
              <button
                onClick={() => setSelectedRequest(isExpanded ? null : request.id)}
                className="w-full p-4 text-left hover:bg-black/20 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    <Trash2 className={`w-5 h-5 ${colors.text} mt-0.5`} />
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className={`px-2 py-0.5 rounded text-xs font-mono font-medium ${colors.bg} ${colors.text} border ${colors.border} capitalize`}>
                          {request.status.replace('_', ' ')}
                        </span>
                        <span className="px-2 py-0.5 rounded text-xs font-mono bg-zinc-800 text-zinc-400 border border-zinc-700">
                          {request.id}
                        </span>
                      </div>
                      <p className="text-sm text-zinc-300 mb-1">
                        Memory: <span className="font-mono text-purple-400">{request.memoryId}</span>
                      </p>
                      <p className="text-xs text-zinc-500 font-mono">
                        Requested: {format(request.requestedAt, 'MMM d, yyyy HH:mm')}
                      </p>
                      <p className="text-xs text-zinc-500 font-mono">
                        Deletion: {format(request.deletionDate, 'MMM d, yyyy HH:mm')}
                        {request.status === 'grace_period' && (
                          <span className="ml-2 text-amber-400">
                            ({daysUntilDeletion} days remaining)
                          </span>
                        )}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-mono text-zinc-500 mb-1">Derived Artifacts</p>
                    <p className="text-2xl font-bold text-purple-400">{request.derivedArtifacts.length}</p>
                  </div>
                </div>
              </button>

              {isExpanded && (
                <div className="border-t border-zinc-800 p-4 bg-black/30 space-y-4">
                  {/* Provenance Graph */}
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <GitBranch className="w-4 h-4 text-purple-400" />
                      <span className="text-sm font-mono text-zinc-400">Cascading Deletion Provenance</span>
                    </div>

                    <div className="p-4 rounded-lg bg-zinc-900/50 border border-zinc-800">
                      {/* Root Memory */}
                      <div className="flex items-start gap-3 mb-4">
                        <div className="p-2 rounded bg-purple-500/10 border border-purple-500/20">
                          <FileText className="w-4 h-4 text-purple-400" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-xs font-mono text-zinc-500">ROOT MEMORY</span>
                            <span className="px-2 py-0.5 rounded text-xs font-mono bg-purple-500/10 text-purple-400 border border-purple-500/20">
                              {request.memoryId}
                            </span>
                          </div>
                          <p className="text-sm text-zinc-300">
                            {memories.find(m => m.id === request.memoryId)?.text || 'Memory text...'}
                          </p>
                        </div>
                      </div>

                      {/* Derived Artifacts */}
                      <div className="pl-8 border-l-2 border-zinc-800 space-y-3">
                        {mockProvenanceGraph.children.map((child, i) => (
                          <div key={child.id} className="flex items-start gap-3">
                            <div className="p-1.5 rounded bg-zinc-800 border border-zinc-700">
                              {child.type === 'summary' && <FileText className="w-3 h-3 text-zinc-400" />}
                              {child.type === 'cluster' && <GitBranch className="w-3 h-3 text-zinc-400" />}
                              {child.type === 'output' && <CheckCircle className="w-3 h-3 text-zinc-400" />}
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <span className="text-xs font-mono text-zinc-600 uppercase">{child.type}</span>
                                <span className="px-2 py-0.5 rounded text-xs font-mono bg-zinc-800 text-zinc-500 border border-zinc-700">
                                  {child.id}
                                </span>
                              </div>
                              <p className="text-xs text-zinc-400">{child.text}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    {request.status === 'grace_period' && (
                      <>
                        <button className="px-4 py-2 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm font-mono hover:bg-red-500/20 transition-colors">
                          Execute Deletion Now
                        </button>
                        <button className="px-4 py-2 rounded-lg bg-green-500/10 border border-green-500/20 text-green-400 text-sm font-mono hover:bg-green-500/20 transition-colors">
                          Cancel Request
                        </button>
                      </>
                    )}
                    <button className="px-4 py-2 rounded-lg bg-purple-500/10 border border-purple-500/20 text-purple-400 text-sm font-mono hover:bg-purple-500/20 transition-colors flex items-center gap-2">
                      <Download className="w-4 h-4" />
                      Download Certificate
                    </button>
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Deletion Certificate Preview */}
      <div className="p-6 rounded-lg bg-zinc-900/50 border border-zinc-800 space-y-4">
        <div className="flex items-center gap-3 mb-4">
          <FileText className="w-6 h-6 text-purple-400" />
          <div>
            <h3 className="font-bold text-lg">GDPR Compliance Certificate</h3>
            <p className="text-xs font-mono text-zinc-500">Generated for deletion request del_001</p>
          </div>
        </div>

        <div className="p-4 rounded-lg bg-black/30 border border-zinc-800 font-mono text-xs space-y-2">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <span className="text-zinc-600">Deletion Request ID:</span>
              <p className="text-purple-400">del_001</p>
            </div>
            <div>
              <span className="text-zinc-600">Memory ID:</span>
              <p className="text-purple-400">mem_005</p>
            </div>
            <div>
              <span className="text-zinc-600">Request Date:</span>
              <p className="text-zinc-300">{format(new Date('2024-01-20'), 'MMM d, yyyy HH:mm:ss')}</p>
            </div>
            <div>
              <span className="text-zinc-600">Deletion Date:</span>
              <p className="text-zinc-300">{format(new Date('2024-02-19'), 'MMM d, yyyy HH:mm:ss')}</p>
            </div>
            <div>
              <span className="text-zinc-600">Derived Artifacts:</span>
              <p className="text-amber-400">3 items</p>
            </div>
            <div>
              <span className="text-zinc-600">Status:</span>
              <p className="text-blue-400">Grace Period</p>
            </div>
          </div>

          <div className="pt-3 border-t border-zinc-800">
            <span className="text-zinc-600">Artifacts to be deleted:</span>
            <ul className="mt-2 space-y-1 text-zinc-400">
              <li>→ summary_12 (Summary)</li>
              <li>→ cluster_3 (Cluster)</li>
              <li>→ output_456 (Output)</li>
            </ul>
          </div>

          <div className="pt-3 border-t border-zinc-800">
            <span className="text-zinc-600">Immediate Actions:</span>
            <p className="text-green-400 mt-1">✓ Removed from active retrieval index</p>
          </div>
        </div>

        <button className="w-full px-4 py-3 rounded-lg bg-purple-500/10 border border-purple-500/20 text-purple-400 font-mono hover:bg-purple-500/20 transition-colors flex items-center justify-center gap-2">
          <Download className="w-4 h-4" />
          Export Full Compliance Report (JSON)
        </button>
      </div>

      {/* Info Box */}
      <div className="p-4 rounded-lg bg-purple-500/5 border border-purple-500/20">
        <div className="flex gap-3">
          <Shield className="w-5 h-5 text-purple-400 flex-shrink-0 mt-0.5" />
          <div className="space-y-1">
            <p className="text-sm font-medium text-purple-300">Provenance-Traced Deletion</p>
            <p className="text-xs text-zinc-400">
              When you delete Memory X, CortexOS traces the provenance graph to find Summary Y and Cluster Z
              that were derived from it. All artifacts are deleted together with a compliance certificate.
              No other memory system can do this — it's only possible because we maintain the full provenance graph.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
