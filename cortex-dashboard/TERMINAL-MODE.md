# CortexOS Terminal - Bloomberg for AI Memory

## 🎯 The Vision

**"CortexOS is the Visor for your Agent's brain. Without us, your memory system is a black box database. With us, it's a transparent, navigable, and editable map of human context."**

This is **Mission Control for AI Memory** - a Bloomberg Terminal-style interface for AI operators, safety engineers, and developers debugging agent behavior.

## 🚀 Access Terminal Mode

Visit: **http://localhost:3000/terminal**

Or click the **"TERMINAL MODE"** button in the main dashboard header.

## 📊 Three-Panel Bloomberg Layout

### Left Panel: **The Live Tape** (Real-Time Event Stream)
Just like a stock ticker, but for cognitive steps.

**Features:**
- **Streaming feed** of every agent interaction across your fleet
- **Color-coded events:**
  - 🔴 CRITICAL - Contradictions, safety risks, hallucinations
  - 🟠 WARNING - Quality degradation, drift detection
  - 🔵 INFO - Normal queries, model retraining
  - 🟢 SUCCESS - Successful operations

- **The "Why" Column:**
  - Hover over a response to see attribution
  - Click to highlight memories in the graph
  - See Shapley values instantly
  - Latency tracking per query

- **Real-time updates** when LIVE mode enabled
- **Virtual scrolling** for performance (handles 100K+ events)
- **Click any event** to jump to related memory in graph

**Example Events:**
```
[INFO] 10:30:42 - Help me write Python code
       Attribution: 73% mem_002 (Python pref)
       Memories: mem_002, mem_006
       Latency: 8ms

[CRITICAL] 18:45:13 - CONTRADICTION DETECTED
           vegan vs. loves steak
           Memories: mem_old_001, mem_new_001
```

### Center Panel: **Memory Graph Explorer** (Deep Forensics)
Visual representation of the user's mind.

**Features:**
- **Interactive graph visualization** using ReactFlow
- **Node colors** indicate tier:
  - 🔴 Hot Tier (red) - Retrieved in last 30 days
  - 🟠 Warm Tier (amber) - 30-180 days
  - 🔵 Cold Tier (blue) - 180+ days

- **Node details:**
  - Memory text
  - Criticality score (0-1 bar)
  - Retrieval count
  - Safety indicators (🛡️ for critical memories)
  - Contradiction flags (⚠️)

- **Edge types:**
  - Solid lines - Frequent co-retrieval
  - Dashed red lines - Contradictions
  - Animated lines - Active relationships

- **Interactive controls:**
  - Zoom, pan, drag nodes
  - Click node to see provenance
  - Right-click for actions (merge, delete, boost)
  - Mini-map for navigation

**The Inspector (Coming Soon):**
- Click a node to see full provenance
- "If you delete this node, 142 future queries will change"
- Impact analysis before deletion
- Edit memory text inline

### Right Panel: **Alert Stream & War Room** (Intervention)
Where you fix things when they go wrong.

**Critical Alerts:**
1. **CONTRADICTION DETECTED**
   - Shows conflicting memories
   - Actions: Merge, Delete Newer, Flag

2. **SAFETY RISK**
   - Critical memory not retrieved
   - Actions: Vaccinate, Boost Criticality

3. **HALLUCINATION DETECTED**
   - Response cited non-existent memory
   - Actions: Vaccinate, Review

**Warning Alerts:**
4. **Memory Quality Degraded**
   - Semantic drift detection
   - Action: Retrain Model

5. **GDPR Deletion Pending**
   - Grace period countdown
   - Actions: Cancel, Execute Now

**The Surgeon's Tools:**
- **Merge:** Drag two contradictory nodes together
- **Rewrite:** Manually edit corrupted memory
- **Vaccinate:** Create negative rule to prevent hallucination
- **Boost Criticality:** Permanently protect memory
- **Delete:** Full cascading deletion with impact analysis

## ⌨️ Command Bar (Bottom)

Bloomberg-style command line for power users.

**Quick Commands:**
```
search mem:peanut          - Search memories
delete mem_005             - Delete memory
merge mem_001 mem_002      - Merge contradictions
boost criticality mem_001  - Increase criticality
vaccinate "hallucination"  - Create prevention rule
retrain attribution        - Trigger model retrain
```

**Keyboard Shortcuts:**
- `⌘K` - Focus command bar
- `⌘P` - Pause/Resume live feed
- `⌘F` - Search in graph
- `⌘/` - Show command help

## 📈 Quick Stats Bar (Top)

High-density metrics updated in real-time:

| Metric | Description | Color Coding |
|--------|-------------|--------------|
| **MEM** | Total memories (1.2M) | Green = growing |
| **HOT** | Hot tier count (45K) | Trend indicator |
| **LAT** | Avg latency (8ms) | Green = improving |
| **LDS** | Model confidence (0.89) | Green >0.8, Red <0.7 |
| **QUAL** | Memory quality (94%) | Health indicator |

## 🎨 Visual Language

