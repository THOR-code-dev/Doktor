import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, Save, Eye } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent } from '@/components/ui/card'
import { LoadingPage } from '@/components/ui/loading'
import { useToast } from '@/components/ui/toast'
import { useCategories } from '@/hooks'
import { supabase } from '@/lib/supabase'
import { slugify } from '@/lib/utils'
import { useAuth } from '@/contexts/AuthContext'

export function AdminBlogEditorPage() {
    const { id } = useParams()
    const navigate = useNavigate()
    const { showToast } = useToast()
    const { user } = useAuth()
    const { categories } = useCategories()
    const isNew = id === 'new'

    const [loading, setLoading] = useState(!isNew)
    const [saving, setSaving] = useState(false)
    const [formData, setFormData] = useState({
        title: '',
        slug: '',
        excerpt: '',
        content: '',
        featured_image: '',
        category_id: '',
        status: 'draft' as 'draft' | 'published',
    })

    useEffect(() => {
        if (!isNew && id) {
            fetchPost()
        }
    }, [id, isNew])

    const fetchPost = async () => {
        try {
            const { data, error } = await supabase
                .from('blog_posts')
                .select('*')
                .eq('id', id)
                .single()

            if (error) throw error
            if (data) {
                setFormData({
                    title: data.title,
                    slug: data.slug,
                    excerpt: data.excerpt,
                    content: data.content,
                    featured_image: data.featured_image || '',
                    category_id: data.category_id || '',
                    status: data.status,
                })
            }
        } catch {
            showToast('Yazı yüklenemedi', 'error')
            navigate('/admin/blog')
        } finally {
            setLoading(false)
        }
    }

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const title = e.target.value
        setFormData((prev) => ({
            ...prev,
            title,
            slug: isNew ? slugify(title) : prev.slug,
        }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!formData.title || !formData.excerpt || !formData.content) {
            showToast('Lütfen zorunlu alanları doldurun', 'error')
            return
        }

        setSaving(true)
        try {
            const postData = {
                ...formData,
                slug: formData.slug || slugify(formData.title),
                category_id: formData.category_id || null,
                author_id: user?.id,
                published_at: formData.status === 'published' ? new Date().toISOString() : null,
            }

            if (isNew) {
                const { error } = await supabase.from('blog_posts').insert(postData)
                if (error) throw error
                showToast('Blog yazısı oluşturuldu', 'success')
            } else {
                const { error } = await supabase.from('blog_posts').update(postData).eq('id', id)
                if (error) throw error
                showToast('Blog yazısı güncellendi', 'success')
            }

            navigate('/admin/blog')
        } catch (error: any) {
            if (error.code === '23505') {
                showToast('Bu slug zaten kullanılıyor', 'error')
            } else {
                showToast('Kaydetme başarısız', 'error')
            }
        } finally {
            setSaving(false)
        }
    }

    if (loading) return <LoadingPage />

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-4">
                <Button variant="ghost" size="icon" onClick={() => navigate('/admin/blog')}>
                    <ArrowLeft className="h-5 w-5" />
                </Button>
                <div>
                    <h1 className="font-display text-3xl font-bold">
                        {isNew ? 'Yeni Blog Yazısı' : 'Blog Yazısını Düzenle'}
                    </h1>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="grid lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                    <Card>
                        <CardContent className="p-6 space-y-4">
                            <div>
                                <label className="block text-sm font-medium mb-2">Başlık *</label>
                                <Input
                                    value={formData.title}
                                    onChange={handleTitleChange}
                                    placeholder="Blog yazısı başlığı"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2">Slug</label>
                                <Input
                                    value={formData.slug}
                                    onChange={(e) => setFormData((prev) => ({ ...prev, slug: e.target.value }))}
                                    placeholder="blog-yazisi-basligi"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2">Özet *</label>
                                <Textarea
                                    value={formData.excerpt}
                                    onChange={(e) => setFormData((prev) => ({ ...prev, excerpt: e.target.value }))}
                                    placeholder="Kısa özet..."
                                    rows={3}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2">İçerik *</label>
                                <Textarea
                                    value={formData.content}
                                    onChange={(e) => setFormData((prev) => ({ ...prev, content: e.target.value }))}
                                    placeholder="Blog yazısı içeriği (HTML desteklenir)..."
                                    rows={15}
                                    className="font-mono text-sm"
                                />
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <div className="space-y-6">
                    <Card>
                        <CardContent className="p-6 space-y-4">
                            <div>
                                <label className="block text-sm font-medium mb-2">Durum</label>
                                <select
                                    value={formData.status}
                                    onChange={(e) =>
                                        setFormData((prev) => ({
                                            ...prev,
                                            status: e.target.value as 'draft' | 'published',
                                        }))
                                    }
                                    className="w-full h-11 rounded-lg border border-input bg-background px-3"
                                >
                                    <option value="draft">Taslak</option>
                                    <option value="published">Yayınla</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2">Kategori</label>
                                <select
                                    value={formData.category_id}
                                    onChange={(e) =>
                                        setFormData((prev) => ({ ...prev, category_id: e.target.value }))
                                    }
                                    className="w-full h-11 rounded-lg border border-input bg-background px-3"
                                >
                                    <option value="">Kategori Seçin</option>
                                    {categories.map((cat) => (
                                        <option key={cat.id} value={cat.id}>
                                            {cat.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2">Öne Çıkan Görsel URL</label>
                                <Input
                                    value={formData.featured_image}
                                    onChange={(e) =>
                                        setFormData((prev) => ({ ...prev, featured_image: e.target.value }))
                                    }
                                    placeholder="https://..."
                                />
                                {formData.featured_image && (
                                    <img
                                        src={formData.featured_image}
                                        alt="Preview"
                                        className="mt-2 rounded-lg w-full aspect-video object-cover"
                                    />
                                )}
                            </div>
                        </CardContent>
                    </Card>

                    <div className="flex gap-2">
                        <Button type="submit" className="flex-1" disabled={saving}>
                            <Save className="mr-2 h-4 w-4" />
                            {saving ? 'Kaydediliyor...' : 'Kaydet'}
                        </Button>
                        {!isNew && formData.status === 'published' && (
                            <Button type="button" variant="outline" asChild>
                                <a href={`/blog/${formData.slug}`} target="_blank" rel="noopener noreferrer">
                                    <Eye className="h-4 w-4" />
                                </a>
                            </Button>
                        )}
                    </div>
                </div>
            </form>
        </div>
    )
}
