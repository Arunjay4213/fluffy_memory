import { Memory, QueryAttribution, Contradiction, HealthMetric, DeletionRequest } from './types'

export const mockMemories: Memory[] = [
  // Harvey AI - Legal Research Scenario
  {
    id: 'mem_harvey_001',
    text: 'Ross v. Jenkins (2nd Circuit, 2019): Broad discovery allowed in employment discrimination - supports plaintiff\'s motion to compel',
    timestamp: new Date('2024-01-15'),
    tier: 'hot',
    criticality: 0.85,
    retrievalCount: 234,
    lastRetrieved: new Date('2024-02-05'),
    metadata: { category: 'case_law', jurisdiction: '2nd_circuit', year: 2019, client: 'harvey_ai' }
  },
  {
    id: 'mem_harvey_002',
    text: 'State Bar Ethics Opinion 2022-15: Attorney-client privilege extends to preliminary interviews - limits discovery scope',
    timestamp: new Date('2024-01-20'),
    tier: 'hot',
    criticality: 0.82,
    retrievalCount: 187,
    lastRetrieved: new Date('2024-02-05'),
    metadata: { category: 'ethics_opinion', year: 2022, client: 'harvey_ai' }
  },

  // Intercom - Customer Support Scenario
  {
    id: 'mem_intercom_001',
    text: 'Enterprise plan includes API access, premium support, unlimited seats - $499/month',
    timestamp: new Date('2023-08-01'),
    tier: 'warm',
    criticality: 0.75,
    retrievalCount: 1842,
    lastRetrieved: new Date('2024-01-15'),
    metadata: { category: 'pricing', status: 'stale', client: 'intercom' }
  },
  {
    id: 'mem_intercom_002',
    text: 'NEW PRICING (Jan 2024): Enterprise now tiered - Standard $199 (10 seats), Plus $399 (50 seats), Premier $799 (unlimited)',
    timestamp: new Date('2024-01-10'),
    tier: 'hot',
    criticality: 0.95,
    retrievalCount: 412,
    lastRetrieved: new Date('2024-02-05'),
    metadata: { category: 'pricing', status: 'current', client: 'intercom' }
  },

  // Perplexity AI - Location Scenario
  {
    id: 'mem_perplexity_001',
    text: 'User lives in New York City - home address: Manhattan, registered location',
    timestamp: new Date('2023-08-10'),
    tier: 'warm',
    criticality: 0.65,
    retrievalCount: 823,
    lastRetrieved: new Date('2024-01-28'),
    metadata: { category: 'location', type: 'permanent', client: 'perplexity' }
  },
  {
    id: 'mem_perplexity_002',
    text: 'User currently in London - recent queries: "weather in London", "tube stations near hotel"',
    timestamp: new Date('2024-02-01'),
    tier: 'hot',
    criticality: 0.85,
    retrievalCount: 156,
    lastRetrieved: new Date('2024-02-05'),
    metadata: { category: 'location', type: 'temporary', client: 'perplexity' }
  },

  // Replit Agent - Code Generation Scenario
  {
    id: 'mem_replit_001',
    text: 'User prefers React class components - historical projects use componentDidMount, this.state patterns',
    timestamp: new Date('2023-06-15'),
    tier: 'warm',
    criticality: 0.45,
    retrievalCount: 567,
    lastRetrieved: new Date('2024-01-10'),
    metadata: { category: 'code_style', framework: 'react', client: 'replit' }
  },
  {
    id: 'mem_replit_002',
    text: 'Current project: React 18.2.0 with TypeScript - package.json shows modern hooks-based setup, no class components',
    timestamp: new Date('2024-02-03'),
    tier: 'hot',
    criticality: 0.90,
    retrievalCount: 94,
    lastRetrieved: new Date('2024-02-05'),
    metadata: { category: 'project_config', framework: 'react', version: '18.2.0', client: 'replit' }
  },

  // Personal AI - Credential Safety Scenario
  {
    id: 'mem_personal_001',
    text: 'Home WiFi credentials: SSID "SmithResidence", Password: "Tr0picBe@ch2024"',
    timestamp: new Date('2024-01-05'),
    tier: 'hot',
    criticality: 0.95,
    retrievalCount: 23,
    lastRetrieved: new Date('2024-02-02'),
    metadata: { category: 'credentials', sensitivity: 'high', client: 'personal_ai', safety: true }
  },
  {
    id: 'mem_personal_002',
    text: 'Work context: User frequently shares screen in company meetings (Monday 2pm standups, Thursday client calls)',
    timestamp: new Date('2024-01-25'),
    tier: 'hot',
    criticality: 0.70,
    retrievalCount: 45,
    lastRetrieved: new Date('2024-02-05'),
    metadata: { category: 'work_pattern', client: 'personal_ai' }
  }
]

