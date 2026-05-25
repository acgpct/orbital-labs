export const dataIngestion = [
  'SCADA / IoT Sensors',
  'ERP & Accounting',
  'Grid Operators',
  'Weather & Market Data',
  'Legal & Contract Systems',
] as const;

export const architectureOutputs = [
  'Investor Reports',
  'Lender Dashboards',
  'Regulatory Filings',
  'Board Packs',
  'API / Integrations',
] as const;

export const coreModules = [
  {
    id: 'pipeline-spv',
    title: 'Pipeline & SPV',
    summary: 'Stage-gate pipeline, capital allocation, SPV composition and ownership — one graph from deal idea to financial close.',
  },
  {
    id: 'development',
    title: 'Development',
    summary: 'Land options, permits with lapse alerts, grid milestones, and stakeholder mapping in one development tracker.',
  },
  {
    id: 'contracts',
    title: 'Contracts',
    summary: 'EPC, LTSA, O&M, PPA, offtake, and ancillaries — retention, milestones, indexation, and renewal alerts.',
  },
  {
    id: 'construction',
    title: 'Construction',
    summary: 'EPC milestones, capex, change orders, commissioning checklists, and COD handover with warranty dates flowing into asset management & O&M.',
  },
  {
    id: 'asset-management',
    title: 'Asset Management & O&M',
    summary:
      'Asset management and operations & maintenance at fleet scale — mixed-OEM monitoring, variance investigation, settlement reconciliation, work orders, and BESS dispatch.',
  },
  {
    id: 'reporting',
    title: 'Reporting',
    summary: 'Lender, investor, and board packs; CSRD; transaction rooms — same core data for operations and capital events.',
  },
] as const;

export type CoreModuleId = (typeof coreModules)[number]['id'];

/** Lifecycle modules with an interactive product demo on the architecture page */
export const demoModuleIds = ['pipeline-spv', 'development', 'asset-management'] as const satisfies readonly CoreModuleId[];

export type DemoModuleId = (typeof demoModuleIds)[number];

export const PLATFORM_MODULE_DEMO = '/platform-module-demo.mov';

export const moduleDemoVideos = {
  'pipeline-spv': PLATFORM_MODULE_DEMO,
  development: PLATFORM_MODULE_DEMO,
  'asset-management': '/platform-module-demo-asset-management.mov',
} as const satisfies Record<DemoModuleId, string>;

export function moduleDemoVideo(id: DemoModuleId): string {
  return moduleDemoVideos[id];
}

/** Default preview on load; switches to asset-management video when that module is selected. */
export function resolveDemoVideo(moduleId: CoreModuleId | null | undefined): string {
  return moduleId === 'asset-management'
    ? moduleDemoVideos['asset-management']
    : moduleDemoVideos['pipeline-spv'];
}

export function resolveDemoModule(moduleId: CoreModuleId | null | undefined) {
  const id: DemoModuleId = moduleId === 'asset-management' ? 'asset-management' : 'pipeline-spv';
  return coreModules.find((m) => m.id === id)!;
}

export function moduleHasDemo(id: CoreModuleId | null | undefined): id is DemoModuleId {
  return id != null && (demoModuleIds as readonly string[]).includes(id);
}

/** Maps lifecycle row ids (M1…M6) to core module ids for demo wiring */
export const lifecycleRowToCoreId = {
  M1: 'pipeline-spv',
  M2: 'development',
  M5: 'asset-management',
} as const satisfies Partial<Record<string, CoreModuleId>>;

export function coreIdFromLifecycleRow(rowId: string): CoreModuleId | null {
  return (lifecycleRowToCoreId as Record<string, CoreModuleId | undefined>)[rowId] ?? null;
}

export const architecturePillars = [
  {
    id: 'data-model',
    label: 'The data model',
    summary:
      'One shared graph for every project, SPV, asset, contract, permit, and operating record — origination through operations without re-keying.',
    body: 'A single shared model holds every project, SPV, asset, contract, permit, stakeholder, and operating record. Information captured at origination flows through financing, construction, and operations without re-keying. This is what makes it an operating system rather than another application.',
  },
  {
    id: 'methodology-ip',
    label: 'Methodology IP',
    summary:
      'Proprietary calculation engine, regulatory libraries, and workflow templates — extended by every portfolio’s edge cases.',
    body: "The calculation engine, regulatory libraries, and workflow templates are proprietary. Each new customer extends the model with their portfolio's edge cases. Each year of operation accrues benchmarks against which new entrants cannot compete without years of customer data.",
  },
  {
    id: 'multi-country',
    label: 'Multi-country depth',
    summary:
      'Phase 1 EU geographies with sovereign and regional cloud deployment for data residency.',
    body: 'Phase 1 geographies: Poland, Hungary, Romania, Italy, Spain, Germany. Year 2 adds United Kingdom and the Nordics. Sovereign and regional cloud deployment supported natively — meeting EU buyer requirements for data residency.',
  },
] as const;

export const certifications = [
  { name: 'GDPR', target: 'Day one', note: 'Designed-in, not added later' },
  { name: 'ISO 27001', target: 'Month 12', note: 'Default expectation for EU enterprise buyers' },
  { name: 'SOC 2 Type II', target: 'Month 18', note: 'Required for North American expansion' },
  { name: 'EU AI Act', target: 'Month 12', note: 'Compliance posture documented, external legal review Y1' },
] as const;

export const technologyStack =
  'Cloud-native. Data layer: PostgreSQL, TimescaleDB, S3. Backend: Python (FastAPI) and TypeScript (Node.js). Frontend: React. Infrastructure: Kubernetes on EKS/GKE, Terraform, CI/CD. Multi-tenancy via tenant-scoped schemas. TLS 1.3 in transit, AES-256 at rest. Customer-managed encryption keys available for sovereign tiers.';
