# CortexOS: SWE Debugging Workflow

## 🎯 What Problem Does This Solve?

**You're on-call. A customer reports: "Your AI gave me the wrong answer."**

With traditional memory systems (Mem0/Zep/EverMem):
- ❌ Can't see which memories were used for that specific query
- ❌ Can't understand why the AI chose the wrong memory
- ❌ Can't test fixes before applying them
- ❌ Can't measure revenue impact of the issue
- ❌ Can't prove to the customer it's fixed

**With CortexOS:**
- ✅ Click the customer issue → See exact memories used
- ✅ See why wrong memory was retrieved (stale data? contradiction? weighting?)
- ✅ Test fix on 50 historical queries instantly
- ✅ See "$450K ARR at risk" before applying changes
- ✅ Export proof that issue is resolved

---

## 🚀 The Interface

Visit: **http://localhost:3000**

###3-Panel Layout (Like Chrome DevTools for AI Memory)

```
┌────────────────────────────────────────────────────────────────────┐
│ CortexOS - Customer Debugging Console                              │
│ [5 open issues] [$3.8M ARR at risk] [3 Enterprise customers]      │
└────────────────────────────────────────────────────────────────────┘
┌──────────────┬─────────────────────────────┬───────────────────────┐
│              │                             │                        │
│  CUSTOMER    │    MEMORY IMPACT ANALYSIS    │    FIX & VERIFY       │
│  ISSUES      │                             │                        │
│              │                             │                        │
│ [Search]     │  Selected: mem_intercom_001 │  Step 1: Test         │
│              │                             │  ✅ 48/50 queries OK  │
│ 🔴 ACME Corp │  Used by 247 queries        │                        │
│ Enterprise   │  89 customers affected      │  Step 2: Review       │
│ Stale pricing│                             │  ⚠️ 2 edge cases      │
│ $450K risk   │  If archived:               │                        │
│              │  ├─ ✅ 0 break              │  Step 3: Apply        │
│ 🟠 user_8291 │  ├─ ✅ 247 improve          │  [Apply Fix]          │
│ SMB          │  └─ $920K ARR at risk       │                        │
│ Location     │                             │  Step 4: Notify       │
│              │  [Test on Sample]           │  [Send to CS]         │
│              │  [Apply Fix]                │                        │
└──────────────┴─────────────────────────────┴───────────────────────┘
│ > search customer:acme_corp mem:stale           [archive] [boost]  │
└────────────────────────────────────────────────────────────────────┘
```

---

## 📋 Real SWE Workflow

### Scenario: Intercom Support Bot Serving Stale Pricing

**7:23 AM - Slack message from CS team:**
> "ACME Corp (enterprise, $450K ARR) asking about pricing - bot told them $499/month but we changed to tiered $199-$799 in January. They're confused and considering churn."

### Step 1: Find the Issue (Left Panel - Customer Issues)

1. Open CortexOS: `http://localhost:3000`
2. See list of customer issues, filter by `Enterprise`
3. Click: **"ACME Corp - Stale pricing data"**

**What you see:**
```
[ACME Corp (Enterprise)]
Query: "What does your Enterprise plan include?"
Problem: Served 6-month-old stale pricing data
Wrong memory: mem_intercom_001 (OLD: $499/month)
Correct memory: mem_intercom_002 (NEW: Tiered $199-$799)
Impact: $450K ARR customer confused, risk churn
Status: OPEN
```

### Step 2: Analyze Impact (Center Panel - Memory Impact Analysis)

**Automatically loads when you click the issue.**

**What you see:**
```
Memory: mem_intercom_001
"Enterprise plan includes API access, premium support, unlimited seats - $499/month"

Criticality: 75%
Tier: WARM (stale, not retrieved recently)

Usage (Last 30 Days):
├─ 247 total queries
├─ 89 unique customers

Customer Breakdown:
ENTERPRISE (3):
  • ACME Corp ($450K ARR)
  • TechCo ($280K ARR)
  • StartupXYZ ($190K ARR)
SMB: 67 customers
Free: 19 users

Revenue Impact: $920K ARR at risk

If You Change This Memory:
├─ Would break: 0 queries
├─ Would improve: 247 queries (will use new pricing instead)
└─ Dependencies: mem_intercom_002 (new pricing)

Recommended Action: ARCHIVE
Reason: Stale pricing causing customer confusion. New pricing exists (mem_intercom_002). Safe to archive.

[Test on Sample] [Apply Fix]
```

