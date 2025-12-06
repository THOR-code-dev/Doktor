import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, X, BookOpen } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Container } from '@/components/layout'
import { LoadingPage } from '@/components/ui/loading'
import { useBlogPosts, useCategories } from '@/hooks'
import { formatDate } from '@/lib/utils'
import { fadeInUp, staggerContainer, float } from '@/lib/animations'

export function BlogPage() {
    const [search, setSearch] = useState('')
    const [selectedCategory, setSelectedCategory] = useState<string | undefined>()
    const [page, setPage] = useState(1)

    const { posts, loading, totalPages } = useBlogPosts({ search, categoryId: selectedCategory, page, pageSize: 9 })
    const { categories } = useCategories()

    const clearFilters = () => { setSearch(''); setSelectedCategory(undefined); setPage(1) }

    return (
        <div className="py-12 overflow-hidden">
            <motion.div className="fixed inset-0 pointer-events-none -z-10" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <motion.div variants={float} initial="initial" animate="animate" className="absolute top-20 right-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
                <motion.div variants={float} initial="initial" animate="animate" transition={{ delay: 1 }} className="absolute bottom-20 left-10 w-96 h-96 bg-secondary/5 rounded-full blur-3xl" />
            </motion.div>

            <Container>
                <motion.div variants={staggerContainer} initial="initial" animate="animate" className="text-center mb-12">
                    <motion.div initial={{ scale: 0, rotate: -180 }} animate={{ scale: 1, rotate: 0 }} transition={{ type: 'spring', stiffness: 200 }} className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6">
                        <BookOpen className="h-8 w-8 text-primary" />
                    </motion.div>
                    <motion.h1 variants={fadeInUp} className="font-display text-4xl lg:text-5xl font-bold mb-4">Blog Yazılarım</motion.h1>
                    <motion.p variants={fadeInUp} className="text-muted-foreground max-w-2xl mx-auto">Göz sağlığı hakkında bilgilendirici yazılar ve güncel gelişmeler.</motion.p>
                </motion.div>

                <motion.div className="mb-8 space-y-4" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                    <div className="flex flex-col sm:flex-row gap-4">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input placeholder="Yazılarda ara..." value={search} onChange={(e) => { setSearch(e.target.value); setPage(1) }} className="pl-10" />
                        </div>
                        <motion.div className="flex gap-2 flex-wrap" variants={staggerContainer} initial="initial" animate="animate">
                            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                <Button variant={!selectedCategory ? 'default' : 'outline'} size="sm" onClick={() => { setSelectedCategory(undefined); setPage(1) }}>Tümü</Button>
                            </motion.div>
                            {categories.map((category) => (
                                <motion.div key={category.id} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                    <Button variant={selectedCategory === category.id ? 'default' : 'outline'} size="sm" onClick={() => { setSelectedCategory(category.id); setPage(1) }}>{category.name}</Button>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                    <AnimatePresence>
                        {(search || selectedCategory) && (
                            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}>
                                <Button variant="ghost" size="sm" onClick={clearFilters}><X className="mr-2 h-4 w-4" />Filtreleri Temizle</Button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>

                {loading ? <LoadingPage /> : posts.length > 0 ? (
                    <>
                        <motion.div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6" variants={staggerContainer} initial="initial" animate="animate">
                            {posts.map((post, index) => (
                                <motion.div key={post.id} variants={fadeInUp} custom={index} whileHover={{ y: -10, scale: 1.02 }} transition={{ type: 'spring', stiffness: 300 }}>
                                    <Link to={`/blog/${post.slug}`}>
                                        <Card className="h-full hover:shadow-xl transition-shadow overflow-hidden group">
                                            {post.featured_image && (
                                                <motion.div className="aspect-video overflow-hidden" whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }}>
                                                    <img src={post.featured_image} alt={post.title} className="w-full h-full object-cover transition-transform group-hover:scale-110 duration-500" />
                                                </motion.div>
                                            )}
                                            <CardContent className="p-6 relative">
                                                <time className="text-sm text-muted-foreground">{post.published_at && formatDate(post.published_at)}</time>
                                                <h2 className="font-display font-semibold text-xl mt-2 mb-2 line-clamp-2 group-hover:text-primary transition-colors">{post.title}</h2>
                                                <p className="text-muted-foreground text-sm line-clamp-3">{post.excerpt}</p>
                                                <motion.div className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                                            </CardContent>
                                        </Card>
                                    </Link>
                                </motion.div>
                            ))}
                        </motion.div>

                        {totalPages > 1 && (
                            <motion.div className="flex justify-center gap-2 mt-10" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
                                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                    <Button variant="outline" disabled={page === 1} onClick={() => setPage((p) => p - 1)}>Önceki</Button>
                                </motion.div>
                                <span className="flex items-center px-4 text-sm text-muted-foreground">Sayfa {page} / {totalPages}</span>
                                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                    <Button variant="outline" disabled={page === totalPages} onClick={() => setPage((p) => p + 1)}>Sonraki</Button>
                                </motion.div>
                            </motion.div>
                        )}
                    </>
                ) : (
                    <motion.div className="text-center py-20" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
                        <p className="text-muted-foreground">{search || selectedCategory ? 'Arama kriterlerine uygun yazı bulunamadı.' : 'Henüz blog yazısı bulunmuyor.'}</p>
                    </motion.div>
                )}
            </Container>
        </div>
    )
}
