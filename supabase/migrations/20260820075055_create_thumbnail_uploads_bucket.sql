insert into storage.buckets (id, name, public)
values ('thumbnail-uploads', 'thumbnail-uploads', true)
on conflict (id) do nothing;

create policy "auth_upload" on storage.objects for insert to authenticated
  with check (bucket_id = 'thumbnail-uploads');
create policy "public_read" on storage.objects for select
  using (bucket_id = 'thumbnail-uploads');
