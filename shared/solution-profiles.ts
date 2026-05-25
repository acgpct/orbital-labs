export type SolutionProfileId = 'developers' | 'ipp' | 'asset-managers';

export type SolutionProfile = {
  id: SolutionProfileId;
  shortLabel: string;
  title: string;
  summary: string;
  who: string;
  buyer: string;
  velocity: string;
  tier: string;
  pain: string;
  outcomes: string[];
};

export const solutionProfiles: SolutionProfile[] = [
  {
    id: 'developers',
    shortLabel: 'Developers',
    title: 'Renewable energy developers',
    summary: 'One thread from pipeline through COD — permits, milestones, contracts, and handover without spreadsheet re-keying.',
    who: 'Developers building solar, onshore wind, storage, and hybrids — from early-stage pipelines through construction and commissioning. Typically 50 MW–2 GW in active development across EU markets.',
    buyer: 'Head of Development, COO, or Project Director',
    velocity: '4–10 weeks',
    tier: 'Tier 2 Application / Tier 3 Managed',
    pain: 'Pipeline, development, and COD handover live in disconnected tools — milestones, snags, and as-builts get lost between teams.',
    outcomes: [
      'Stage-gate pipeline and SPV composition in one system of record.',
      'Permits, grid milestones, and stakeholder tracking with lapse alerts.',
      'Clean COD handover — snags, as-builts, and owner packs from live project data.',
    ],
  },
  {
    id: 'ipp',
    shortLabel: 'IPPs',
    title: 'Independent power producers',
    summary: 'Unified performance, contracts, and reporting across operating portfolios — from mid-market to listed platforms.',
    who: 'IPPs from ~200 MW to 5 GW+ — owner-operators of solar, onshore wind, storage, and hybrids. Mid-market players replacing spreadsheet stacks; larger platforms integrating with existing BI and finance.',
    buyer: 'COO or CFO, with Head of Asset Management, O&M, or CIO as technical sponsor',
    velocity: '3–9 months',
    tier: 'Tier 1 API / Tier 2 Application / Tier 3 Managed',
    pain: 'Fragmented OEM tools and spreadsheets — no single view of performance, contracts, or lender-grade reporting.',
    outcomes: [
      'Unified operating layer across OEM silos and geographies.',
      'Dev-to-ops continuity without re-keying at financial close.',
      'Lender- and board-ready packs in days, not weeks — API-first for enterprise estates.',
    ],
  },
  {
    id: 'asset-managers',
    shortLabel: 'Asset managers',
    title: 'Asset managers & portfolio operators',
    summary: 'Fund-level visibility across portfolio holdings — asset management, O&M, and standardised reporting without building data teams in every SPV.',
    who: 'Infrastructure funds, asset managers, and operating partners with European renewables focus — 5–25 holdings, ~100 MW–2 GW per asset. Mid-market funds (€1–10B AUM) through dedicated portfolio operations teams.',
    buyer: 'Head of Asset Management, O&M, or Operating Partner',
    velocity: '8–14 weeks',
    tier: 'Tier 3 Managed / Tier 4 Embedded',
    pain: 'Inconsistent reporting across portfolio companies — IC, LP, and board cycles require manual consolidation from every SPV.',
    outcomes: [
      'Single portfolio view across SPVs, geographies, and asset classes.',
      'Standardised KPI packs for IC, LP, and board cycles.',
      'Operating partner workflows without re-keying from portfolio companies.',
    ],
  },
];

export function getSolutionProfile(slug: string): SolutionProfile | undefined {
  return solutionProfiles.find((p) => p.id === slug);
}

export function solutionProfilePath(id: SolutionProfileId): string {
  return `/solutions/${id}`;
}
