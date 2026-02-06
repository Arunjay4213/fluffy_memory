'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Play, CheckCircle, AlertTriangle, Clock, Users, FileText, Send, ArrowRight } from 'lucide-react'

interface FixWorkflow {
  issueId: string
  steps: FixStep[]
}

interface FixStep {
  id: string
  title: string
  status: 'pending' | 'running' | 'completed' | 'warning'
  details: string
  results?: string[]
  action?: string
}

const mockWorkflows: Record<string, FixWorkflow> = {
  'issue_intercom_001': {
    issueId: 'issue_intercom_001',
    steps: [
      {
        id: 'test',
        title: 'Test on Historical Queries',
        status: 'completed',
        details: 'Testing archive of mem_intercom_001 on last 50 ACME Corp queries...',
        results: [
          '✅ 48/50 queries now use NEW pricing (mem_intercom_002)',
          '✅ Response changes: "$499" → "$199-$799 tiered"',
          '⚠️ 2 edge cases detected'
        ]
      },
      {
        id: 'review',
        title: 'Review Edge Cases',
        status: 'warning',
        details: 'Found 2 queries that need attention',
        results: [
          'Query: "When did Enterprise pricing change?" → No timeline in mem_intercom_002',
          'Suggested fix: Add "Pricing updated Jan 2024" to mem_intercom_002',
          '',
          'Query: "What was old pricing?" → Now returns nothing',
          'Suggested fix: Keep mem_intercom_001 but add [DEPRECATED] tag'
        ]
      },
      {
        id: 'apply',
        title: 'Apply & Monitor',
        status: 'pending',
        details: 'Ready to apply fix to production',
        action: 'apply'
      },
      {
        id: 'notify',
        title: 'Notify Stakeholders',
        status: 'pending',
        details: 'Alert Customer Success team about fix',
        action: 'notify'
      }
    ]
  },

  'issue_harvey_001': {
    issueId: 'issue_harvey_001',
    steps: [
      {
        id: 'test',
        title: 'Analyze Contradiction',
        status: 'completed',
        details: 'Checking co-occurrence of mem_harvey_001 and mem_harvey_002...',
        results: [
          '🔴 Used together in 34 queries (last 30 days)',
          '🔴 12 queries were legal briefs (HIGH RISK)',
          '⚠️ Ross v. Jenkins is 2nd Circuit; Ethics Opinion is state-level',
          '✅ Not actually contradictory - different jurisdictions'
        ]
      },
      {
        id: 'review',
        title: 'Create Synthesis',
        status: 'warning',
        details: 'Recommended approach: Add context to both memories',
        results: [
          'Update mem_harvey_001: "...broad discovery (FEDERAL courts, 2nd Circuit)"',
          'Update mem_harvey_002: "...limits discovery (STATE attorney-client privilege)"',
          '',
          'Alternative: Create new mem_harvey_synthesis explaining relationship'
        ]
      },
      {
        id: 'apply',
        title: 'Apply Changes',
        status: 'pending',
        details: 'Add jurisdictional context to memories',
        action: 'apply'
      },
      {
        id: 'notify',
        title: 'Alert Partner',
        status: 'pending',
        details: 'Email Harvey AI partner about contradictory precedent detection',
        action: 'notify'
      }
    ]
  },

  'issue_replit_001': {
    issueId: 'issue_replit_001',
    steps: [
      {
        id: 'test',
        title: 'Test on Historical Queries',
        status: 'completed',
        details: 'Testing archive of mem_replit_001 on last 100 StartupXYZ queries...',
        results: [
          '✅ 94/100 queries now generate hooks-based components',
          '✅ 0 build failures (was 94% before)',
          '✅ All queries respect React 18.2.0 from mem_replit_002',
          '⚠️ 6 queries asked for class syntax explicitly - kept classes'
        ]
      },
      {
        id: 'review',
        title: 'Review Generated Code',
        status: 'completed',
        details: 'Sample of generated code after fix',
        results: [
          'Before: class Timer extends React.Component { ... }',
          'After:  const Timer = () => { useEffect(() => {...}, []); ... }',
          '',
          '✅ Respects current project tech stack',
          '✅ Modern React 18 patterns',
          '✅ TypeScript types preserved'
        ]
      },
      {
        id: 'apply',
        title: 'Apply & Monitor',
        status: 'pending',
        details: 'Archive mem_replit_001, boost mem_replit_002 to criticality 0.90',
        action: 'apply'
      },
      {
        id: 'notify',
        title: 'Notify Customer',
        status: 'pending',
        details: 'Email StartupXYZ: "Fixed code generation - now using React 18 patterns"',
        action: 'notify'
      }
    ]
  },

  'issue_perplexity_001': {
    issueId: 'issue_perplexity_001',
    steps: [
      {
        id: 'test',
        title: 'Test Temporal Supersession',
        status: 'completed',
        details: 'Testing location weighting rules...',
        results: [
          '✅ Temporary location (London) now weighted 2x permanent address',
          '✅ 98/100 queries use London location correctly',
          '⚠️ 2 queries about "home address" still show NYC (correct behavior)'
        ]
      },
      {
        id: 'review',
        title: 'Verify Location Logic',
        status: 'completed',
        details: 'Location attribution now working correctly',
        results: [
          'Query: "restaurants near me" → Uses London (temporary)',
          'Query: "my home address" → Uses NYC (permanent)',
          'Query: "where am I?" → Uses London (temporary)',
          '',
          '✅ System distinguishes temporary vs permanent correctly'
        ]
      },
      {
        id: 'apply',
        title: 'Apply Rule',
        status: 'pending',
        details: 'Enable temporal supersession rule for all location queries',
        action: 'apply'
      },
      {
        id: 'notify',
        title: 'Mark Resolved',
        status: 'pending',
        details: 'Close customer issue - location recommendations now accurate',
        action: 'notify'
      }
    ]
  },

  'issue_personal_001': {
    issueId: 'issue_personal_001',
    steps: [
      {
        id: 'test',
        title: 'Verify Safety Check',
        status: 'completed',
        details: 'Testing context-aware credential blocking...',
        results: [
          '✅ WiFi password blocked during screen share context',
          '✅ Would have shown password without mem_personal_002',
          '✅ Safety system working as designed',
          '',
          'Attribution: 95% credentials + 91% context = BLOCK'
        ]
      },
      {
        id: 'review',
        title: 'Safety System Analysis',
        status: 'completed',
        details: 'No action needed - system prevented breach',
        results: [
          '✅ Context-aware safety working correctly',
          '✅ No false positives (credentials shown when safe)',
          '✅ No false negatives (credentials blocked when risky)',
          '',
          'Recommendation: Boost mem_personal_001 criticality to 0.95+'
        ]
      },
      {
        id: 'apply',
        title: 'Boost Criticality',
        status: 'pending',
        details: 'Increase credential memory criticality to prevent future issues',
        action: 'apply'
      },
      {
        id: 'notify',
        title: 'Log Success',
        status: 'pending',
        details: 'Add to safety success metrics - prevented credential exposure',
        action: 'notify'
      }
    ]
  }
}