export const mockAttributions: QueryAttribution[] = [
  // Harvey AI - Legal Brief Generation
  {
    queryId: 'q_harvey_001',
    query: 'Draft motion to compel discovery in employment discrimination case - need precedent supporting broad document requests',
    response: 'Based on Ross v. Jenkins (2nd Circuit, 2019), I recommend arguing that broad discovery is appropriate...',
    timestamp: new Date('2024-02-05T10:30:42'),
    mode: 'amortized',
    computeTime: 12,
    attributions: [
      {
        memoryId: 'mem_harvey_001',
        memoryText: 'Ross v. Jenkins (2nd Circuit, 2019): Broad discovery allowed in employment discrimination',
        shapleyValue: 0.89,
        confidence: 0.94,
        modelType: 'gpt-4-turbo'
      },
      {
        memoryId: 'mem_harvey_002',
        memoryText: 'State Bar Ethics Opinion 2022-15: Attorney-client privilege extends to preliminary interviews',
        shapleyValue: 0.73,
        confidence: 0.88,
        modelType: 'gpt-4-turbo'
      }
    ]
  },

  // Intercom - Customer Support Query (STALE DATA)
  {
    queryId: 'q_intercom_001',
    query: 'What does the Enterprise plan include?',
    response: 'The Enterprise plan includes API access, premium support, and unlimited seats for $499/month.',
    timestamp: new Date('2024-02-05T14:22:15'),
    mode: 'amortized',
    computeTime: 8,
    attributions: [
      {
        memoryId: 'mem_intercom_001',
        memoryText: 'Enterprise plan includes API access, premium support, unlimited seats - $499/month',
        shapleyValue: 0.94,
        confidence: 0.91,
        modelType: 'gpt-4'
      }
      // MISSING: mem_intercom_002 (new pricing) was not retrieved! Shapley: 0%
    ]
  },

  // Perplexity AI - Location-based Search
  {
    queryId: 'q_perplexity_001',
    query: 'Best pizza places near me',
    response: 'Here are the top-rated pizza places in New York City: 1. Juliana\'s in Brooklyn...',
    timestamp: new Date('2024-02-05T18:45:33'),
    mode: 'amortized',
    computeTime: 9,
    attributions: [
      {
        memoryId: 'mem_perplexity_001',
        memoryText: 'User lives in New York City - home address: Manhattan',
        shapleyValue: 0.87,
        confidence: 0.82,
        modelType: 'gpt-4'
      },
      {
        memoryId: 'mem_perplexity_002',
        memoryText: 'User currently in London - recent queries about London',
        shapleyValue: 0.23,
        confidence: 0.76,
        modelType: 'gpt-4'
      }
    ]
  },

  // Replit Agent - Code Generation
  {
    queryId: 'q_replit_001',
    query: 'Create a React component with a timer that updates every second',
    response: 'Here\'s a React component using class-based approach:\n\nclass Timer extends React.Component {\n  componentDidMount() {...',
    timestamp: new Date('2024-02-05T16:12:08'),
    mode: 'amortized',
    computeTime: 11,
    attributions: [
      {
        memoryId: 'mem_replit_001',
        memoryText: 'User prefers React class components - historical projects use componentDidMount',
        shapleyValue: 0.81,
        confidence: 0.87,
        modelType: 'gpt-4'
      },
      {
        memoryId: 'mem_replit_002',
        memoryText: 'Current project: React 18.2.0 with TypeScript - modern hooks-based setup',
        shapleyValue: 0.12,
        confidence: 0.79,
        modelType: 'gpt-4'
      }
    ]
  },

  // Personal AI - Credential Safety (PREVENTED)
  {
    queryId: 'q_personal_001',
    query: 'What\'s my home WiFi password? I need to give it to a guest',
    response: '[BLOCKED] I cannot share credentials during screen-sharing context. Please check your password manager privately.',
    timestamp: new Date('2024-02-05T14:05:19'),
    mode: 'exact',
    computeTime: 4823,
    attributions: [
      {
        memoryId: 'mem_personal_001',
        memoryText: 'Home WiFi credentials: SSID "SmithResidence", Password: "Tr0picBe@ch2024"',
        shapleyValue: 0.95,
        confidence: 0.98,
        modelType: 'gpt-4'
      },
      {
        memoryId: 'mem_personal_002',
        memoryText: 'Work context: User frequently shares screen in company meetings',
        shapleyValue: 0.91,
        confidence: 0.96,
        modelType: 'gpt-4'
      }
    ]
  }
]

