import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Plus, Edit, Trash2, Eye, EyeOff, Search } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { LoadingPage } from '@/components/ui/loading'
import { useToast } from '@/components/ui/toast'
import { useBlogPosts } from '@/hooks'
import { supabase } from '@/lib/supabase'
import { formatDate, cn } from '@/lib/utils'

export function AdminBlogListPage() {
    const { showToast } = useToast()
    const [search, setSearch] = useState('')
    const { posts, loading, error } = useBlogPosts({ search, status: undefined as any })
    const [deleting, setDeleting] = useState<string | null>(null)

    const handleDelete = async (id: string) => {
        if (!confirm('Bu blog yazısını silmek istediğinizden emin misiniz?')) return

        setDeleting(id)
        try {
            const { error } = await supabase.from('blog_posts').delete().eq('id', id)
            if (error) throw error
            showToast('Blog yazısı silindi', 'success')
            window.location.reload()
        } catch {
            showToast('Silme işlemi başarısız', 'error')
        } finally {
            setDeleting(null)
        }
    }

    const handleStatusToggle = async (id: string, currentStatus: string) => {
        const newStatus = currentStatus === 'published' ? 'draft' : 'published'
        try {
            const { error } = await supabase
                .from('blog_posts')
                .update({
                    status: newStatus,
                    published_at: newStatus === 'published' ? new Date().toISOString() : null,
                })
                .eq('id', id)
            if (error) throw error
            showToast(`Yazı ${newStatus === 'published' ? 'yayınlandı' : 'taslağa alındı'}`, 'success')
            window.location.reload()
        } catch {
            showToast('İşlem başarısız', 'error')
        }
    }

    if (loading) return <LoadingPage />
    if (error) return <div className="text-destructive">Bir hata oluştu</div>

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between gap-4">
                <div>
                    <h1 className="font-display text-3xl font-bold mb-2">Blog Yönetimi</h1>
                    <p className="text-muted-foreground">Blog yazılarınızı yönetin</p>
                </div>
                <Button asChild>
                    <Link to="/admin/blog/new">
                        <Plus className="mr-2 h-4 w-4" />
                        Yeni Yazı
                    </Link>
                </Button>
            </div>

            <div className="relative max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                    placeholder="Yazılarda ara..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="pl-10"
                />
            </div>

            {posts.length === 0 ? (
                <Card>
                    <CardContent className="p-12 text-center">
                        <p className="text-muted-foreground mb-4">Henüz blog yazısı bulunmuyor.</p>
                        <Button asChild>
                            <Link to="/admin/blog/new">
                                <Plus className="mr-2 h-4 w-4" />
                                İlk Yazınızı Oluşturun
                            </Link>
                        </Button>
                    </CardContent>
                </Card>
            ) : (
                <div className="space-y-4">
                    {posts.map((post, index) => (
                        <motion.div
                            key={post.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                        >
                            <Card>
                                <CardContent className="p-4">
                                    <div className="flex items-center gap-4">
                                        {post.featured_image && (
                                            <img
                                                src={post.featured_image}
                                                alt=""
                                                className="w-20 h-20 rounded-lg object-cover flex-shrink-0"
                                            />
                                        )}
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-2 mb-1">
                                                <h3 className="font-semibold truncate">{post.title}</h3>
                                                <span
                                                    className={cn(
                                                        'px-2 py-0.5 rounded-full text-xs font-medium',
                                                        post.status === 'published'
                                                            ? 'bg-green-500/10 text-green-500'
                                                            : 'bg-orange-500/10 text-orange-500'
                                                    )}
                                                >
                                                    {post.status === 'published' ? 'Yayında' : 'Taslak'}
                                                </span>
                                            </div>
                                            <p className="text-sm text-muted-foreground truncate">{post.excerpt}</p>
                                            <p className="text-xs text-muted-foreground mt-1">
                                                {post.published_at ? formatDate(post.published_at) : 'Yayınlanmadı'}
                                            </p>
                                        </div>
                                        <div className="flex items-center gap-2 flex-shrink-0">
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                onClick={() => handleStatusToggle(post.id, post.status)}
                                                title={post.status === 'published' ? 'Taslağa Al' : 'Yayınla'}
                                            >
                                                {post.status === 'published' ? (
                                                    <EyeOff className="h-4 w-4" />
                                                ) : (
                                                    <Eye className="h-4 w-4" />
                                                )}
                                            </Button>
                                            <Button variant="ghost" size="icon" asChild>
                                                <Link to={`/admin/blog/${post.id}`}>
                                                    <Edit className="h-4 w-4" />
                                                </Link>
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                onClick={() => handleDelete(post.id)}
                                                disabled={deleting === post.id}
                                                className="text-destructive hover:text-destructive"
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            )}
        </div>
    )
}