export default function FixAndVerify({ selectedIssueId }: { selectedIssueId: string | null }) {
  const [runningStep, setRunningStep] = useState<string | null>(null)

  const workflow = selectedIssueId ? mockWorkflows[selectedIssueId] : null

  const handleAction = (stepId: string) => {
    setRunningStep(stepId)
    // Simulate async action
    setTimeout(() => {
      setRunningStep(null)
      // Update step status (would be real API call)
    }, 2000)
  }

  if (!workflow) {
    return (
      <div className="flex items-center justify-center h-full p-6">
        <div className="text-center space-y-3">
          <Play className="w-12 h-12 text-zinc-700 mx-auto" />
          <div className="text-sm text-zinc-500">
            Select an issue to see fix workflow
          </div>
          <div className="text-xs text-zinc-600 max-w-xs">
            Test changes on historical data, review edge cases, then apply to production
          </div>
        </div>
      </div>
    )
  }

  const getStepIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="w-4 h-4 text-green-400" />
      case 'warning': return <AlertTriangle className="w-4 h-4 text-amber-400" />
      case 'running': return <Clock className="w-4 h-4 text-blue-400 animate-spin" />
      default: return <div className="w-4 h-4 rounded-full border-2 border-zinc-700" />
    }
  }

  const getStepColor = (status: string) => {
    switch (status) {
      case 'completed': return 'border-green-500/30'
      case 'warning': return 'border-amber-500/30'
      case 'running': return 'border-blue-500/30'
      default: return 'border-zinc-800/50'
    }
  }

  return (
    <div className="h-full overflow-y-auto p-4 space-y-4">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-2 pb-3 border-b border-zinc-800/50"
      >
        <Play className="w-4 h-4 text-blue-400" />
        <span className="text-xs font-bold text-zinc-300 uppercase tracking-wide">Fix Workflow</span>
      </motion.div>

      {/* Steps */}
      <div className="space-y-3">
        {workflow.steps.map((step, index) => (
          <motion.div
            key={step.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`bg-zinc-900/30 border rounded-lg p-3 ${getStepColor(step.status)}`}
          >
            {/* Step header */}
            <div className="flex items-start gap-3 mb-2">
              {getStepIcon(runningStep === step.id ? 'running' : step.status)}
              <div className="flex-1 min-w-0">
                <div className="text-xs font-bold text-zinc-200 mb-0.5">
                  Step {index + 1}: {step.title}
                </div>
                <div className="text-[11px] text-zinc-500">
                  {step.details}
                </div>
              </div>
            </div>

            {/* Results */}
            {step.results && step.results.length > 0 && (
              <div className="mt-3 pl-7 space-y-1">
                {step.results.map((result, i) => (
                  <div
                    key={i}
                    className={`text-[11px] leading-relaxed ${
                      result.startsWith('✅') ? 'text-green-400' :
                      result.startsWith('⚠️') || result.startsWith('🔴') ? 'text-amber-400' :
                      result === '' ? '' :
                      'text-zinc-400'
                    }`}
                  >
                    {result}
                  </div>
                ))}
              </div>
            )}

            {/* Action button */}
            {step.action && step.status === 'pending' && (
              <div className="mt-3 pl-7">
                <button
                  onClick={() => handleAction(step.id)}
                  disabled={runningStep !== null}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 border border-blue-500/30 text-xs font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {step.action === 'apply' ? 'Apply Fix' : 'Send Notification'}
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Summary actions */}
      {workflow.steps.every(s => s.status === 'completed') && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-green-500/10 border border-green-500/30 rounded-lg p-4 space-y-3"
        >
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-green-400" />
            <span className="text-xs font-bold text-green-400">All Steps Completed</span>
          </div>
          <div className="text-[11px] text-zinc-400">
            Fix has been verified and applied. Customer issue resolved.
          </div>
          <div className="flex gap-2">
            <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-400 border border-zinc-800 text-xs font-medium transition-colors">
              <FileText className="w-3 h-3" />
              Export Report
            </button>
            <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 border border-blue-500/30 text-xs font-medium transition-colors">
              <Send className="w-3 h-3" />
              Notify Customer
            </button>
          </div>
        </motion.div>
      )}
    </div>
  )
}