export const mockContradictions: Contradiction[] = [
  // Harvey AI - Legal Precedent Contradiction
  {
    id: 'contr_harvey_001',
    memory1: mockMemories[0], // Ross v. Jenkins - broad discovery
    memory2: mockMemories[1], // State Bar Ethics Opinion - limits discovery
    type: 'logical',
    confidence: 0.92,
    detectedAt: new Date('2024-02-05T10:31:15'),
    resolved: false
  },

  // Intercom - Pricing Information (Temporal Update)
  {
    id: 'contr_intercom_001',
    memory1: mockMemories[2], // Old pricing $499
    memory2: mockMemories[3], // New tiered pricing
    type: 'temporal_update',
    confidence: 0.97,
    detectedAt: new Date('2024-01-10T08:00:00'),
    resolved: false
  },

  // Perplexity AI - Location Conflict
  {
    id: 'contr_perplexity_001',
    memory1: mockMemories[4], // Lives in NYC (permanent)
    memory2: mockMemories[5], // Currently in London (temporary)
    type: 'temporal_update',
    confidence: 0.88,
    detectedAt: new Date('2024-02-01T09:00:00'),
    resolved: true
  },

  // Replit Agent - React Version Mismatch
  {
    id: 'contr_replit_001',
    memory1: mockMemories[6], // Prefers class components
    memory2: mockMemories[7], // React 18.2.0 hooks-only
    type: 'logical',
    confidence: 0.91,
    detectedAt: new Date('2024-02-03T16:10:00'),
    resolved: false
  }
]

export const mockHealthMetrics: HealthMetric[] = [
  { timestamp: new Date('2024-02-01'), contradictionRate: 0.02, retrievalEfficiency: 0.94, semanticDrift: 0.08, memoryQuality: 0.96 },
  { timestamp: new Date('2024-02-02'), contradictionRate: 0.03, retrievalEfficiency: 0.93, semanticDrift: 0.09, memoryQuality: 0.95 },
  { timestamp: new Date('2024-02-03'), contradictionRate: 0.15, retrievalEfficiency: 0.91, semanticDrift: 0.12, memoryQuality: 0.88 },
  { timestamp: new Date('2024-02-04'), contradictionRate: 0.08, retrievalEfficiency: 0.92, semanticDrift: 0.11, memoryQuality: 0.91 },
  { timestamp: new Date('2024-02-05'), contradictionRate: 0.04, retrievalEfficiency: 0.95, semanticDrift: 0.10, memoryQuality: 0.94 },
]

export const mockDeletionRequests: DeletionRequest[] = [
  {
    id: 'del_001',
    memoryId: 'mem_005',
    derivedArtifacts: ['summary_12', 'cluster_3', 'output_456'],
    status: 'grace_period',
    requestedAt: new Date('2024-01-20'),
    deletionDate: new Date('2024-02-19')
  }
]
