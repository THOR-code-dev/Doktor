export type Database = {
    public: {
        Tables: {
            blog_posts: {
                Row: {
                    id: string
                    slug: string
                    title: string
                    excerpt: string
                    content: string
                    featured_image: string | null
                    status: 'draft' | 'published'
                    published_at: string | null
                    created_at: string
                    updated_at: string
                    author_id: string | null
                    category_id: string | null
                }
                Insert: Omit<Database['public']['Tables']['blog_posts']['Row'], 'id' | 'created_at' | 'updated_at'>
                Update: Partial<Database['public']['Tables']['blog_posts']['Insert']>
            }
            categories: {
                Row: {
                    id: string
                    name: string
                    slug: string
                    created_at: string
                    updated_at: string
                }
                Insert: Omit<Database['public']['Tables']['categories']['Row'], 'id' | 'created_at' | 'updated_at'>
                Update: Partial<Database['public']['Tables']['categories']['Insert']>
            }
            treatments: {
                Row: {
                    id: string
                    slug: string
                    title: string
                    description: string
                    content: string
                    images: string[]
                    meta_title: string | null
                    meta_description: string | null
                    order_index: number
                    created_at: string
                    updated_at: string
                }
                Insert: Omit<Database['public']['Tables']['treatments']['Row'], 'id' | 'created_at' | 'updated_at'>
                Update: Partial<Database['public']['Tables']['treatments']['Insert']>
            }
            site_settings: {
                Row: {
                    id: string
                    site_title: string
                    site_description: string | null
                    logo: string | null
                    favicon: string | null
                    phone: string | null
                    email: string | null
                    whatsapp: string | null
                    address: string | null
                    map_embed_url: string | null
                    facebook_url: string | null
                    instagram_url: string | null
                    twitter_url: string | null
                    youtube_url: string | null
                    default_meta_title: string | null
                    default_meta_description: string | null
                    keywords: string[]
                    updated_at: string
                }
                Insert: Omit<Database['public']['Tables']['site_settings']['Row'], 'id' | 'updated_at'>
                Update: Partial<Database['public']['Tables']['site_settings']['Insert']>
            }
            doctor_info: {
                Row: {
                    id: string
                    name: string
                    title: string
                    specialty: string
                    photo: string | null
                    bio: string | null
                    certifications: string[]
                    education: string[]
                    experience: string[]
                    updated_at: string
                }
                Insert: Omit<Database['public']['Tables']['doctor_info']['Row'], 'id' | 'updated_at'>
                Update: Partial<Database['public']['Tables']['doctor_info']['Insert']>
            }
            contact_submissions: {
                Row: {
                    id: string
                    name: string
                    email: string
                    phone: string | null
                    message: string
                    created_at: string
                }
                Insert: Omit<Database['public']['Tables']['contact_submissions']['Row'], 'id' | 'created_at'>
                Update: Partial<Database['public']['Tables']['contact_submissions']['Insert']>
            }
        }
    }
}

export type BlogPost = Database['public']['Tables']['blog_posts']['Row']
export type Category = Database['public']['Tables']['categories']['Row']
export type Treatment = Database['public']['Tables']['treatments']['Row']
export type SiteSettings = Database['public']['Tables']['site_settings']['Row']
export type DoctorInfo = Database['public']['Tables']['doctor_info']['Row']
export type ContactSubmission = Database['public']['Tables']['contact_submissions']['Row']
