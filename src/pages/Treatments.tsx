import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Sparkles, Eye } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Container } from '@/components/layout'
import { LoadingPage } from '@/components/ui/loading'
import { useTreatments } from '@/hooks'
import { fadeInUp, staggerContainer, float } from '@/lib/animations'

export function TreatmentsPage() {
    const { treatments, loading, error } = useTreatments()

    if (loading) return <LoadingPage />
    if (error) return <div className="text-center py-20 text-destructive">Bir hata oluştu.</div>

    return (
        <div className="py-12 overflow-hidden">
            {/* Hero Section */}
            <section className="relative py-12 mb-8">
                <motion.div
                    className="absolute inset-0 pointer-events-none"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                >
                    <motion.div
                        variants={float}
                        initial="initial"
                        animate="animate"
                        className="absolute top-0 right-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl"
                    />
                    <motion.div
                        variants={float}
                        initial="initial"
                        animate="animate"
                        transition={{ delay: 1 }}
                        className="absolute bottom-0 left-1/4 w-48 h-48 bg-secondary/5 rounded-full blur-3xl"
                    />
                </motion.div>

                <Container className="relative z-10">
                    <motion.div
                        variants={staggerContainer}
                        initial="initial"
                        animate="animate"
                        className="text-center"
                    >
                        <motion.div
                            initial={{ scale: 0, rotate: -180 }}
                            animate={{ scale: 1, rotate: 0 }}
                            transition={{ type: 'spring', stiffness: 200, delay: 0.1 }}
                            className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6"
                        >
                            <Eye className="h-8 w-8 text-primary" />
                        </motion.div>
                        <motion.h1
                            variants={fadeInUp}
                            className="font-display text-4xl lg:text-5xl font-bold mb-4"
                        >
                            Tedavi Alanlarımız
                        </motion.h1>
                        <motion.p
                            variants={fadeInUp}
                            className="text-muted-foreground max-w-2xl mx-auto"
                        >
                            Modern teknoloji ve uzman kadromuzla göz sağlığınız için en iyi tedavi seçeneklerini sunuyoruz.
                        </motion.p>
                    </motion.div>
                </Container>
            </section>

            <Container>
                <motion.div
                    className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
                    variants={staggerContainer}
                    initial="initial"
                    animate="animate"
                >
                    {treatments.map((treatment, index) => (
                        <motion.div
                            key={treatment.id}
                            variants={fadeInUp}
                            custom={index}
                            whileHover={{ y: -10, scale: 1.02 }}
                            transition={{ type: 'spring', stiffness: 300 }}
                        >
                            <Link to={`/tedaviler/${treatment.slug}`}>
                                <Card className="h-full hover:shadow-xl transition-shadow group overflow-hidden">
                                    {treatment.images?.[0] && (
                                        <motion.div
                                            className="aspect-video overflow-hidden rounded-t-xl"
                                            whileHover={{ scale: 1.05 }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            <img
                                                src={treatment.images[0]}
                                                alt={treatment.title}
                                                className="w-full h-full object-cover transition-transform group-hover:scale-110 duration-500"
                                            />
                                        </motion.div>
                                    )}
                                    <CardContent className="p-6 relative">
                                        <motion.div
                                            className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300"
                                            whileHover={{ rotate: 360 }}
                                            transition={{ duration: 0.5 }}
                                        >
                                            <Sparkles className="h-6 w-6" />
                                        </motion.div>
                                        <h2 className="font-display font-semibold text-xl mb-2 group-hover:text-primary transition-colors">
                                            {treatment.title}
                                        </h2>
                                        <p className="text-muted-foreground text-sm line-clamp-3">
                                            {treatment.description}
                                        </p>
                                        <motion.div
                                            className="mt-4 flex items-center text-primary text-sm font-medium"
                                            initial={{ x: 0 }}
                                            whileHover={{ x: 5 }}
                                        >
                                            Detaylı Bilgi
                                            <motion.span
                                                animate={{ x: [0, 5, 0] }}
                                                transition={{ duration: 1.5, repeat: Infinity }}
                                            >
                                                <ArrowRight className="ml-2 h-4 w-4" />
                                            </motion.span>
                                        </motion.div>

                                        {/* Hover gradient */}
                                        <motion.div
                                            className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                                        />
                                    </CardContent>
                                </Card>
                            </Link>
                        </motion.div>
                    ))}
                </motion.div>
            </Container>
        </div>
    )
}
