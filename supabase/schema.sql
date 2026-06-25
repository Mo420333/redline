-- Redline Showroom — shared "rides" table.
-- Run this in the Supabase SQL editor to enable the real, shared backend.

create table if not exists public.rides (
  id          text primary key,
  owner       text not null,
  car         text not null,
  category    text,
  brand       text,
  caption     text,
  img         text,
  color       text,
  sky         text,
  loves       integer not null default 0,
  created_at  timestamptz not null default now()
);

-- Row Level Security: readable by everyone, insertable by anyone (demo policy).
-- Tighten these for production (e.g. require auth on insert).
alter table public.rides enable row level security;

create policy "rides are readable by everyone"
  on public.rides for select using (true);

create policy "anyone can post a ride"
  on public.rides for insert with check (true);

-- Stream new rides to all connected clients in real time.
alter publication supabase_realtime add table public.rides;
