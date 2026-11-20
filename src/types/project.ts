// ============================================================================
// Project Type Definitions — Cinematic Portfolio Redesign
// ============================================================================

export type ProjectTier = 'featured' | 'client' | 'archive';

export type ProjectCategory =
  | 'full-stack'
  | 'backend'
  | 'frontend'
  | 'graduation'
  | 'client-work'
  | 'independent'
  | 'earlier-work';

export interface ProjectLink {
  label: string;
  url: string;
  type: 'case-study' | 'github' | 'live' | 'api-docs' | 'frontend-repo';
  isPrimary?: boolean;
}

export interface ProjectTech {
  name: string;
  category: 'frontend' | 'backend' | 'database' | 'devops' | 'integration' | 'architecture';
}

export interface ProjectItem {
  id: string;
  slug: string;
  order: number;
  title: string;
  shortTitle?: string;
  label: string;
  roleLine?: string;
  tier: ProjectTier;
  category: ProjectCategory;
  stack: string[];
  techDetailed?: ProjectTech[];
  description: string;
  shortDescription?: string;
  highlightConcepts?: string[];
  bulletHighlights?: string[];
  links: ProjectLink[];
  notes?: string;
  isPlaceholder?: boolean;
  syntheticDataNotice?: string;
  coverImagePlaceholder?: string;
}
