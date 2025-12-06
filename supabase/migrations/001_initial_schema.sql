-- Blog Posts
CREATE TABLE IF NOT EXISTS blog_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  excerpt TEXT NOT NULL,
  content TEXT NOT NULL,
  featured_image TEXT,
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'published')),
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  author_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  category_id UUID
);

CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX IF NOT EXISTS idx_blog_posts_status ON blog_posts(status);
CREATE INDEX IF NOT EXISTS idx_blog_posts_published_at ON blog_posts(published_at DESC);

-- Categories
CREATE TABLE IF NOT EXISTS categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_categories_slug ON categories(slug);

-- Add foreign key after categories table exists
ALTER TABLE blog_posts ADD CONSTRAINT fk_blog_posts_category 
  FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE SET NULL;

-- Treatments
CREATE TABLE IF NOT EXISTS treatments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  content TEXT NOT NULL,
  images TEXT[],
  meta_title TEXT,
  meta_description TEXT,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_treatments_slug ON treatments(slug);
CREATE INDEX IF NOT EXISTS idx_treatments_order ON treatments(order_index);

-- Site Settings
CREATE TABLE IF NOT EXISTS site_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  site_title TEXT NOT NULL,
  site_description TEXT,
  logo TEXT,
  favicon TEXT,
  phone TEXT,
  email TEXT,
  whatsapp TEXT,
  address TEXT,
  map_embed_url TEXT,
  facebook_url TEXT,
  instagram_url TEXT,
  twitter_url TEXT,
  youtube_url TEXT,
  default_meta_title TEXT,
  default_meta_description TEXT,
  keywords TEXT[],
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Doctor Info
CREATE TABLE IF NOT EXISTS doctor_info (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  title TEXT NOT NULL,
  specialty TEXT NOT NULL,
  photo TEXT,
  bio TEXT,
  certifications TEXT[],
  education TEXT[],
  experience TEXT[],
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Contact Submissions
CREATE TABLE IF NOT EXISTS contact_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  message TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_contact_submissions_created_at ON contact_submissions(created_at DESC);

-- Row Level Security (RLS) Policies

-- Blog Posts RLS
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public can read published blog posts" ON blog_posts;
CREATE POLICY "Public can read published blog posts"
  ON blog_posts FOR SELECT
  USING (status = 'published');

DROP POLICY IF EXISTS "Authenticated users can read all blog posts" ON blog_posts;
CREATE POLICY "Authenticated users can read all blog posts"
  ON blog_posts FOR SELECT
  TO authenticated
  USING (true);

DROP POLICY IF EXISTS "Authenticated users can create blog posts" ON blog_posts;
CREATE POLICY "Authenticated users can create blog posts"
  ON blog_posts FOR INSERT
  TO authenticated
  WITH CHECK (true);

DROP POLICY IF EXISTS "Authenticated users can update blog posts" ON blog_posts;
CREATE POLICY "Authenticated users can update blog posts"
  ON blog_posts FOR UPDATE
  TO authenticated
  USING (true);

DROP POLICY IF EXISTS "Authenticated users can delete blog posts" ON blog_posts;
CREATE POLICY "Authenticated users can delete blog posts"
  ON blog_posts FOR DELETE
  TO authenticated
  USING (true);

-- Categories RLS
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public can read categories" ON categories;
CREATE POLICY "Public can read categories"
  ON categories FOR SELECT
  USING (true);

DROP POLICY IF EXISTS "Authenticated users can manage categories" ON categories;
CREATE POLICY "Authenticated users can manage categories"
  ON categories FOR ALL
  TO authenticated
  USING (true);

-- Treatments RLS
ALTER TABLE treatments ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public can read treatments" ON treatments;
CREATE POLICY "Public can read treatments"
  ON treatments FOR SELECT
  USING (true);

DROP POLICY IF EXISTS "Authenticated users can manage treatments" ON treatments;
CREATE POLICY "Authenticated users can manage treatments"
  ON treatments FOR ALL
  TO authenticated
  USING (true);

-- Site Settings RLS
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public can read site settings" ON site_settings;
CREATE POLICY "Public can read site settings"
  ON site_settings FOR SELECT
  USING (true);

DROP POLICY IF EXISTS "Authenticated users can manage site settings" ON site_settings;
CREATE POLICY "Authenticated users can manage site settings"
  ON site_settings FOR ALL
  TO authenticated
  USING (true);

-- Doctor Info RLS
ALTER TABLE doctor_info ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public can read doctor info" ON doctor_info;
CREATE POLICY "Public can read doctor info"
  ON doctor_info FOR SELECT
  USING (true);

DROP POLICY IF EXISTS "Authenticated users can manage doctor info" ON doctor_info;
CREATE POLICY "Authenticated users can manage doctor info"
  ON doctor_info FOR ALL
  TO authenticated
  USING (true);

-- Contact Submissions RLS
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Anyone can submit contact form" ON contact_submissions;
CREATE POLICY "Anyone can submit contact form"
  ON contact_submissions FOR INSERT
  WITH CHECK (true);

DROP POLICY IF EXISTS "Authenticated users can read contact submissions" ON contact_submissions;
CREATE POLICY "Authenticated users can read contact submissions"
  ON contact_submissions FOR SELECT
  TO authenticated
  USING (true);

-- Triggers for updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS update_blog_posts_updated_at ON blog_posts;
CREATE TRIGGER update_blog_posts_updated_at
  BEFORE UPDATE ON blog_posts
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_categories_updated_at ON categories;
CREATE TRIGGER update_categories_updated_at
  BEFORE UPDATE ON categories
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_treatments_updated_at ON treatments;
CREATE TRIGGER update_treatments_updated_at
  BEFORE UPDATE ON treatments
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_site_settings_updated_at ON site_settings;
CREATE TRIGGER update_site_settings_updated_at
  BEFORE UPDATE ON site_settings
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_doctor_info_updated_at ON doctor_info;
CREATE TRIGGER update_doctor_info_updated_at
  BEFORE UPDATE ON doctor_info
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
