-- Align candidate_applications with production column names (safe if already migrated).
-- Legacy repo columns: applicant_name, resume_storage_path, message NOT NULL

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
