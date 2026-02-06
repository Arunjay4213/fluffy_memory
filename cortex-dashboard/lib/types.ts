export interface Memory {
  id: string
  text: string
  timestamp: Date
  tier: 'hot' | 'warm' | 'cold'
  criticality: number
  retrievalCount: number
  lastRetrieved?: Date
  metadata: Record<string, any>
}

export interface AttributionScore {
  memoryId: string
  memoryText: string
  shapleyValue: number
  confidence: number
  modelType: string
}

export interface QueryAttribution {
  queryId: string
  query: string
  response: string
  timestamp: Date
  attributions: AttributionScore[]
  mode: 'amortized' | 'exact'
  computeTime: number
}

export interface Contradiction {
  id: string
  memory1: Memory
  memory2: Memory
  type: 'logical' | 'temporal_update' | 'concurrent_conflict' | 'ambiguous'
  confidence: number
  detectedAt: Date
  resolved: boolean
}

export interface HealthMetric {
  timestamp: Date
  contradictionRate: number
  retrievalEfficiency: number
  semanticDrift: number
  memoryQuality: number
}

export interface DeletionRequest {
  id: string
  memoryId: string
  derivedArtifacts: string[]
  status: 'pending' | 'grace_period' | 'completed'
  requestedAt: Date
  deletionDate: Date
}

export interface ProvenanceNode {
  id: string
  type: 'memory' | 'summary' | 'cluster' | 'output'
  text: string
  children: string[]
  createdAt: Date
}
