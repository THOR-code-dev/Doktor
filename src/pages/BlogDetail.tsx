import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, Calendar, User } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Container } from '@/components/layout'
import { LoadingPage } from '@/components/ui/loading'
import { useBlogPost, useRelatedPosts } from '@/hooks'
import { formatDate } from '@/lib/utils'
import { fadeInUp, fadeInLeft, staggerContainer, float } from '@/lib/animations'

export function BlogDetailPage() {
    const { slug } = useParams<{ slug: string }>()
    const { post, loading, error } = useBlogPost(slug || '')
    const { posts: relatedPosts } = useRelatedPosts(post?.id || '', post?.category_id || null)

    if (loading) return <LoadingPage />
    if (error || !post) {
        return (
            <Container className="py-20 text-center">
                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
                    <h1 className="text-2xl font-bold mb-4">Yazı bulunamadı</h1>
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Button asChild><Link to="/blog"><ArrowLeft className="mr-2 h-4 w-4" />Blog'a Dön</Link></Button>
                    </motion.div>
                </motion.div>
            </Container>
        )
    }

    return (
        <div className="py-12 overflow-hidden">
            <motion.div className="fixed inset-0 pointer-events-none -z-10" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <motion.div variants={float} initial="initial" animate="animate" className="absolute top-20 right-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
                <motion.div variants={float} initial="initial" animate="animate" transition={{ delay: 1 }} className="absolute bottom-20 left-10 w-96 h-96 bg-secondary/5 rounded-full blur-3xl" />
            </motion.div>

            <Container size="md">
                <motion.article variants={staggerContainer} initial="initial" animate="animate">
                    <motion.div variants={fadeInLeft}>
                        <Link to="/blog" className="inline-flex items-center text-muted-foreground hover:text-foreground mb-6 group">
                            <motion.span whileHover={{ x: -5 }} transition={{ type: 'spring', stiffness: 300 }}>
                                <ArrowLeft className="mr-2 h-4 w-4" />
                            </motion.span>
                            Tüm Yazılar
                        </Link>
                    </motion.div>

                    <motion.header className="mb-8" variants={fadeInUp}>
                        <motion.h1 className="font-display text-4xl lg:text-5xl font-bold mb-4" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>{post.title}</motion.h1>
                        <motion.div className="flex items-center gap-4 text-sm text-muted-foreground" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
                            {post.published_at && (
                                <motion.span className="flex items-center gap-1" whileHover={{ scale: 1.05 }}>
                                    <Calendar className="h-4 w-4" />{formatDate(post.published_at)}
                                </motion.span>
                            )}
                            <motion.span className="flex items-center gap-1" whileHover={{ scale: 1.05 }}>
                                <User className="h-4 w-4" />Doç. Dr. Fatih Çakır Gündoğan
                            </motion.span>
                        </motion.div>
                    </motion.header>

                    {post.featured_image && (
                        <motion.div className="aspect-video rounded-xl overflow-hidden mb-8" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.4 }} whileHover={{ scale: 1.02 }}>
                            <img src={post.featured_image} alt={post.title} className="w-full h-full object-cover" />
                        </motion.div>
                    )}

                    <motion.div className="prose prose-lg max-w-none mb-12" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} dangerouslySetInnerHTML={{ __html: post.content }} />

                    {relatedPosts.length > 0 && (
                        <motion.section className="border-t pt-12" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
                            <motion.h2 className="font-display text-2xl font-bold mb-6" initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>İlgili Yazılar</motion.h2>
                            <motion.div className="grid md:grid-cols-3 gap-6" variants={staggerContainer} initial="initial" whileInView="animate" viewport={{ once: true }}>
                                {relatedPosts.map((relatedPost, index) => (
                                    <motion.div key={relatedPost.id} variants={fadeInUp} custom={index} whileHover={{ y: -10, scale: 1.02 }} transition={{ type: 'spring', stiffness: 300 }}>
                                        <Link to={`/blog/${relatedPost.slug}`}>
                                            <Card className="h-full hover:shadow-xl transition-shadow overflow-hidden group">
                                                {relatedPost.featured_image && (
                                                    <motion.div className="aspect-video overflow-hidden rounded-t-xl" whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }}>
                                                        <img src={relatedPost.featured_image} alt={relatedPost.title} className="w-full h-full object-cover transition-transform group-hover:scale-110 duration-500" />
                                                    </motion.div>
                                                )}
                                                <CardContent className="p-4">
                                                    <h3 className="font-semibold line-clamp-2 group-hover:text-primary transition-colors">{relatedPost.title}</h3>
                                                </CardContent>
                                            </Card>
                                        </Link>
                                    </motion.div>
                                ))}
                            </motion.div>
                        </motion.section>
                    )}
                </motion.article>
            </Container>
        </div>
    )
}
