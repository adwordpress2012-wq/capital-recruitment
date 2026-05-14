-- DOS recruitment template — idempotent alignment for older forks / manual DB edits.
-- Renames legacy columns if present; safe to re-run. Greenfield installs can rely on
-- 20250514100000_capital_backend.sql only; this file stays for migration history continuity.

alter table public.candidate_applications add column if not exists location text;

do $$
begin
  if exists (
    select 1 from information_schema.columns
    where table_schema = 'public' and table_name = 'candidate_applications' and column_name = 'applicant_name'
  ) and not exists (
    select 1 from information_schema.columns
    where table_schema = 'public' and table_name = 'candidate_applications' and column_name = 'full_name'
  ) then
    alter table public.candidate_applications rename column applicant_name to full_name;
  end if;
end $$;

do $$
begin
  if exists (
    select 1 from information_schema.columns
    where table_schema = 'public' and table_name = 'candidate_applications' and column_name = 'resume_storage_path'
  ) and not exists (
    select 1 from information_schema.columns
    where table_schema = 'public' and table_name = 'candidate_applications' and column_name = 'resume_path'
  ) then
    alter table public.candidate_applications rename column resume_storage_path to resume_path;
  end if;
end $$;

-- Allow nullable message if column exists (matches flexible application copy)
alter table public.candidate_applications alter column message drop not null;
