'use client'

import { useState } from 'react'
import { Shield, ArrowLeft, CheckCircle, Clock, XCircle, AlertTriangle } from 'lucide-react'
import Link from 'next/link'
import { motion } from 'framer-motion'

export default function CompliancePage() {
  const deletionRequests = [
    {
      id: 'del_001',
      requestor: 'user_john_doe',
      email: 'john.doe@example.com',
      reason: 'GDPR Right to be Forgotten',
      status: 'pending',
      memoriesAffected: 234,
      submitted: '2 hours ago',
      deadline: '28 days'
    },
    {
      id: 'del_002',
      requestor: 'user_jane_smith',
      email: 'jane.smith@example.com',
      reason: 'Account Deletion',
      status: 'processing',
      memoriesAffected: 156,
      submitted: '1 day ago',
      deadline: '27 days'
    },
    {
      id: 'del_003',
      requestor: 'user_bob_wilson',
      email: 'bob.wilson@example.com',
      reason: 'Data Privacy Request',
      status: 'completed',
      memoriesAffected: 89,
      submitted: '5 days ago',
      deadline: 'Completed'
    }
  ]

  const provenanceLog = Array.from({ length: 10 }, (_, i) => ({
    id: `prov_${String(i).padStart(4, '0')}`,
    memory: `mem_${String(Math.floor(Math.random() * 100000)).padStart(6, '0')}`,
    action: ['created', 'updated', 'accessed', 'deleted'][Math.floor(Math.random() * 4)],
    agent: ['legal-001', 'finance-012', 'hr-003'][Math.floor(Math.random() * 3)],
    user: ['admin', 'analyst', 'operator'][Math.floor(Math.random() * 3)],
    timestamp: new Date(Date.now() - Math.random() * 86400000).toISOString(),
    verified: Math.random() > 0.1
  }))

  return (
    <div className="min-h-screen bg-black text-zinc-200 font-mono">
      {/* Header */}
      <div className="border-b border-zinc-800/50 bg-zinc-950 sticky top-0 z-50">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/">
                <button className="p-2 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 hover:border-zinc-700 transition-colors">
                  <ArrowLeft className="w-4 h-4 text-zinc-400" />
                </button>
              </Link>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-purple-500/10 border border-purple-500/30">
                  <Shield className="w-5 h-5 text-purple-400" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-zinc-200">Compliance Dashboard</h1>
                  <p className="text-xs text-zinc-500">GDPR • Provenance tracking • Audit logs</p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="px-3 py-1.5 rounded-lg bg-green-500/10 border border-green-500/30">
                <span className="text-xs font-bold text-green-400">COMPLIANT</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 max-w-7xl mx-auto">
        {/* Stats */}
        <div className="grid grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Deletion Requests', value: '23', status: 'warning' },
            { label: 'Completed', value: '156', status: 'good' },
            { label: 'Avg Response Time', value: '2.3d', status: 'good' },
            { label: 'Compliance Score', value: '98.7%', status: 'good' }
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="p-4 rounded-lg bg-zinc-900 border border-zinc-800"
            >
              <div className="text-xs text-zinc-600 mb-2 uppercase tracking-wider">
                {stat.label}
              </div>
              <span className={`text-2xl font-bold ${
                stat.status === 'good' ? 'text-green-400' : 'text-yellow-400'
              }`}>
                {stat.value}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Deletion Requests */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-zinc-200">GDPR Deletion Requests</h2>
            <button className="px-3 py-1.5 rounded-lg bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/30 text-xs text-blue-400 transition-colors">
              Export Report
            </button>
          </div>

          <div className="space-y-3">
            {deletionRequests.map((req, i) => {
              const statusConfig = {
                pending: { icon: Clock, color: 'text-yellow-400', bg: 'bg-yellow-500/10', border: 'border-yellow-500/30' },
                processing: { icon: AlertTriangle, color: 'text-blue-400', bg: 'bg-blue-500/10', border: 'border-blue-500/30' },
                completed: { icon: CheckCircle, color: 'text-green-400', bg: 'bg-green-500/10', border: 'border-green-500/30' }
              }
              const config = statusConfig[req.status as keyof typeof statusConfig]
              const Icon = config.icon

              return (
                <motion.div
                  key={req.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className={`p-4 rounded-lg ${config.bg} border ${config.border} hover:border-opacity-50 transition-colors`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4 flex-1">
                      <Icon className={`w-5 h-5 ${config.color} mt-0.5`} />
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="text-sm font-mono font-bold text-zinc-200">{req.id}</span>
                          <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded ${config.bg} border ${config.border} ${config.color}`}>
                            {req.status}
                          </span>
                        </div>
                        <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-xs">
                          <div>
                            <span className="text-zinc-600">Requestor: </span>
                            <span className="text-zinc-400">{req.requestor}</span>
                          </div>
                          <div>
                            <span className="text-zinc-600">Email: </span>
                            <span className="text-zinc-400">{req.email}</span>
                          </div>
                          <div>
                            <span className="text-zinc-600">Reason: </span>
                            <span className="text-zinc-400">{req.reason}</span>
                          </div>
                          <div>
                            <span className="text-zinc-600">Memories: </span>
                            <span className="font-mono text-cyan-400">{req.memoriesAffected}</span>
                          </div>
                          <div>
                            <span className="text-zinc-600">Submitted: </span>
                            <span className="text-zinc-400">{req.submitted}</span>
                          </div>
                          <div>
                            <span className="text-zinc-600">Deadline: </span>
                            <span className={req.status === 'completed' ? 'text-green-400' : 'text-yellow-400'}>
                              {req.deadline}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    {req.status !== 'completed' && (
                      <button className="px-3 py-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-xs text-zinc-400 transition-colors">
                        Process
                      </button>
                    )}
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>

        {/* Provenance Log */}
        <div>
          <h2 className="text-lg font-bold text-zinc-200 mb-4">Provenance Audit Log</h2>
          <div className="space-y-2">
            {provenanceLog.map((log, i) => (
              <motion.div
                key={log.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.05 }}
                className="p-3 rounded-lg bg-zinc-900/50 border border-zinc-800 hover:bg-zinc-900 hover:border-zinc-700 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 flex-1">
                    <span className="text-xs font-mono text-zinc-600">{log.id}</span>
                    <span className="text-xs font-mono text-blue-400">{log.memory}</span>
                    <span className={`text-xs font-bold uppercase px-2 py-0.5 rounded ${
                      log.action === 'created' ? 'bg-green-500/10 text-green-400 border border-green-500/30' :
                      log.action === 'updated' ? 'bg-blue-500/10 text-blue-400 border border-blue-500/30' :
                      log.action === 'accessed' ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30' :
                      'bg-red-500/10 text-red-400 border border-red-500/30'
                    }`}>
                      {log.action}
                    </span>
                    <span className="text-xs text-zinc-500">by {log.agent}</span>
                    <span className="text-xs text-zinc-600">•</span>
                    <span className="text-xs text-zinc-500">{log.user}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-zinc-600">
                      {new Date(log.timestamp).toLocaleString()}
                    </span>
                    {log.verified ? (
                      <CheckCircle className="w-4 h-4 text-green-400" />
                    ) : (
                      <XCircle className="w-4 h-4 text-red-400" />
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