**Key insights for you as an SWE:**
- Not just ACME - 89 customers affected!
- $920K ARR at risk (not just $450K)
- Safe to archive (0 queries will break)
- New pricing memory already exists

### Step 3: Test the Fix (Right Panel - Fix & Verify)

**Automatically starts when you click "Test on Sample" in center panel.**

**What you see:**
```
Step 1: Test on Historical Queries ✅ COMPLETED
Testing archive of mem_intercom_001 on last 50 ACME Corp queries...

Results:
✅ 48/50 queries now use NEW pricing (mem_intercom_002)
✅ Response changes: "$499" → "$199-$799 tiered"
⚠️ 2 edge cases detected

Step 2: Review Edge Cases ⚠️ NEEDS ATTENTION
Found 2 queries that need attention:

Query: "When did Enterprise pricing change?"
  → No timeline in mem_intercom_002
  Suggested fix: Add "Pricing updated Jan 2024" to mem_intercom_002

Query: "What was old pricing?"
  → Now returns nothing
  Suggested fix: Keep mem_intercom_001 but add [DEPRECATED] tag

Step 3: Apply & Monitor [PENDING]
Ready to apply fix to production
[Apply Fix]

Step 4: Notify Stakeholders [PENDING]
Alert Customer Success team about fix
[Send Notification]
```

**Key workflow for you:**
1. System tested on 50 real queries automatically
2. Found edge cases you wouldn't have thought of
3. Suggests fixes for edge cases
4. Shows exact before/after output changes

### Step 4: Apply the Fix

Click **[Apply Fix]** in Step 3.

**What happens:**
1. Archives `mem_intercom_001` (adds `[DEPRECATED Jan 2024]` tag)
2. Boosts `mem_intercom_002` criticality to 0.95
3. Updates `mem_intercom_002` with timeline: "Pricing updated Jan 2024"
4. Runs verification test on 100 random queries
5. Shows confirmation: "✅ All steps completed. Fix verified."

### Step 5: Notify Customer Success

Click **[Send Notification]** in Step 4.

**Auto-generates message:**
```
To: customer-success@company.com
Subject: [RESOLVED] ACME Corp Pricing Issue

Issue: ACME Corp and 88 other customers received outdated pricing information ($499 old pricing instead of new $199-$799 tiered pricing)

Root Cause: Stale memory (mem_intercom_001) from Aug 2023 was being retrieved instead of current pricing (mem_intercom_002 from Jan 2024)

Fix Applied:
- Archived outdated pricing memory
- Boosted current pricing criticality to 0.95
- Added timeline context: "Pricing updated Jan 2024"

Verification:
- Tested on 50 historical ACME Corp queries: 48/50 now correct
- 2 edge cases handled (pricing history queries)
- 247 affected queries now returning correct information

Revenue Impact Prevented: $920K ARR at risk

Action for CS:
- ACME Corp: "We've fixed the pricing issue. Our system now shows the correct $199-$799 tiered pricing. Apologies for the confusion."
- Proactive outreach to other 88 affected customers recommended

CortexOS Report: [Export full incident report]
```

### Step 6: Verify with Customer

**7:45 AM - Slack to CS team:**
> "Fixed. Old pricing archived, 247 queries now correct. Tested on 50 ACME queries - 48/50 work perfectly. 2 edge cases about pricing history handled. Safe to tell ACME it's resolved. Also found 88 other customers affected - see attached list for proactive outreach."

**Time to resolution: 22 minutes** (from Slack alert to customer notification)

---

## 🔑 Key Features for SWEs

### 1. **Customer-Centric Search**

Search bar understands:
```bash
customer:acme_corp           # Find all issues for ACME
mem:mem_intercom_001         # Find all queries using this memory
status:open enterprise       # Open issues from enterprise customers
$arr >100K                   # Issues affecting >$100K ARR
```

