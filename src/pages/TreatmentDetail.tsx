import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, ArrowRight, Phone, Calendar } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Container } from '@/components/layout'
import { LoadingPage } from '@/components/ui/loading'
import { useTreatment, useTreatments } from '@/hooks'
import { fadeInUp, fadeInLeft, fadeInRight, staggerContainer, float } from '@/lib/animations'

export function TreatmentDetailPage() {
    const { slug } = useParams<{ slug: string }>()
    const { treatment, loading, error } = useTreatment(slug || '')
    const { treatments } = useTreatments()

    const relatedTreatments = treatments.filter(t => t.slug !== slug).slice(0, 3)

    if (loading) return <LoadingPage />
    if (error || !treatment) {
        return (
            <Container className="py-20 text-center">
                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
                    <h1 className="text-2xl font-bold mb-4">Tedavi bulunamadı</h1>
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Button asChild><Link to="/tedaviler"><ArrowLeft className="mr-2 h-4 w-4" />Tedavilere Dön</Link></Button>
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

            <Container>
                <motion.div variants={staggerContainer} initial="initial" animate="animate">
                    <motion.div variants={fadeInLeft}>
                        <Link to="/tedaviler" className="inline-flex items-center text-muted-foreground hover:text-foreground mb-6 group">
                            <motion.span whileHover={{ x: -5 }} transition={{ type: 'spring', stiffness: 300 }}>
                                <ArrowLeft className="mr-2 h-4 w-4" />
                            </motion.span>
                            Tüm Tedaviler
                        </Link>
                    </motion.div>

                    <div className="grid lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-2">
                            <motion.h1 className="font-display text-4xl lg:text-5xl font-bold mb-4" variants={fadeInUp}>{treatment.title}</motion.h1>
                            <motion.p className="text-lg text-muted-foreground mb-8" variants={fadeInUp}>{treatment.description}</motion.p>

                            {treatment.images && treatment.images.length > 0 && (
                                <motion.div className="mb-8" variants={fadeInUp}>
                                    <motion.div className="aspect-video rounded-xl overflow-hidden mb-4" whileHover={{ scale: 1.02 }} transition={{ duration: 0.3 }}>
                                        <img src={treatment.images[0]} alt={treatment.title} className="w-full h-full object-cover" />
                                    </motion.div>
                                    {treatment.images.length > 1 && (
                                        <motion.div className="grid grid-cols-4 gap-2" variants={staggerContainer} initial="initial" animate="animate">
                                            {treatment.images.slice(1).map((img, index) => (
                                                <motion.div key={index} className="aspect-square rounded-lg overflow-hidden" variants={fadeInUp} whileHover={{ scale: 1.05 }}>
                                                    <img src={img} alt="" className="w-full h-full object-cover" />
                                                </motion.div>
                                            ))}
                                        </motion.div>
                                    )}
                                </motion.div>
                            )}

                            <motion.div className="prose prose-lg max-w-none" variants={fadeInUp} dangerouslySetInnerHTML={{ __html: treatment.content }} />
                        </div>

                        <motion.div className="lg:col-span-1" variants={fadeInRight}>
                            <div className="sticky top-24 space-y-6">
                                <motion.div whileHover={{ scale: 1.02 }} transition={{ type: 'spring', stiffness: 300 }}>
                                    <Card className="overflow-hidden group">
                                        <CardContent className="p-6 relative">
                                            <h3 className="font-display font-semibold text-lg mb-4">Randevu Alın</h3>
                                            <p className="text-sm text-muted-foreground mb-4">{treatment.title} hakkında detaylı bilgi almak ve muayene olmak için randevu alın.</p>
                                            <div className="space-y-3">
                                                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                                                    <Button className="w-full" asChild><Link to="/randevu"><Calendar className="mr-2 h-4 w-4" />Randevu Al</Link></Button>
                                                </motion.div>
                                                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                                                    <Button variant="outline" className="w-full" asChild><a href="tel:+903526060598"><Phone className="mr-2 h-4 w-4" />Hemen Ara</a></Button>
                                                </motion.div>
                                            </div>
                                            <motion.div className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                                        </CardContent>
                                    </Card>
                                </motion.div>

                                {relatedTreatments.length > 0 && (
                                    <motion.div whileHover={{ scale: 1.02 }} transition={{ type: 'spring', stiffness: 300 }}>
                                        <Card className="overflow-hidden">
                                            <CardContent className="p-6">
                                                <h3 className="font-display font-semibold text-lg mb-4">Diğer Tedaviler</h3>
                                                <motion.ul className="space-y-3" variants={staggerContainer} initial="initial" animate="animate">
                                                    {relatedTreatments.map((t, index) => (
                                                        <motion.li key={t.id} variants={fadeInUp} custom={index}>
                                                            <Link to={`/tedaviler/${t.slug}`} className="flex items-center justify-between text-sm hover:text-primary transition-colors group">
                                                                <span>{t.title}</span>
                                                                <motion.span animate={{ x: [0, 5, 0] }} transition={{ duration: 1.5, repeat: Infinity, delay: index * 0.2 }}>
                                                                    <ArrowRight className="h-4 w-4" />
                                                                </motion.span>
                                                            </Link>
                                                        </motion.li>
                                                    ))}
                                                </motion.ul>
                                            </CardContent>
                                        </Card>
                                    </motion.div>
                                )}
                            </div>
                        </motion.div>
                    </div>
                </motion.div>
            </Container>
        </div>
    )
}
