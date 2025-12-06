import { useState, useEffect } from 'react'
import { Save } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { LoadingPage } from '@/components/ui/loading'
import { useToast } from '@/components/ui/toast'
import { supabase } from '@/lib/supabase'

export function AdminSettingsPage() {
    const { showToast } = useToast()
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    const [settingsId, setSettingsId] = useState<string | null>(null)
    const [formData, setFormData] = useState({
        site_title: '',
        site_description: '',
        logo: '',
        favicon: '',
        phone: '',
        email: '',
        whatsapp: '',
        address: '',
        map_embed_url: '',
        facebook_url: '',
        instagram_url: '',
        twitter_url: '',
        youtube_url: '',
        default_meta_title: '',
        default_meta_description: '',
        keywords: '',
    })

    useEffect(() => {
        fetchSettings()
    }, [])

    const fetchSettings = async () => {
        try {
            const { data, error } = await supabase.from('site_settings').select('*').single()

            if (error && error.code !== 'PGRST116') throw error

            if (data) {
                setSettingsId(data.id)
                setFormData({
                    site_title: data.site_title || '',
                    site_description: data.site_description || '',
                    logo: data.logo || '',
                    favicon: data.favicon || '',
                    phone: data.phone || '',
                    email: data.email || '',
                    whatsapp: data.whatsapp || '',
                    address: data.address || '',
                    map_embed_url: data.map_embed_url || '',
                    facebook_url: data.facebook_url || '',
                    instagram_url: data.instagram_url || '',
                    twitter_url: data.twitter_url || '',
                    youtube_url: data.youtube_url || '',
                    default_meta_title: data.default_meta_title || '',
                    default_meta_description: data.default_meta_description || '',
                    keywords: (data.keywords || []).join(', '),
                })
            }
        } catch {
            showToast('Ayarlar yüklenemedi', 'error')
        } finally {
            setLoading(false)
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setSaving(true)

        try {
            const settingsData = {
                ...formData,
                keywords: formData.keywords.split(',').map((k) => k.trim()).filter(Boolean),
            }

            if (settingsId) {
                const { error } = await supabase
                    .from('site_settings')
                    .update(settingsData)
                    .eq('id', settingsId)
                if (error) throw error
            } else {
                const { error } = await supabase.from('site_settings').insert(settingsData)
                if (error) throw error
            }

            showToast('Ayarlar kaydedildi', 'success')
        } catch {
            showToast('Kaydetme başarısız', 'error')
        } finally {
            setSaving(false)
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    if (loading) return <LoadingPage />

    return (
        <div className="space-y-6">
            <div>
                <h1 className="font-display text-3xl font-bold mb-2">Site Ayarları</h1>
                <p className="text-muted-foreground">Genel site ayarlarını yönetin</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Genel Bilgiler</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium mb-2">Site Başlığı</label>
                                <Input
                                    name="site_title"
                                    value={formData.site_title}
                                    onChange={handleChange}
                                    placeholder="Site başlığı"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2">Site Açıklaması</label>
                                <Input
                                    name="site_description"
                                    value={formData.site_description}
                                    onChange={handleChange}
                                    placeholder="Site açıklaması"
                                />
                            </div>
                        </div>
                        <div className="grid md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium mb-2">Logo URL</label>
                                <Input
                                    name="logo"
                                    value={formData.logo}
                                    onChange={handleChange}
                                    placeholder="https://..."
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2">Favicon URL</label>
                                <Input
                                    name="favicon"
                                    value={formData.favicon}
                                    onChange={handleChange}
                                    placeholder="https://..."
                                />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>İletişim Bilgileri</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium mb-2">Telefon</label>
                                <Input
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    placeholder="+90 XXX XXX XX XX"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2">WhatsApp</label>
                                <Input
                                    name="whatsapp"
                                    value={formData.whatsapp}
                                    onChange={handleChange}
                                    placeholder="+90 XXX XXX XX XX"
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-2">Email</label>
                            <Input
                                name="email"
                                type="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="info@example.com"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-2">Adres</label>
                            <Textarea
                                name="address"
                                value={formData.address}
                                onChange={handleChange}
                                placeholder="Tam adres"
                                rows={2}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-2">Harita Embed URL</label>
                            <Input
                                name="map_embed_url"
                                value={formData.map_embed_url}
                                onChange={handleChange}
                                placeholder="Google Maps embed URL"
                            />
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Sosyal Medya</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium mb-2">Facebook</label>
                                <Input
                                    name="facebook_url"
                                    value={formData.facebook_url}
                                    onChange={handleChange}
                                    placeholder="https://facebook.com/..."
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2">Instagram</label>
                                <Input
                                    name="instagram_url"
                                    value={formData.instagram_url}
                                    onChange={handleChange}
                                    placeholder="https://instagram.com/..."
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2">Twitter</label>
                                <Input
                                    name="twitter_url"
                                    value={formData.twitter_url}
                                    onChange={handleChange}
                                    placeholder="https://twitter.com/..."
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2">YouTube</label>
                                <Input
                                    name="youtube_url"
                                    value={formData.youtube_url}
                                    onChange={handleChange}
                                    placeholder="https://youtube.com/..."
                                />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>SEO Ayarları</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium mb-2">Varsayılan Meta Başlık</label>
                            <Input
                                name="default_meta_title"
                                value={formData.default_meta_title}
                                onChange={handleChange}
                                placeholder="SEO başlığı"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-2">Varsayılan Meta Açıklama</label>
                            <Textarea
                                name="default_meta_description"
                                value={formData.default_meta_description}
                                onChange={handleChange}
                                placeholder="SEO açıklaması"
                                rows={2}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-2">Anahtar Kelimeler</label>
                            <Input
                                name="keywords"
                                value={formData.keywords}
                                onChange={handleChange}
                                placeholder="göz doktoru, katarakt, kayseri (virgülle ayırın)"
                            />
                        </div>
                    </CardContent>
                </Card>

                <Button type="submit" size="lg" disabled={saving}>
                    <Save className="mr-2 h-5 w-5" />
                    {saving ? 'Kaydediliyor...' : 'Ayarları Kaydet'}
                </Button>
            </form>
        </div>
    )
}