### 2. **Revenue Impact Always Visible**

Every issue shows:
- ARR at risk (per customer and total)
- Customer tier (Enterprise/SMB/Free)
- Number of affected customers
- Breakdown by tier

**Why this matters:** You can prioritize fixes by business impact, not just technical severity.

### 3. **Test Before Apply**

Never apply fixes blind:
- Test on 50-100 historical queries instantly
- See exact before/after output changes
- System detects edge cases you'd miss
- Confidence score for each test

**Why this matters:** Avoid breaking 1000 queries to fix 100.

### 4. **Automated Root Cause Analysis**

When you select an issue, system shows:
- Which memory was used (and why)
- Which memory SHOULD have been used
- Why the wrong one was chosen:
  - Stale data (last retrieved 6 months ago)
  - Contradiction (conflicting memories)
  - Temporal supersession (permanent vs temporary)
  - Weighting issue (old memory scored higher)

**Why this matters:** You don't need to manually dig through attribution logs.

### 5. **One-Click Actions**

After analysis, system recommends:
- **Archive** (stale data, replaced by newer memory)
- **Boost** (safety-critical, should always be retrieved)
- **Merge** (contradictory memories need synthesis)
- **Update** (add context/tags without deleting)

**Why this matters:** Fixes are standardized, tested, and reversible.

---

## 💡 Real-World Scenarios

### Scenario 1: Legal Brief with Contradictory Precedents (Harvey AI)

**Problem:** AI cited both "broad discovery allowed" and "discovery limits apply" in same brief.

**CortexOS Workflow:**
1. See issue: "Used contradictory precedents - $2M malpractice risk"
2. Impact analysis: Both memories used in 34 queries (12 legal briefs)
3. Root cause: Ross v. Jenkins (federal) vs State Bar Opinion (state) - not actually contradictory!
4. Fix: Add jurisdictional context to both memories
5. Test: 32/34 queries now show proper context
6. Apply: Update memories with "[FEDERAL]" and "[STATE]" tags
7. Notify: Email partner about detection + fix

**Result:** Prevented malpractice claim, improved future brief quality.

### Scenario 2: Code Generation Breaking Builds (Replit)

**Problem:** Generated React class components for React 18 hooks-only project.

**CortexOS Workflow:**
1. See issue: "147 generated components broke builds"
2. Impact analysis: Historical preference (classes) vs current project (hooks)
3. Root cause: Old preference memory (criticality 0.45) overriding project config (0.90)
4. Fix recommendation: Archive old preference, boost project config
5. Test: 94/100 queries now generate hooks (6 explicitly asked for classes - correct!)
6. Apply: Archive mem_replit_001, boost mem_replit_002 to 0.95
7. Verify: 0 build failures in next 100 code generations

**Result:** 94% reduction in build-breaking code, customer notified within 30 minutes.

### Scenario 3: Location Recommendations Wrong (Perplexity AI)

**Problem:** User in London getting NYC pizza recommendations.

**CortexOS Workflow:**
1. See issue: "Temporal location conflict"
2. Impact analysis: Permanent address (NYC, 823 queries) vs temporary (London, 156 queries)
3. Root cause: Permanent address weighted higher (87%) than temporary location
4. Fix recommendation: Temporal supersession rule (temporary > permanent for "near me")
5. Test: 98/100 queries now use London correctly (2 asked for "home address" - correctly show NYC)
6. Apply: Enable temporal supersession rule for all location queries
7. Monitor: Location accuracy 94% → 99.2%

**Result:** User issue resolved, improved for all future travelers.

---

## 📊 Metrics Dashboard (Top Bar)

```
[5 open issues] - Requires immediate attention
[$3.8M ARR at risk] - Total revenue exposure across all issues
[3 Enterprise customers] - High-priority accounts affected
```

Click any metric to filter issues.

---

## ⌨️ Keyboard Shortcuts

- `⌘K` - Focus command bar
- `⌘F` - Search issues
- `⌘1` - Jump to Customer Issues panel
- `⌘2` - Jump to Memory Impact Analysis
- `⌘3` - Jump to Fix & Verify
- `Esc` - Clear selection

