import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, Save, Eye, Plus, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent } from '@/components/ui/card'
import { LoadingPage } from '@/components/ui/loading'
import { useToast } from '@/components/ui/toast'
import { supabase } from '@/lib/supabase'
import { slugify } from '@/lib/utils'

export function AdminTreatmentEditorPage() {
    const { id } = useParams()
    const navigate = useNavigate()
    const { showToast } = useToast()
    const isNew = id === 'new'

    const [loading, setLoading] = useState(!isNew)
    const [saving, setSaving] = useState(false)
    const [formData, setFormData] = useState({
        title: '',
        slug: '',
        description: '',
        content: '',
        images: [] as string[],
        meta_title: '',
        meta_description: '',
        order_index: 0,
    })
    const [newImageUrl, setNewImageUrl] = useState('')

    useEffect(() => {
        if (!isNew && id) {
            fetchTreatment()
        }
    }, [id, isNew])

    const fetchTreatment = async () => {
        try {
            const { data, error } = await supabase
                .from('treatments')
                .select('*')
                .eq('id', id)
                .single()

            if (error) throw error
            if (data) {
                setFormData({
                    title: data.title,
                    slug: data.slug,
                    description: data.description,
                    content: data.content,
                    images: data.images || [],
                    meta_title: data.meta_title || '',
                    meta_description: data.meta_description || '',
                    order_index: data.order_index,
                })
            }
        } catch {
            showToast('Tedavi yüklenemedi', 'error')
            navigate('/admin/tedaviler')
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

    const addImage = () => {
        if (newImageUrl.trim()) {
            setFormData((prev) => ({
                ...prev,
                images: [...prev.images, newImageUrl.trim()],
            }))
            setNewImageUrl('')
        }
    }

    const removeImage = (index: number) => {
        setFormData((prev) => ({
            ...prev,
            images: prev.images.filter((_, i) => i !== index),
        }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!formData.title || !formData.description || !formData.content) {
            showToast('Lütfen zorunlu alanları doldurun', 'error')
            return
        }

        setSaving(true)
        try {
            const treatmentData = {
                ...formData,
                slug: formData.slug || slugify(formData.title),
            }

            if (isNew) {
                const { error } = await supabase.from('treatments').insert(treatmentData)
                if (error) throw error
                showToast('Tedavi sayfası oluşturuldu', 'success')
            } else {
                const { error } = await supabase.from('treatments').update(treatmentData).eq('id', id)
                if (error) throw error
                showToast('Tedavi sayfası güncellendi', 'success')
            }

            navigate('/admin/tedaviler')
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
                <Button variant="ghost" size="icon" onClick={() => navigate('/admin/tedaviler')}>
                    <ArrowLeft className="h-5 w-5" />
                </Button>
                <div>
                    <h1 className="font-display text-3xl font-bold">
                        {isNew ? 'Yeni Tedavi Sayfası' : 'Tedavi Sayfasını Düzenle'}
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
                                    placeholder="Tedavi başlığı"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2">Slug</label>
                                <Input
                                    value={formData.slug}
                                    onChange={(e) => setFormData((prev) => ({ ...prev, slug: e.target.value }))}
                                    placeholder="tedavi-basligi"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2">Kısa Açıklama *</label>
                                <Textarea
                                    value={formData.description}
                                    onChange={(e) =>
                                        setFormData((prev) => ({ ...prev, description: e.target.value }))
                                    }
                                    placeholder="Kısa açıklama..."
                                    rows={3}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2">İçerik *</label>
                                <Textarea
                                    value={formData.content}
                                    onChange={(e) => setFormData((prev) => ({ ...prev, content: e.target.value }))}
                                    placeholder="Tedavi içeriği (HTML desteklenir)..."
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
                                <label className="block text-sm font-medium mb-2">Sıra</label>
                                <Input
                                    type="number"
                                    value={formData.order_index}
                                    onChange={(e) =>
                                        setFormData((prev) => ({ ...prev, order_index: parseInt(e.target.value) || 0 }))
                                    }
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2">Meta Başlık</label>
                                <Input
                                    value={formData.meta_title}
                                    onChange={(e) => setFormData((prev) => ({ ...prev, meta_title: e.target.value }))}
                                    placeholder="SEO başlığı"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2">Meta Açıklama</label>
                                <Textarea
                                    value={formData.meta_description}
                                    onChange={(e) =>
                                        setFormData((prev) => ({ ...prev, meta_description: e.target.value }))
                                    }
                                    placeholder="SEO açıklaması"
                                    rows={2}
                                />
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent className="p-6 space-y-4">
                            <label className="block text-sm font-medium">Görseller</label>
                            <div className="flex gap-2">
                                <Input
                                    value={newImageUrl}
                                    onChange={(e) => setNewImageUrl(e.target.value)}
                                    placeholder="Görsel URL'si"
                                />
                                <Button type="button" variant="outline" size="icon" onClick={addImage}>
                                    <Plus className="h-4 w-4" />
                                </Button>
                            </div>
                            {formData.images.length > 0 && (
                                <div className="grid grid-cols-2 gap-2">
                                    {formData.images.map((img, index) => (
                                        <div key={index} className="relative group">
                                            <img
                                                src={img}
                                                alt=""
                                                className="w-full aspect-square object-cover rounded-lg"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => removeImage(index)}
                                                className="absolute top-1 right-1 p-1 bg-destructive text-destructive-foreground rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                            >
                                                <X className="h-3 w-3" />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    <div className="flex gap-2">
                        <Button type="submit" className="flex-1" disabled={saving}>
                            <Save className="mr-2 h-4 w-4" />
                            {saving ? 'Kaydediliyor...' : 'Kaydet'}
                        </Button>
                        {!isNew && (
                            <Button type="button" variant="outline" asChild>
                                <a href={`/tedaviler/${formData.slug}`} target="_blank" rel="noopener noreferrer">
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
