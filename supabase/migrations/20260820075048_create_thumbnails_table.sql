create table if not exists public.thumbnails (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  video_title text not null,
  video_topic text,
  thumbnail_style text,
  emotion_style text,
  image_url text not null,
  base_image_url text,
  ctr_score int,
  is_favorite boolean default false,
  created_at timestamptz default now()
);

alter table public.thumbnails enable row level security;

create policy "select_own" on public.thumbnails for select using (auth.uid() = user_id);
create policy "insert_own" on public.thumbnails for insert with check (auth.uid() = user_id);
create policy "update_own" on public.thumbnails for update using (auth.uid() = user_id);
create policy "delete_own" on public.thumbnails for delete using (auth.uid() = user_id);

create index if not exists thumbnails_user_id_idx on public.thumbnails(user_id);
create index if not exists thumbnails_created_at_idx on public.thumbnails(created_at desc);