### Color Coding
- **Red** (#ef4444) - Critical, Hot Tier, Danger
- **Amber** (#f59e0b) - Warning, Warm Tier, Caution
- **Blue** (#3b82f6) - Info, Cold Tier, Attribution
- **Green** (#10b981) - Success, Health, Growing
- **Purple** (#8b5cf6) - Compliance, Terminal Mode

### Typography
- **Mono font** for all data (terminal aesthetic)
- **Condensed sizing** for high information density
- **Bold for metrics** that need attention
- **Color for semantic meaning** (not decoration)

### Animations
- **Pulse** on live indicator when active
- **Slide-in** for new events in tape
- **Scale-up** on node creation in graph
- **Border pulse** on critical alerts

## 🔄 Live Mode vs. Paused

**LIVE Mode (Default):**
- Events stream automatically every 3 seconds
- Graph updates in real-time
- Alerts appear instantly
- Auto-scroll to latest events

**PAUSED Mode:**
- Freeze current state for analysis
- Deep-dive investigation
- Compare historical states
- Export snapshots

Toggle with **PAUSE/RESUME** button or `⌘P`.

## 🎯 Use Cases

### 1. **Real-Time Debugging**
```
User reports: "Agent ordered food with peanuts despite allergy"

Terminal Workflow:
1. Search "peanut" in command bar
2. See mem_001 (peanut allergy) highlighted in graph
3. Check Live Tape for recent dinner queries
4. Find query q_002 missing mem_001 in attribution
5. Click "Vaccinate" to prevent future misses
6. Boost criticality of mem_001 to 1.0
```

### 2. **Contradiction Resolution**
```
Alert: "vegan vs. loves steak"

Terminal Workflow:
1. Click alert in Alert Stream
2. See both memories highlighted in graph
3. Review timestamps (6 months apart)
4. Click "Merge" action
5. System suggests: "Previously vegan, now eats meat"
6. Approve merge, old memory archived
```

### 3. **Safety Monitoring**
```
Alert: "Safety risk - allergy not retrieved"

Terminal Workflow:
1. Review attribution in Live Tape
2. See Shapley value of mem_001 was 0% (should be >90%)
3. Check graph - mem_001 is isolated (no edges)
4. Action: Add explicit link to "dinner" topic cluster
5. Vaccinate: "Always retrieve allergy info for food queries"
6. Verify: Run test query, see 91% attribution
```

### 4. **Model Quality Analysis**
```
Warning: "Memory quality degraded - 12% drift"

Terminal Workflow:
1. Check Quick Stats - QUAL dropping from 94% → 88%
2. Open graph, color nodes by last-modified
3. See cluster of recent memories (blue) disconnected
4. Action: "Retrain attribution" command
5. Monitor Live Tape for LDS improvement
6. Verify: LDS 0.85 → 0.89 after retrain
```

## 🆚 vs. Mem0/Zep/EverMem Dashboards

| Feature | Mem0/Zep | CortexOS Terminal |
|---------|----------|-------------------|
| **View** | Memory list | Interactive graph + live feed |
| **Real-time** | Polling | WebSocket streaming |
| **Attribution** | None | Shapley values per query |
| **Intervention** | Delete only | Merge, Vaccinate, Boost, Edit |
| **Contradiction** | Not detected | Real-time detection + resolution |
| **Provenance** | None | Full deletion impact analysis |
| **Commands** | UI only | Command bar + keyboard shortcuts |
| **Density** | Consumer UI | Bloomberg-style operator terminal |

**The Key Difference:**
- Mem0/Zep are **databases with a UI**
- CortexOS is a **cognitive debugger and mission control**

## 🚀 What Makes This "Bloomberg"

### 1. **High Information Density**
- 3-panel layout maximizes screen real estate
- Every pixel conveys meaning
- No wasted space on decoration
- Condensed typography

### 2. **Real-Time Streaming**
- Live tape updates continuously
- Alerts appear instantly
- Graph animates changes
- No refresh needed

### 3. **Multi-Dimensional View**
- Time (Live Tape)
- Space (Memory Graph)
- Alerts (Actionable stream)
- All synchronized

### 4. **Power User Tools**
- Command bar for speed
- Keyboard shortcuts
- Quick actions everywhere
- Batch operations

### 5. **Professional Aesthetics**
- Terminal-inspired colors
- Monospace typography
- Color coding for meaning
- No consumer fluff

## 📊 Performance

- **Virtual scrolling** handles 100K+ events
- **Graph rendering** optimized with ReactFlow
- **Real-time updates** via efficient state management
- **Lazy loading** for memory details
- **Debounced search** in command bar

## 🎓 Learning Curve

**For Traders/Operators:**
- Feels immediately familiar if you've used Bloomberg
- Same muscle memory (keyboard shortcuts)
- Same information density
- Same multi-panel workflow

**For Developers:**
- Terminal mode = production debugging tool
- Like Chrome DevTools but for AI memory
- View console (Live Tape) + Network (Graph) + Sources (Alerts)

**For Safety Engineers:**
- Real-time monitoring dashboard
- Instant intervention capabilities
- Audit trail in command history
- Impact analysis before actions

## 🔮 Roadmap

**V2 Features:**
- [ ] Diff view - "Without Memory X, output would be..."
- [ ] Time-travel - Replay past states
- [ ] Multi-user collaboration
- [ ] Custom alert rules
- [ ] API integration for automation
- [ ] Export to Jupyter notebooks
- [ ] Slack/PagerDuty integrations

---

**The result:** Not a dashboard. A **Mission Control Center** for AI memory operations.

Bloomberg didn't just show stock prices. They gave traders a **competitive advantage through superior UX**.

CortexOS Terminal doesn't just show memories. It gives AI operators **x-ray vision into agent cognition**.
