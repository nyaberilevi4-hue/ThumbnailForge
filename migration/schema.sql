-- Thumbnails table (mirrors the old Base44 "Thumbnail" entity schema)
create table public.thumbnails (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  video_title text not null,
  video_topic text not null,
  thumbnail_style text,
  emotion_style text,
  image_url text not null,
  base_image_url text,
  ctr_score int,
  is_favorite boolean not null default false,
  created_at timestamptz not null default now()
);

alter table public.thumbnails enable row level security;

create policy "Users can view their own thumbnails"
  on public.thumbnails for select
  using (auth.uid() = user_id);

create policy "Users can insert their own thumbnails"
  on public.thumbnails for insert
  with check (auth.uid() = user_id);

create policy "Users can update their own thumbnails"
  on public.thumbnails for update
  using (auth.uid() = user_id);

create policy "Users can delete their own thumbnails"
  on public.thumbnails for delete
  using (auth.uid() = user_id);

create index thumbnails_user_id_created_at_idx
  on public.thumbnails (user_id, created_at desc);
