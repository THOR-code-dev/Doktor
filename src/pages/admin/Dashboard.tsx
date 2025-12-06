import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FileText, Eye, PenTool, Settings, Plus } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { supabase } from '@/lib/supabase'
import type { DashboardStats } from '@/types'

export function AdminDashboardPage() {
    const [stats, setStats] = useState<DashboardStats>({
        totalBlogs: 0,
        publishedBlogs: 0,
        draftBlogs: 0,
        totalTreatments: 0,
    })
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function fetchStats() {
            try {
                const [blogsResult, treatmentsResult] = await Promise.all([
                    supabase.from('blog_posts').select('status'),
                    supabase.from('treatments').select('id'),
                ])

                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                const blogs: any[] = blogsResult.data || []
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                const treatments: any[] = treatmentsResult.data || []

                setStats({
                    totalBlogs: blogs.length,
                    publishedBlogs: blogs.filter((b) => b.status === 'published').length,
                    draftBlogs: blogs.filter((b) => b.status === 'draft').length,
                    totalTreatments: treatments.length,
                })
            } catch (error) {
                console.error('Error fetching stats:', error)
            } finally {
                setLoading(false)
            }
        }

        fetchStats()
    }, [])

    const statCards = [
        {
            title: 'Toplam Blog',
            value: stats.totalBlogs,
            icon: FileText,
            color: 'text-blue-500',
            bgColor: 'bg-blue-500/10',
        },
        {
            title: 'Yayınlanan',
            value: stats.publishedBlogs,
            icon: Eye,
            color: 'text-green-500',
            bgColor: 'bg-green-500/10',
        },
        {
            title: 'Taslak',
            value: stats.draftBlogs,
            icon: PenTool,
            color: 'text-orange-500',
            bgColor: 'bg-orange-500/10',
        },
        {
            title: 'Tedaviler',
            value: stats.totalTreatments,
            icon: Settings,
            color: 'text-purple-500',
            bgColor: 'bg-purple-500/10',
        },
    ]

    const quickActions = [
        { label: 'Yeni Blog Yazısı', href: '/admin/blog/new', icon: Plus },
        { label: 'Yeni Tedavi', href: '/admin/tedaviler/new', icon: Plus },
        { label: 'Blog Yönetimi', href: '/admin/blog', icon: FileText },
        { label: 'Tedavi Yönetimi', href: '/admin/tedaviler', icon: Settings },
    ]

    return (
        <div className="space-y-8">
            <div>
                <h1 className="font-display text-3xl font-bold mb-2">Dashboard</h1>
                <p className="text-muted-foreground">Hoş geldiniz! Site istatistikleriniz aşağıda.</p>
            </div>

            {/* Stats Grid */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {statCards.map((stat, index) => (
                    <motion.div
                        key={stat.title}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                    >
                        <Card>
                            <CardContent className="p-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm text-muted-foreground">{stat.title}</p>
                                        <p className="text-3xl font-bold mt-1">
                                            {loading ? '-' : stat.value}
                                        </p>
                                    </div>
                                    <div className={`w-12 h-12 rounded-lg ${stat.bgColor} flex items-center justify-center`}>
                                        <stat.icon className={`h-6 w-6 ${stat.color}`} />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                ))}
            </div>

            {/* Quick Actions */}
            <Card>
                <CardHeader>
                    <CardTitle>Hızlı İşlemler</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {quickActions.map((action) => (
                            <Button key={action.href} variant="outline" className="h-auto py-4" asChild>
                                <Link to={action.href} className="flex flex-col items-center gap-2">
                                    <action.icon className="h-5 w-5" />
                                    <span>{action.label}</span>
                                </Link>
                            </Button>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
