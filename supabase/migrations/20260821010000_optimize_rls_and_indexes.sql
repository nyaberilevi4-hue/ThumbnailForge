-- Fix auth_rls_initplan: wrap auth.uid() in (select ...) so it evaluates once
-- per query instead of once per row (Supabase performance advisor)
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

-- Drop the two single-column indexes (never used) and replace with one
-- composite index matching the app's actual query: filter by user_id,
-- order by created_at desc
drop index if exists public.thumbnails_user_id_idx;
drop index if exists public.thumbnails_created_at_idx;

create index if not exists thumbnails_user_id_created_at_idx
  on public.thumbnails (user_id, created_at desc);

-- Same (select auth.uid()) fix for the storage.objects policies on the
-- thumbnails bucket
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
