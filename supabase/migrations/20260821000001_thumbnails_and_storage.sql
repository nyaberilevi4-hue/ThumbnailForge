-- Thumbnails table (mirrors the old Base44 "Thumbnail" entity schema)
create table if not exists public.thumbnails (
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

drop policy if exists "Users can view their own thumbnails" on public.thumbnails;
create policy "Users can view their own thumbnails"
  on public.thumbnails for select
  using (auth.uid() = user_id);

drop policy if exists "Users can insert their own thumbnails" on public.thumbnails;
create policy "Users can insert their own thumbnails"
  on public.thumbnails for insert
  with check (auth.uid() = user_id);

drop policy if exists "Users can update their own thumbnails" on public.thumbnails;
create policy "Users can update their own thumbnails"
  on public.thumbnails for update
  using (auth.uid() = user_id);

drop policy if exists "Users can delete their own thumbnails" on public.thumbnails;
create policy "Users can delete their own thumbnails"
  on public.thumbnails for delete
  using (auth.uid() = user_id);

create index if not exists thumbnails_user_id_created_at_idx
  on public.thumbnails (user_id, created_at desc);

-- Public bucket for base-image uploads + generated thumbnails
insert into storage.buckets (id, name, public)
values ('thumbnails', 'thumbnails', true)
on conflict (id) do nothing;

drop policy if exists "Public read access to thumbnails bucket" on storage.objects;
create policy "Public read access to thumbnails bucket"
  on storage.objects for select
  using (bucket_id = 'thumbnails');

drop policy if exists "Users can upload into their own folder" on storage.objects;
create policy "Users can upload into their own folder"
  on storage.objects for insert
  with check (
    bucket_id = 'thumbnails'
    and (storage.foldername(name))[1] = auth.uid()::text
  );

drop policy if exists "Users can update their own files" on storage.objects;
create policy "Users can update their own files"
  on storage.objects for update
  using (
    bucket_id = 'thumbnails'
    and (storage.foldername(name))[1] = auth.uid()::text
  );

drop policy if exists "Users can delete their own files" on storage.objects;
create policy "Users can delete their own files"
  on storage.objects for delete
  using (
    bucket_id = 'thumbnails'
    and (storage.foldername(name))[1] = auth.uid()::text
  );
