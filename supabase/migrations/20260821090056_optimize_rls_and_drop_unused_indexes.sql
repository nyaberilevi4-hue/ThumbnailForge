-- Fix auth_rls_initplan: wrap auth.uid() in (select ...) so it evaluates once per query, not per row
drop policy if exists "select_own" on public.thumbnails;
create policy "select_own" on public.thumbnails
  for select using ((select auth.uid()) = user_id);

drop policy if exists "insert_own" on public.thumbnails;
create policy "insert_own" on public.thumbnails
  for insert with check ((select auth.uid()) = user_id);

drop policy if exists "update_own" on public.thumbnails;
create policy "update_own" on public.thumbnails
  for update using ((select auth.uid()) = user_id);

drop policy if exists "delete_own" on public.thumbnails;
create policy "delete_own" on public.thumbnails
  for delete using ((select auth.uid()) = user_id);

-- Drop the two unused indexes, replace with one composite index that actually matches
-- the app's real query pattern (filter by user_id, order by created_at desc)
drop index if exists public.thumbnails_user_id_idx;
drop index if exists public.thumbnails_created_at_idx;

create index if not exists thumbnails_user_id_created_at_idx
  on public.thumbnails (user_id, created_at desc);

-- Also apply the same (select auth.uid()) fix to the storage.objects policies
-- from the thumbnails bucket, for the same performance reason
drop policy if exists "Users can upload into their own folder" on storage.objects;
create policy "Users can upload into their own folder"
  on storage.objects for insert
  with check (
    bucket_id = 'thumbnails'
    and (storage.foldername(name))[1] = (select auth.uid())::text
  );

drop policy if exists "Users can update their own files" on storage.objects;
create policy "Users can update their own files"
  on storage.objects for update
  using (
    bucket_id = 'thumbnails'
    and (storage.foldername(name))[1] = (select auth.uid())::text
  );

drop policy if exists "Users can delete their own files" on storage.objects;
create policy "Users can delete their own files"
  on storage.objects for delete
  using (
    bucket_id = 'thumbnails'
    and (storage.foldername(name))[1] = (select auth.uid())::text
  );
