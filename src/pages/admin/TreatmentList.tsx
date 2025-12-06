import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Plus, Edit, Trash2, GripVertical } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { LoadingPage } from '@/components/ui/loading'
import { useToast } from '@/components/ui/toast'
import { useTreatments } from '@/hooks'
import { supabase } from '@/lib/supabase'

export function AdminTreatmentListPage() {
    const { showToast } = useToast()
    const { treatments, loading, error } = useTreatments()
    const [deleting, setDeleting] = useState<string | null>(null)

    const handleDelete = async (id: string) => {
        if (!confirm('Bu tedavi sayfasını silmek istediğinizden emin misiniz?')) return

        setDeleting(id)
        try {
            const { error } = await supabase.from('treatments').delete().eq('id', id)
            if (error) throw error
            showToast('Tedavi sayfası silindi', 'success')
            window.location.reload()
        } catch {
            showToast('Silme işlemi başarısız', 'error')
        } finally {
            setDeleting(null)
        }
    }

    if (loading) return <LoadingPage />
    if (error) return <div className="text-destructive">Bir hata oluştu</div>

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between gap-4">
                <div>
                    <h1 className="font-display text-3xl font-bold mb-2">Tedavi Yönetimi</h1>
                    <p className="text-muted-foreground">Tedavi sayfalarınızı yönetin</p>
                </div>
                <Button asChild>
                    <Link to="/admin/tedaviler/new">
                        <Plus className="mr-2 h-4 w-4" />
                        Yeni Tedavi
                    </Link>
                </Button>
            </div>

            {treatments.length === 0 ? (
                <Card>
                    <CardContent className="p-12 text-center">
                        <p className="text-muted-foreground mb-4">Henüz tedavi sayfası bulunmuyor.</p>
                        <Button asChild>
                            <Link to="/admin/tedaviler/new">
                                <Plus className="mr-2 h-4 w-4" />
                                İlk Tedavi Sayfanızı Oluşturun
                            </Link>
                        </Button>
                    </CardContent>
                </Card>
            ) : (
                <div className="space-y-4">
                    {treatments.map((treatment, index) => (
                        <motion.div
                            key={treatment.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                        >
                            <Card>
                                <CardContent className="p-4">
                                    <div className="flex items-center gap-4">
                                        <div className="cursor-move text-muted-foreground">
                                            <GripVertical className="h-5 w-5" />
                                        </div>
                                        {treatment.images?.[0] && (
                                            <img
                                                src={treatment.images[0]}
                                                alt=""
                                                className="w-20 h-20 rounded-lg object-cover flex-shrink-0"
                                            />
                                        )}
                                        <div className="flex-1 min-w-0">
                                            <h3 className="font-semibold truncate">{treatment.title}</h3>
                                            <p className="text-sm text-muted-foreground truncate">
                                                {treatment.description}
                                            </p>
                                            <p className="text-xs text-muted-foreground mt-1">
                                                Sıra: {treatment.order_index}
                                            </p>
                                        </div>
                                        <div className="flex items-center gap-2 flex-shrink-0">
                                            <Button variant="ghost" size="icon" asChild>
                                                <Link to={`/admin/tedaviler/${treatment.id}`}>
                                                    <Edit className="h-4 w-4" />
                                                </Link>
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                onClick={() => handleDelete(treatment.id)}
                                                disabled={deleting === treatment.id}
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
