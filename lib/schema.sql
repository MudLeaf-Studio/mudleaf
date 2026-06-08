-- ============================================================
-- MUDLEAF DATABASE SCHEMA
-- Run this in your Supabase SQL editor
-- Project: Mudleaf — mudleaf.com.au
-- ============================================================

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- ── PROFILES ──────────────────────────────────────────────
-- Extends Supabase auth.users with participant details
create table public.profiles (
  id uuid references auth.users on delete cascade primary key,
  full_name text,
  email text,
  phone text,
  ndis_number text,
  plan_management_type text check (plan_management_type in ('self', 'plan', 'agency', 'none')),
  support_coordinator text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Row level security — users can only see their own profile
alter table public.profiles enable row level security;
create policy "Users can view own profile" on public.profiles
  for select using (auth.uid() = id);
create policy "Users can update own profile" on public.profiles
  for update using (auth.uid() = id);

-- ── PROGRAM ENROLMENTS ────────────────────────────────────
create table public.enrolments (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) on delete cascade,
  program text not null, -- 'mlat-level-1', 'mlat-level-2', etc.
  status text default 'active' check (status in ('active', 'paused', 'completed', 'withdrawn')),
  enrolled_at timestamptz default now(),
  current_week integer default 1,
  completed_at timestamptz,
  notes text
);

alter table public.enrolments enable row level security;
create policy "Users can view own enrolments" on public.enrolments
  for select using (auth.uid() = user_id);

-- ── WEEKLY CHECK-INS ──────────────────────────────────────
create table public.checkins (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) on delete cascade,
  enrolment_id uuid references public.enrolments(id) on delete cascade,
  week_number integer not null,
  program text not null,
  presence_rating integer check (presence_rating between 1 and 5),
  practices_used text[], -- array of practice names ticked
  most_noticed text,
  free_text text,
  submitted_at timestamptz default now()
);

alter table public.checkins enable row level security;
create policy "Users can view own checkins" on public.checkins
  for select using (auth.uid() = user_id);
create policy "Users can insert own checkins" on public.checkins
  for insert with check (auth.uid() = user_id);

-- ── PSYCHOMETRIC COMPLETIONS ──────────────────────────────
-- Records when a participant completes a psychometric battery
create table public.psychometrics (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) on delete cascade,
  enrolment_id uuid references public.enrolments(id) on delete cascade,
  timepoint integer check (timepoint in (1, 6, 12)), -- week number
  program text not null,
  completed_at timestamptz default now(),
  external_form_id text -- reference to Typeform/REDCap if used
);

alter table public.psychometrics enable row level security;
create policy "Users can view own psychometrics" on public.psychometrics
  for select using (auth.uid() = user_id);

-- ── BLOG POSTS ────────────────────────────────────────────
create table public.blog_posts (
  id uuid default uuid_generate_v4() primary key,
  slug text unique not null,
  title text not null,
  category text not null, -- 'horticulture', 'mindfulness', 'tamil', 'ndis', 'garden-to-table', 'research'
  excerpt text,
  content text, -- markdown or HTML
  author text default 'Monica Allan',
  published boolean default false,
  featured boolean default false,
  read_time_minutes integer,
  published_at timestamptz,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Blog posts are public
alter table public.blog_posts enable row level security;
create policy "Published posts are publicly readable" on public.blog_posts
  for select using (published = true);

-- ── SHOP PRODUCTS ─────────────────────────────────────────
create table public.products (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  slug text unique not null,
  category text not null, -- 'workbooks', 'art', 'pottery', 'original-art'
  description text,
  price_aud numeric(8,2),
  status text default 'coming_soon' check (status in ('available', 'coming_soon', 'sold_out')),
  etsy_url text,
  stripe_price_id text, -- add when Stripe is connected
  created_at timestamptz default now()
);

alter table public.products enable row level security;
create policy "Products are publicly readable" on public.products
  for select using (true);

-- ── CONTACT & FEEDBACK SUBMISSIONS ───────────────────────
create table public.submissions (
  id uuid default uuid_generate_v4() primary key,
  form_type text not null check (form_type in ('contact', 'feedback', 'waitlist')),
  name text,
  email text,
  enquiry_type text,
  program text,
  message text not null,
  feedback_type text, -- for feedback forms
  anonymous boolean default false,
  responded boolean default false,
  created_at timestamptz default now()
);

-- Submissions are insert-only from public; only admins can read
alter table public.submissions enable row level security;
create policy "Anyone can submit" on public.submissions
  for insert with check (true);

-- ── WAITLIST ──────────────────────────────────────────────
create table public.waitlist (
  id uuid default uuid_generate_v4() primary key,
  email text unique not null,
  program text, -- what they're waiting for
  name text,
  created_at timestamptz default now()
);

alter table public.waitlist enable row level security;
create policy "Anyone can join waitlist" on public.waitlist
  for insert with check (true);

-- ── ADMIN VIEW ────────────────────────────────────────────
-- Create a server-side admin role check in your API routes
-- Do not expose service role key to the client

-- ── SEED: Initial products ────────────────────────────────
insert into public.products (name, slug, category, description, status, etsy_url) values
  ('Therapeutic Horticulture Reflective Journal', 'horticulture-journal', 'workbooks',
   'A 12-week editable PDF journal for therapeutic horticulture practice. Weekly reflections, monthly reviews, skill checklists, and NDIS capacity building prompts.',
   'available', 'https://www.etsy.com/shop/MudLeafLoveLifeMadly'),
  ('NDIS Goal Setting Workbook', 'ndis-goal-setting', 'workbooks',
   'A structured workbook to support NDIS participants in identifying, clarifying, and tracking their capacity building goals.',
   'coming_soon', null),
  ('MLAT Level 1 Workbook', 'mlat-level-1-workbook', 'workbooks',
   'The companion workbook for MLAT Level 1 — Foundations. 12-week program companion.',
   'coming_soon', null),
  ('MLAT Level 2 Workbook', 'mlat-level-2-workbook', 'workbooks',
   'The companion workbook for MLAT Level 2 — Deepening. For participants who have completed Level 1.',
   'coming_soon', null);
