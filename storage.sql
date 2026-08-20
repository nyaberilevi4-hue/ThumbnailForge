-- Public bucket for base-image uploads + generated thumbnails
insert into storage.buckets (id, name, public)
values ('thumbnails', 'thumbnails', true)
on conflict (id) do nothing;

-- Anyone can view (bucket is public / read-only for viewing generated images)
create policy "Public read access to thumbnails bucket"
  on storage.objects for select
  using (bucket_id = 'thumbnails');

-- Users can only upload into a folder named after their own user id: {user_id}/filename.png
create policy "Users can upload into their own folder"
  on storage.objects for insert
  with check (
    bucket_id = 'thumbnails'
    and (storage.foldername(name))[1] = auth.uid()::text
  );

create policy "Users can update their own files"
  on storage.objects for update
  using (
    bucket_id = 'thumbnails'
    and (storage.foldername(name))[1] = auth.uid()::text
  );

create policy "Users can delete their own files"
  on storage.objects for delete
  using (
    bucket_id = 'thumbnails'
    and (storage.foldername(name))[1] = auth.uid()::text
  );
