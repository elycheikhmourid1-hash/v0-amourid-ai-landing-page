-- AICore Digital — smart contact form leads.
-- Run once in Supabase SQL editor (project "mawid"). Idempotent.
-- Security model: anon may INSERT only. No SELECT/UPDATE/DELETE for anon/authenticated.
-- Ely reads leads from the Supabase dashboard (service role / table editor), never from the browser.

create table if not exists public.leads (
  id            uuid primary key default gen_random_uuid(),
  created_at    timestamptz not null default now(),
  name          text not null check (char_length(name) between 1 and 120),
  contact       text not null check (char_length(contact) between 3 and 160),  -- email or WhatsApp number
  business_type text check (business_type is null or char_length(business_type) <= 80),
  need          text not null check (char_length(need) between 5 and 4000),
  lang          text not null default 'en' check (lang in ('en','fr','ar')),
  source        text not null default 'smart-contact' check (char_length(source) <= 40),
  page          text check (page is null or char_length(page) <= 200)
);

alter table public.leads enable row level security;

drop policy if exists "leads_anon_insert" on public.leads;
create policy "leads_anon_insert" on public.leads
  for insert to anon
  with check (true);

-- Table privileges: insert only for the public API roles.
revoke all on public.leads from anon, authenticated;
grant insert on public.leads to anon;
