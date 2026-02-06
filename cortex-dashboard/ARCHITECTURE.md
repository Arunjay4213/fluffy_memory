# CortexOS Architecture Implementation

This dashboard is a visual representation of your complete PitchesNex architecture.

## System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│  ANY MEMORY SYSTEM (Mem0 | Zep | EverMemOS | Custom)       │
│                                                              │
│  memory.add() ──→ [WRITE-TIME HOOK]                         │
│                      ├─ Temporal contradiction check (56ms)  │
│                      ├─ Criticality scoring (10ms)           │
│                      └─ Tier assignment (1ms)                │
│                                                              │
│  memory.search() ──→ [RETRIEVAL HOOK]                       │
│                        ├─ Mode 1: Pass-through (0ms added)  │
│                        └─ Mode 2: Pre-check (20ms added)    │
└─────────────────────────────────────────────────────────────┘
                              ↓
              (Async in Mode 1 | Sync in Mode 2)
                              ↓
┌─────────────────────────────────────────────────────────────┐
│              CORTEXOS INTELLIGENCE LAYER                    │
│                                                              │
│  Engine 1: Attribution (Amortized Shapley)                  │
│     • Per-deployment trained model                           │
│     • LDS confidence monitoring (retrain if <0.80)          │
│     • Tiered: amortized (default) + exact (on-demand)       │
│     • Model-family adapter heads                             │
│     • <10ms amortized, ~5s exact (async)                    │
│                                                              │
│  Engine 2: Health Monitor                                    │
│     • Write-time contradiction detection (not batch scan)   │
│     • Temporal relation classification                       │
│     • Retrieval efficiency (from attribution scores)        │
│     • Semantic drift (Wasserstein on embedding dist.)       │
│     • Criticality-weighted quality metrics                   │
│                                                              │
│  Engine 3: Memory Lifecycle                                  │
│     • Three-tier storage (hot/warm/cold)                    │
│     • Criticality guards (safety memories never archived)   │
│     • GDPR cascading deletion with provenance tracing       │
│     • Rate-distortion optimal sizing (with criticality      │
│       constraints)                                           │
│                                                              │
│  Engine 4: Compliance                                        │
│     • Provenance graph (memory → summary → cluster → output)│
│     • Deletion certificates                                  │
│     • Audit trail for every memory operation                 │
│     • Soft hallucination firewall (system prompt injection)  │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│           DASHBOARD + API + SDK                             │
│  • Real-time attribution visualization                      │
│  • Health metrics over time                                  │
│  • Contradiction alerts (with temporal context)              │
│  • Memory tier management                                    │
│  • GDPR compliance reports                                   │
│  • "Explain this response" debugger (triggers exact          │
│    ContextCite on demand)                                    │
└─────────────────────────────────────────────────────────────┘
```

## Dashboard Components Map

### Attribution Engine (`/components/AttributionEngine.tsx`)
**Demonstrates:**
- Query attribution list with Shapley values
- Amortized vs. Exact mode toggle
- LDS confidence: 0.89
- Compute time comparison (8ms amortized vs. 4823ms exact)
- Per-memory attribution breakdown
- Confidence scores per attribution

**Key Features from Pitch:**
- ✅ Tiered attribution (amortized default, exact on-demand)
- ✅ Model-specific predictions (shows model_id)
- ✅ <10ms latency for amortized mode
- ✅ "Run Exact ContextCite" button for on-demand ground truth

### Health Monitor (`/components/HealthMonitor.tsx`)
**Demonstrates:**
- Time-series metrics visualization
- Current health status (contradiction rate, retrieval efficiency, semantic drift, memory quality)
- Contradiction detection with type classification
- Temporal vs. logical contradiction distinction

**Key Features from Pitch:**
- ✅ Write-time contradiction checks (not O(N²) batch)
- ✅ Temporal relation classifier (temporal_update, logical, concurrent_conflict)
- ✅ Visual metrics over time showing quality improvement
- ✅ Resolve as Update / Mark as Conflict actions

### Memory Lifecycle (`/components/MemoryLifecycle.tsx`)
**Demonstrates:**
- Three-tier visualization (Hot/Warm/Cold)
- Tier distribution percentages
- Criticality scoring per memory
- Protected memory badges for criticality ≥0.7
- Retrieval count and last retrieved date

**Key Features from Pitch:**
- ✅ Hot tier: Retrieved in last 30 days (in-memory)
- ✅ Warm tier: 30-180 days (disk-backed)
- ✅ Cold tier: 180+ days (excluded from default retrieval)
- ✅ Criticality guards (peanut allergy = 0.95, permanently protected)
- ✅ No auto-deletion (only user-initiated GDPR)

### Compliance Audit (`/components/ComplianceAudit.tsx`)
**Demonstrates:**
- GDPR deletion request tracking
- Grace period countdown
- Provenance graph visualization
- Derived artifacts list (summaries, clusters, outputs)
- Compliance certificate preview

**Key Features from Pitch:**
- ✅ 30-day grace period for all deletions
- ✅ Cascading deletion with provenance tracing
- ✅ Shows exactly which artifacts will be deleted
- ✅ Compliance certificate generation
- ✅ Immediate action: removed from retrieval index

## Red Team Rebuttal Implementation

### Critique 1: Attribution Economics (64x Cost)
**Dashboard Shows:**
- Amortized mode compute time: 8ms
- Exact mode compute time: 4823ms
- Toggle between modes
- Cost implication: 99% queries use amortized (free), 1% trigger exact

**UI Evidence:** Attribution Engine tab, mode toggle buttons

### Critique 2: Amortized Model Drift
**Dashboard Shows:**
- LDS Confidence: 0.89 displayed in footer
- Per-query confidence scores shown
- Model type shown in attribution breakdown (GPT-4)

**UI Evidence:** Footer metrics, attribution cards show confidence

### Critique 3: Safe Pruning (Peanut Allergy Problem)
**Dashboard Shows:**
- Peanut allergy memory: criticality 0.95, tier Hot, "Protected" badge
- Dark mode preference: criticality 0.1, tier Cold, no protection
- Visual criticality bars color-coded (red ≥0.7, amber ≥0.4, green <0.4)

**UI Evidence:** Memory Lifecycle tab, criticality bars and shields

### Critique 4: Integration Wrapper Nightmare
**Dashboard Shows:**
- Header indicator: "Mode: Async" (Mode 1 deployment)
- Footer latency: 8ms (amortized attribution)
- No user-facing latency added in async mode

**UI Evidence:** Header status indicator, footer metrics

### Critique 5: O(N²) Contradiction Scaling + Temporal NLI
**Dashboard Shows:**
- Contradiction type badges (temporal_update, logical, concurrent_conflict)
- NYC → London: labeled "temporal_update", resolved
- Vegan → Steak: labeled "logical", unresolved

**UI Evidence:** Health Monitor tab, contradiction cards

## Data Flow in Dashboard

1. **User views dashboard** → Mode 1 (Async) indicator shown in header
2. **Query attribution displayed** → Shows which memories influenced response
3. **Health metrics updated** → Contradiction detection runs write-time
4. **Memory tiers visualized** → Hot/Warm/Cold distribution
5. **GDPR request tracked** → Grace period countdown and provenance graph

## Visual Design Principles

### Color-Coded Engines
- **Blue (#3b82f6)**: Attribution Engine - data/causality focused
- **Green (#10b981)**: Health Monitor - quality/status focused
- **Amber (#f59e0b)**: Memory Lifecycle - storage/archival focused
- **Purple (#8b5cf6)**: Compliance - security/legal focused

### Typography Hierarchy
- **Outfit**: Headings and UI labels (geometric, modern)
- **JetBrains Mono**: Data, IDs, metrics (technical, monospace)

### Micro-Interactions
- Slide-in animations with staggered delays (50ms intervals)
- Pulse glow on "Live" indicator
- Hover state transitions on cards
- Progress bars with gradient fills
- Color-coded glow effects on tier badges

### Data Visualization
- Time-series line charts (Recharts)
- Progress bars for Shapley values
- Criticality score bars with color coding
- Tier distribution visualizations
- Provenance tree graph

## Mock Data Scenarios

### Scenario 1: Attribution for Code Request
**Query:** "Help me write code for the attribution engine"
**Top Memory:** "User prefers Python" (73% Shapley)
**Second Memory:** "Working on CortexOS project" (65% Shapley)
**Mode:** Amortized (8ms)
**Demonstrates:** Code preference being used for language selection

### Scenario 2: Safety-Critical Attribution
**Query:** "Order me dinner"
**Top Memory:** "Severe peanut allergy" (91% Shapley)
**Second Memory:** "Currently in London" (82% Shapley)
**Mode:** Exact (4823ms - safety-critical triggered)
**Demonstrates:** High-criticality memory protection in action

### Scenario 3: Temporal Contradiction
**Memory 1:** "User is in New York City" (Jan 10)
**Memory 2:** "User is in London for business" (Feb 1)
**Type:** temporal_update
**Status:** Resolved
**Demonstrates:** System correctly identifies location change as update, not conflict

### Scenario 4: Logical Contradiction
**Memory 1:** "User is vegan" (Jan 1)
**Memory 2:** "User loves steak" (Feb 3)
**Type:** logical
**Status:** Unresolved (flagged for review)
**Demonstrates:** True contradiction requiring human resolution

### Scenario 5: GDPR Deletion
**Memory:** "User prefers dark mode" (criticality 0.1)
**Derived:** 3 artifacts (summary_12, cluster_3, output_456)
**Status:** Grace period (13 days remaining)
**Demonstrates:** Cascading deletion with provenance tracking

## Implementation Notes

All data is currently mocked but structured to match real API responses. To connect to production:

1. Replace `mockMemories` with API calls to memory system
2. Replace `mockAttributions` with WebSocket stream from attribution engine
3. Replace `mockHealthMetrics` with time-series database queries
4. Replace `mockDeletionRequests` with compliance database

The component structure is designed for easy swap from mock to real data.
