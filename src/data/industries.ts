/** Canonical industry labels used across jobs, filters, and forms. */
export const INDUSTRY_LABELS = [
  "Warehousing & Logistics",
  "Construction",
  "Manufacturing",
  "Transport",
  "Hospitality",
  "Civil",
  "Mining",
  "Administration",
  "Security",
] as const;

export type IndustryLabel = (typeof INDUSTRY_LABELS)[number];