---

## 🎯 When to Use CortexOS vs. Traditional Tools

**Use CortexOS when:**
- Customer reports "wrong answer" from AI
- Need to debug specific query attribution
- Want to test memory changes before applying
- Need to measure revenue impact of memory issues
- Want automated root cause analysis
- Need to prove to customer that issue is fixed

**Use traditional memory DB tools when:**
- Bulk operations on millions of memories
- Direct SQL/vector queries
- Building new features (not debugging)
- Performance benchmarking

**CortexOS complements (doesn't replace) your memory system.**

---

## 🚨 Production Debugging Cheat Sheet

### "Customer says AI gave wrong answer"
```bash
1. Search customer name in left panel
2. Click their issue
3. Read "Wrong memory" vs "Correct memory" in issue details
4. Check impact analysis (center panel) - see revenue at risk
5. Click "Test on Sample" - verify fix works
6. Review edge cases
7. Click "Apply Fix"
8. Export incident report
9. Notify customer
```

**Time: 15-30 minutes** (vs 2-4 hours manual debugging)

### "Multiple customers reporting similar issues"
```bash
1. Search by memory ID or problem pattern
2. Sort by "ARR at risk" (highest first)
3. Fix enterprise customers first
4. Apply same fix to all affected memories
5. Bulk notify customers via CS team
```

### "Need to prove fix to customer"
```bash
1. After applying fix, click "Export Report"
2. Report shows:
   - Root cause analysis
   - Before/after output samples
   - Test results (48/50 queries fixed)
   - Verification on their specific queries
3. Send to customer via CS team
```

---

## 🏗️ Technical Architecture

**Frontend:** Next.js 16 + TypeScript + Tailwind CSS
**State Management:** React hooks (no Redux bloat)
**Real-time:** WebSocket integration ready (currently simulated)
**Data:** Connects to your existing memory system via API

**Integration points:**
- `/api/issues` - Fetch customer issues in real-time
- `/api/memory/{id}/impact` - Analyze memory usage and impact
- `/api/memory/{id}/test` - Test changes on historical queries
- `/api/memory/{id}/apply` - Apply fixes with rollback support

---

## 🎓 Training for Your Team

**For SWEs:**
- "This is Chrome DevTools for AI memory"
- Focus on: Search → Analyze → Test → Apply workflow
- Emphasize revenue impact visibility

**For Customer Success:**
- "This shows you which customers are affected before they complain"
- Focus on: Proactive monitoring, automated notifications
- Emphasize: faster resolution = less churn

**For Product/Leadership:**
- "This prevents million-dollar mistakes before they happen"
- Focus on: Revenue risk metrics, incident reports
- Emphasize: measurable ROI (prevented $2M malpractice, $1.2M churn)

---

## 📈 Success Metrics

**Before CortexOS:**
- 2-4 hours per customer issue
- Manual query debugging
- No revenue impact visibility
- Fixes applied blind (hope it works)
- Can't prove to customer it's fixed

**After CortexOS:**
- 15-30 minutes per issue
- Automated root cause analysis
- "$450K ARR at risk" visible instantly
- Test on 50 queries before applying
- Export full incident report for customer

**ROI:** If prevents just 1 enterprise churn ($450K ARR) per year, pays for itself 10x over.

---

## 🚀 Get Started

```bash
npm install
npm run dev
```

**Open:** http://localhost:3000

**First steps:**
1. Click any customer issue in left panel
2. Explore the impact analysis (center)
3. Click "Test on Sample" (right)
4. See the workflow in action

**No configuration needed** - works with existing mock data to demonstrate workflow.

---

## 🤝 Feedback

Built by SWEs, for SWEs debugging production AI systems.

If this doesn't solve your actual debugging workflow, please tell us:
- What's missing?
- What would make this 10x better for you?
- What do you use today that we should replace?

GitHub: https://github.com/anthropics/claude-code/issues

---

**CortexOS: Stop debugging memory systems. Start fixing customer issues.**

Time from "customer complaint" to "verified resolution": **< 30 minutes**
