-- Capital Recruitment: core tables, RLS, and storage bucket.
-- Run via Supabase SQL editor or `supabase db push` after linking the project.

-- ---------------------------------------------------------------------------
-- Tables
-- ---------------------------------------------------------------------------

create table if not exists public.capital_jobs (
  id text primary key,
  title text not null,
  industry text not null,
  location text not null,
  employment_type text not null,
  rate text not null,
  posted_label text not null default 'Recently listed',
  summary text not null,
  description jsonb not null default '[]'::jsonb,
  requirements jsonb not null default '[]'::jsonb,
  status text not null check (status in ('draft', 'live', 'closed')) default 'draft',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.candidate_applications (
  id uuid primary key default gen_random_uuid(),
  job_id text references public.capital_jobs (id) on delete set null,
  full_name text not null,
  email text not null,
  phone text not null,
  location text,
  message text,
  resume_path text not null,
  resume_filename text,
  created_at timestamptz not null default now()
);

create table if not exists public.employer_enquiries (
  id uuid primary key default gen_random_uuid(),
  company_name text not null,
  contact_person text not null,
  email text not null,
  phone text,
  industry text,
  site_location text,
  services text[] not null default '{}',
  workers_required int,
  start_timing text,
  details text not null,
  created_at timestamptz not null default now()
);

create table if not exists public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  email text not null,
  phone text,
  company text,
  message text not null,
  created_at timestamptz not null default now()
);

create or replace function public.capital_set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists capital_jobs_set_updated_at on public.capital_jobs;
create trigger capital_jobs_set_updated_at
before update on public.capital_jobs
for each row execute function public.capital_set_updated_at();

-- ---------------------------------------------------------------------------
-- Row Level Security (anon reads live jobs only; writes via service role)
-- ---------------------------------------------------------------------------

alter table public.capital_jobs enable row level security;
alter table public.candidate_applications enable row level security;
alter table public.employer_enquiries enable row level security;
alter table public.contact_messages enable row level security;

drop policy if exists "capital_jobs_anon_select_live" on public.capital_jobs;
create policy "capital_jobs_anon_select_live"
  on public.capital_jobs
  for select
  to anon
  using (status = 'live');

drop policy if exists "capital_jobs_auth_select_live" on public.capital_jobs;
create policy "capital_jobs_auth_select_live"
  on public.capital_jobs
  for select
  to authenticated
  using (status = 'live');

-- ---------------------------------------------------------------------------
-- Storage: private bucket for resumes (uploads via service role from app API)
-- ---------------------------------------------------------------------------

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'capital-resumes',
  'capital-resumes',
  false,
  5242880,
  array[
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  ]::text[]
)
on conflict (id) do update set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;
