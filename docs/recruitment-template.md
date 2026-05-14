# DOS recruitment portal template

Reusable base for labour hire and recruitment marketing sites: public job listings, applications with resume upload, employer enquiries, contact form, and a lightweight admin area backed by Supabase.

---

## Architecture summary

### Frontend

- **TanStack Start** — full-stack React with file-based routing and server functions.
- **Vercel** — typical hosting target; build output is a Node serverless function plus static assets.

### Backend

- **Supabase Postgres** — `capital_jobs`, `candidate_applications`, `employer_enquiries`, `contact_messages`.
- **Supabase Storage** — private bucket `capital-resumes` for application files (PDF/DOC/DOCX).

### Admin

- **Hidden `/admin` routes** — not linked from the public nav; discoverable only by URL (`/admin/login`, `/admin/jobs`, `/admin/applications`).
- **Session token auth** — password gate issues a signed token stored in `sessionStorage`; server functions verify the token with `CAPITAL_ADMIN_SESSION_SECRET` before any admin data access.

---

## Stack overview

| Layer | Technology |
| --- | --- |
| UI | React 19, Tailwind CSS 4, Radix UI, TanStack Router |
| Data (public reads) | Supabase anon key + RLS (`capital_jobs` live rows only) |
| Data (writes & admin) | Server functions + Supabase **service role** (bypasses RLS; never exposed to the browser) |
| Forms | Applications (multipart), contact and employer JSON payloads |
| Validation | Zod in server functions |

---

## Required environment variables

See `.env.example` in the repo root. Every new deployment needs:

| Variable | Where it runs | Purpose |
| --- | --- | --- |
| `VITE_SUPABASE_URL` | Client + server | Supabase project URL (safe to bundle). |
| `VITE_SUPABASE_ANON_KEY` | Client + server | Public anon key; RLS restricts what anon can read. |
| `SUPABASE_SERVICE_ROLE_KEY` | **Server only** | Inserts applications, contact rows, employer rows; admin job CRUD; storage upload and signed URLs. Never prefix with `VITE_`. |
| `CAPITAL_ADMIN_PASSWORD` | Server only | Single shared admin password (upgrade path: real auth provider). |
| `CAPITAL_ADMIN_SESSION_SECRET` | Server only | HMAC secret for signing admin session tokens (fallback: `SUPABASE_JWT_SECRET` in code if unset — prefer an explicit random string). |

---

## Recommended Vercel + Supabase setup order

1. **Create Supabase project** — note project URL and anon + service role keys from **Settings → API**.
2. **Run migrations** — `supabase link` then `supabase db push`, or paste migration SQL in the SQL editor (see below).
3. **Confirm storage bucket** — migration inserts `capital-resumes`; verify in **Storage** (private, MIME allowlist, 5MB limit).
4. **Create Vercel project** — import Git repo, framework preset compatible with TanStack Start / Vite.
5. **Set Vercel environment variables** — add all five variables for Production (and Preview if you use preview DBs).
6. **Deploy** — trigger production deploy; smoke-test public jobs, apply form, admin login.

Doing Supabase **before** Vercel avoids “empty jobs / forms fail” due to missing env on first deploy.

---

## Supabase setup steps

1. Install [Supabase CLI](https://supabase.com/docs/guides/cli) if you use local push.
2. From repo root: `supabase link --project-ref <your-ref>`.
3. `supabase db push` to apply `supabase/migrations/*.sql` in order.

Alternatively, open **SQL Editor** in the dashboard and run the migration files in timestamp order.

Confirm tables exist: `capital_jobs`, `candidate_applications`, `employer_enquiries`, `contact_messages`.

---

## Storage bucket setup

The starter migration defines bucket **`capital-resumes`**:

- **Private** (`public = false`) — browsers cannot list or download without a signed URL.
- **File size limit** — 5MB (matches app validation).
- **Allowed MIME types** — PDF and Word documents.

Upload path pattern used by the app: `applications/<uuid>/resume.<ext>`.

No anon storage policies are required: uploads and signed URL generation use the **service role** on the server only.

---

## Admin routes

| Path | Purpose |
| --- | --- |
| `/admin/login` | Password login; stores signed token in `sessionStorage`. |
| `/admin/jobs` | List / create / edit / delete jobs; set status Draft / Live / Closed. |
| `/admin/applications` | List applicants with signed resume download links (short TTL). |

If env admin vars are missing, login returns a clear “not configured” message.

---

## Admin workflow (operations)

### How to add jobs

1. Open `/admin/login` and sign in.
2. Go to **Jobs** (`/admin/jobs`).
3. Create or duplicate a job, fill title, location, summary, description bullets, requirements, rate, etc.
4. Save — new jobs default to **Draft** until you mark them live.

### How to make jobs live

1. In `/admin/jobs`, set the job **status** to **Live** and save.
2. Public listing and job detail pages only show rows where DB `status = 'live'` (anon RLS + server list agree).

### How to review applicants

1. Open `/admin/applications`.
2. Each row shows name, job title, contact fields, message preview, and timestamp.
3. Use the resume link when present (signed URL, expires after about an hour — refresh the page for a new link if needed).

### How to download resumes

1. From `/admin/applications`, use the **signed URL** link for that application (generated server-side with the service role).
2. Prefer downloading soon after opening the page; regenerate by reloading if the link expires.

---

## Deployment workflow

1. Ensure `main` (or production branch) has correct `.env` equivalents in Vercel.
2. `npm run build` locally before tagging releases if you want a compile check.
3. Push to the branch connected to Vercel — automatic production deploy.
4. After first deploy, verify: homepage loads, `/jobs` or job routes load, admin login works, test application in a non-production Supabase project first when possible.

---

## Common troubleshooting

| Symptom | Likely cause | Fix |
| --- | --- | --- |
| Jobs list empty but DB has rows | Status not `live`, or anon env wrong | Set jobs to Live; check `VITE_SUPABASE_*` on Vercel. |
| “Database not configured” on forms | Missing URL/anon/service role on server | Add all three Supabase keys; redeploy. Service role must be present for writes. |
| Admin login always fails | Wrong password or missing session secret | Set `CAPITAL_ADMIN_PASSWORD` and `CAPITAL_ADMIN_SESSION_SECRET`. |
| Admin session “expired” immediately | Clock skew or wrong secret | Check server time; ensure session secret matches across instances. |
| Resume upload fails | Bucket missing, MIME blocked, or size | Re-run migration bucket insert; check file type and 5MB limit. |
| RLS errors on anon client | Expectation mismatch | Public job reads use anon; admin and forms use service role in server functions only. |

---

## Future enhancement TODO

- **Email notifications** — notify consultants when applications or employer enquiries arrive.
- **Applicant status tracking** — pipeline stages (received, screening, interview, placed, rejected).
- **Search / filter** — full-text or faceted job search on listing pages.
- **Employer dashboard** — authenticated employers viewing their reqs (requires auth model).
- **Multi-tenant support** — single Supabase project serving many brands (tenant column + strict RLS).
- **Audit logs** — who changed jobs, viewed PII, exported data (compliance).

---

## Forking for a new client

1. Duplicate the repo (or use as GitHub template).
2. Replace branding: `Logo`, copy, `index` hero, footer, `jobs` seed data in `src/data/jobs.ts` as fallback content.
3. New Supabase project + fresh migrations + new Vercel env vars.
4. Optionally rename `capital_*` tables in a follow-up migration for naming consistency — the current schema uses the `capital_` prefix for historical reasons; new forks may alias or rename in a dedicated migration once.
