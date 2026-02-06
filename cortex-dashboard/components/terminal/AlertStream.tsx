'use client'

import { motion } from 'framer-motion'
import { AlertTriangle, XCircle, CheckCircle, Shield, Trash2, Edit3 } from 'lucide-react'

interface Alert {
  id: string
  severity: 'critical' | 'warning' | 'info'
  title: string
  description: string
  timestamp: Date
  actions?: { label: string; type: 'danger' | 'success' | 'neutral' }[]
}

const mockAlerts: Alert[] = [
  // Harvey AI - Legal Precedent Contradiction
  {
    id: 'harvey_alert_1',
    severity: 'critical',
    title: 'CONTRADICTION DETECTED - Legal Precedents',
    description: 'Ross v. Jenkins (broad discovery) conflicts with State Bar Ethics Opinion (limits discovery). Risk: $2M+ malpractice exposure',
    timestamp: new Date(Date.now() - 120000),
    actions: [
      { label: 'Flag for Review', type: 'success' },
      { label: 'Create Synthesis', type: 'neutral' },
      { label: 'Alert Partner', type: 'danger' }
    ]
  },

  // Intercom - Stale Pricing Data
  {
    id: 'intercom_alert_1',
    severity: 'critical',
    title: 'STALE DATA ALERT - Pricing Information',
    description: '200+ queries answered with OLD pricing ($499). NEW tiered pricing ($199-$799) not retrieved. Risk: $1.2M churn',
    timestamp: new Date(Date.now() - 300000),
    actions: [
      { label: 'Archive Old Pricing', type: 'success' },
      { label: 'Boost New Pricing', type: 'success' },
      { label: 'Flag Affected Queries', type: 'neutral' }
    ]
  },

  // Perplexity AI - Location Mismatch
  {
    id: 'perplexity_alert_1',
    severity: 'warning',
    title: 'TEMPORAL LOCATION CONFLICT',
    description: 'User in London but NYC memory weighted 87%. Showing wrong restaurant recommendations',
    timestamp: new Date(Date.now() - 600000),
    actions: [
      { label: 'Temporal Supersession', type: 'success' },
      { label: 'Reweight Locations', type: 'neutral' }
    ]
  },

  // Replit Agent - Framework Version Mismatch
  {
    id: 'replit_alert_1',
    severity: 'critical',
    title: 'FRAMEWORK VERSION CONFLICT',
    description: 'Generated class components for React 18.2.0 hooks-only project. Build-breaking code: 94% of outputs affected',
    timestamp: new Date(Date.now() - 900000),
    actions: [
      { label: 'Update Tech Stack', type: 'success' },
      { label: 'Vaccinate Class Components', type: 'success' },
      { label: 'Review Generated Code', type: 'neutral' }
    ]
  },

  // Personal AI - Credential Safety (Success Story)
  {
    id: 'personal_alert_1',
    severity: 'info',
    title: 'SAFETY INTERVENTION - Credential Protected',
    description: 'Blocked WiFi password disclosure during screen-sharing context. Context-aware safety system prevented privacy breach',
    timestamp: new Date(Date.now() - 1200000),
  },

  // General System Health
  {
    id: 'sys_alert_1',
    severity: 'warning',
    title: 'Memory Quality Degraded',
    description: 'Intercom pricing cluster: 12% semantic drift detected in last 6h (stale data aging)',
    timestamp: new Date(Date.now() - 1500000),
    actions: [
      { label: 'Retrain Model', type: 'success' }
    ]
  },

  {
    id: 'sys_alert_2',
    severity: 'info',
    title: 'Attribution Model Retrained',
    description: 'LDS confidence improved: 0.87 → 0.91 (Harvey AI cluster optimized)',
    timestamp: new Date(Date.now() - 1800000),
  },
]

export default function AlertStream() {
  const getSeverityConfig = (severity: Alert['severity']) => {
    switch (severity) {
      case 'critical':
        return {
          icon: XCircle,
          iconColor: 'text-red-400',
          bgColor: 'bg-red-500/10',
          borderColor: 'border-red-500/30',
          badge: 'CRITICAL'
        }
      case 'warning':
        return {
          icon: AlertTriangle,
          iconColor: 'text-amber-400',
          bgColor: 'bg-amber-500/10',
          borderColor: 'border-amber-500/30',
          badge: 'WARNING'
        }
      default:
        return {
          icon: CheckCircle,
          iconColor: 'text-blue-400',
          bgColor: 'bg-blue-500/10',
          borderColor: 'border-blue-500/30',
          badge: 'INFO'
        }
    }
  }

  return (
    <div className="flex-1 overflow-y-auto p-3 space-y-2">
      {mockAlerts.map((alert, index) => {
        const config = getSeverityConfig(alert.severity)
        const Icon = config.icon

        return (
          <motion.div
            key={alert.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            className={`${config.bgColor} ${config.borderColor} border rounded-lg p-2.5 hover:bg-opacity-20 transition-colors`}
          >
            <div className="flex items-start gap-2 mb-2">
              <Icon className={`w-4 h-4 ${config.iconColor} flex-shrink-0 mt-0.5`} />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <span className={`text-[9px] px-1.5 py-0.5 rounded font-bold ${config.bgColor} ${config.iconColor} ${config.borderColor} border uppercase tracking-wide`}>
                    {config.badge}
                  </span>
                  <span className="text-[10px] text-zinc-600">
                    {Math.floor((Date.now() - alert.timestamp.getTime()) / 60000)}m ago
                  </span>
                </div>
                <div className="text-xs font-bold text-zinc-200 mb-1">
                  {alert.title}
                </div>
                <div className="text-[11px] text-zinc-400 leading-tight mb-2">
                  {alert.description}
                </div>

                {alert.actions && alert.actions.length > 0 && (
                  <div className="flex flex-wrap gap-1.5">
                    {alert.actions.map((action, i) => (
                      <button
                        key={i}
                        className={`text-[10px] px-2 py-1 rounded font-medium transition-colors ${
                          action.type === 'danger'
                            ? 'bg-red-500/10 text-red-400 hover:bg-red-500/20 border border-red-500/30'
                            : action.type === 'success'
                            ? 'bg-green-500/10 text-green-400 hover:bg-green-500/20 border border-green-500/30'
                            : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700 border border-zinc-700'
                        }`}
                      >
                        {action.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )
      })}
    </div>
  )
}
