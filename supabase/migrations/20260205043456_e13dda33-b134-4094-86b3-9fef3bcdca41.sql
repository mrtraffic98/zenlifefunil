-- Create storage bucket for funnel assets
INSERT INTO storage.buckets (id, name, public)
VALUES ('funnel-assets', 'funnel-assets', true);

-- Allow public read access to all files in the bucket
CREATE POLICY "Public read access for funnel assets"
ON storage.objects
FOR SELECT
USING (bucket_id = 'funnel-assets');

-- Allow authenticated users to upload (for admin purposes)
CREATE POLICY "Authenticated users can upload funnel assets"
ON storage.objects
FOR INSERT
WITH CHECK (bucket_id = 'funnel-assets');