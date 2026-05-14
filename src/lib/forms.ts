/**
 * Form endpoints (Formspree or similar). Set in `.env` for production.
 * TODO: Create Formspree forms and paste action URLs. Candidate form should notify paul@capitalrecruitment.com.au.
 */
export const FORMSPREE_CANDIDATE_ACTION =
  (typeof import.meta !== "undefined" && import.meta.env?.VITE_FORMSPREE_CANDIDATE_ACTION) || "";

export const FORMSPREE_CONTACT_ACTION =
  (typeof import.meta !== "undefined" && import.meta.env?.VITE_FORMSPREE_CONTACT_ACTION) || "";

export const FORMSPREE_EMPLOYER_ACTION =
  (typeof import.meta !== "undefined" && import.meta.env?.VITE_FORMSPREE_EMPLOYER_ACTION) || "";
