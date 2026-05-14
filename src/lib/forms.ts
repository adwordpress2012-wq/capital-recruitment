/**
 * Form endpoints (Formspree or similar). Set in `.env` for local dev and in Vercel for production.
 * Candidate form should notify paul@capitalrecruitment.com.au (configure recipient in Formspree).
 */
export const FORMSPREE_CANDIDATE_ACTION =
  (typeof import.meta !== "undefined" && import.meta.env?.VITE_FORMSPREE_CANDIDATE_ACTION) || "";

export const FORMSPREE_CONTACT_ACTION =
  (typeof import.meta !== "undefined" && import.meta.env?.VITE_FORMSPREE_CONTACT_ACTION) || "";

export const FORMSPREE_EMPLOYER_ACTION =
  (typeof import.meta !== "undefined" && import.meta.env?.VITE_FORMSPREE_EMPLOYER_ACTION) || "";

/** When true, candidate form POSTs multipart with `attachment`. Requires file uploads on the Formspree candidate form. */
export const FORMSPREE_CANDIDATE_FILE_UPLOAD_ENABLED =
  typeof import.meta !== "undefined" &&
  import.meta.env?.VITE_FORMSPREE_CANDIDATE_FILE_UPLOAD_ENABLED === "true";
