import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight, Phone, Calendar, Eye, Sparkles, Activity, Star, Shield, Clock } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Container } from '@/components/layout'
import { LoadingPage } from '@/components/ui/loading'
import { useTreatments, useBlogPosts, useDoctorInfo } from '@/hooks'
import { formatDate } from '@/lib/utils'
import { fadeInUp, fadeInRight, staggerContainer, scaleInBounce, float, pulse } from '@/lib/animations'

const stats = [
    { icon: Star, value: '15+', label: 'Yıllık Deneyim' },
    { icon: Shield, value: '10000+', label: 'Başarılı Ameliyat' },
    { icon: Clock, value: '24/7', label: 'Destek' },
]

export function HomePage() {
    const { doctor, loading: doctorLoading } = useDoctorInfo()
    const { treatments, loading: treatmentsLoading } = useTreatments()
    const { posts, loading: postsLoading } = useBlogPosts({ pageSize: 3 })

    const { scrollYProgress } = useScroll()
    const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '50%'])

    if (doctorLoading) return <LoadingPage />

    return (
        <div className="overflow-hidden">
            {/* Hero Section */}
            <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-gradient-to-br from-primary/5 via-background to-secondary/5">
                {/* Animated background elements */}
                <motion.div
                    className="absolute inset-0 pointer-events-none"
                    style={{ y: backgroundY }}
                >
                    <motion.div
                        variants={float}
                        initial="initial"
                        animate="animate"
                        className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl"
                    />
                    <motion.div
                        variants={float}
                        initial="initial"
                        animate="animate"
                        transition={{ delay: 1 }}
                        className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/5 rounded-full blur-3xl"
                    />
                </motion.div>

                <Container className="relative z-10 py-20">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <motion.div
                            variants={staggerContainer}
                            initial="initial"
                            animate="animate"
                        >
                            <motion.span
                                variants={fadeInUp}
                                className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6"
                            >
                                Göz Hastalıkları Uzmanı
                            </motion.span>
                            <motion.h1
                                variants={fadeInUp}
                                className="font-display text-4xl lg:text-6xl font-bold mb-6"
                            >
                                {doctor?.title || 'Doç. Dr.'}{' '}
                                <motion.span
                                    className="text-primary inline-block"
                                    initial={{ opacity: 0, scale: 0.5 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
                                >
                                    {doctor?.name || 'Fatih Çakır Gündoğan'}
                                </motion.span>
                            </motion.h1>
                            <motion.p
                                variants={fadeInUp}
                                className="text-lg text-muted-foreground mb-8 max-w-lg"
                            >
                                {doctor?.bio || 'Uluslararası ve Avrupa Yeterlilik Sertifikası sahibi, deneyimli göz hastalıkları uzmanı.'}
                            </motion.p>
                            <motion.div
                                variants={fadeInUp}
                                className="flex flex-wrap gap-4"
                            >
                                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                    <Button size="lg" asChild>
                                        <Link to="/randevu">
                                            <Calendar className="mr-2 h-5 w-5" />
                                            Randevu Al
                                        </Link>
                                    </Button>
                                </motion.div>
                                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                    <Button size="lg" variant="outline" asChild>
                                        <a href="tel:+903526060598">
                                            <Phone className="mr-2 h-5 w-5" />
                                            Hemen Ara
                                        </a>
                                    </Button>
                                </motion.div>
                            </motion.div>
                        </motion.div>

                        <motion.div
                            variants={fadeInRight}
                            initial="initial"
                            animate="animate"
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="relative"
                        >
                            <motion.div
                                className="aspect-square rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 p-8 flex items-center justify-center relative"
                                whileHover={{ scale: 1.02 }}
                                transition={{ type: 'spring', stiffness: 300 }}
                            >
                                <motion.div
                                    variants={pulse}
                                    initial="initial"
                                    animate="animate"
                                >
                                    <Eye className="w-48 h-48 text-primary/30" />
                                </motion.div>

                                {/* Floating badges */}
                                <motion.div
                                    className="absolute -top-4 -right-4 bg-background shadow-lg rounded-xl p-3"
                                    initial={{ opacity: 0, scale: 0, rotate: -10 }}
                                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                                    transition={{ delay: 0.5, type: 'spring' }}
                                >
                                    <div className="flex items-center gap-2">
                                        <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                                        <span className="font-semibold">4.9</span>
                                    </div>
                                </motion.div>

                                <motion.div
                                    className="absolute -bottom-4 -left-4 bg-background shadow-lg rounded-xl p-3"
                                    initial={{ opacity: 0, scale: 0, rotate: 10 }}
                                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                                    transition={{ delay: 0.7, type: 'spring' }}
                                >
                                    <div className="flex items-center gap-2">
                                        <Shield className="h-5 w-5 text-primary" />
                                        <span className="text-sm font-medium">Sertifikalı</span>
                                    </div>
                                </motion.div>
                            </motion.div>
                        </motion.div>
                    </div>
                </Container>
            </section>

            {/* Stats Section */}
            <section className="py-12 bg-primary text-primary-foreground">
                <Container>
                    <motion.div
                        className="grid grid-cols-3 gap-8"
                        variants={staggerContainer}
                        initial="initial"
                        whileInView="animate"
                        viewport={{ once: true }}
                    >
                        {stats.map((stat, index) => (
                            <motion.div
                                key={index}
                                variants={scaleInBounce}
                                className="text-center"
                            >
                                <motion.div
                                    whileHover={{ rotate: 360 }}
                                    transition={{ duration: 0.5 }}
                                    className="inline-block"
                                >
                                    <stat.icon className="h-8 w-8 mx-auto mb-2 opacity-80" />
                                </motion.div>
                                <motion.div
                                    className="text-3xl lg:text-4xl font-bold"
                                    initial={{ opacity: 0, scale: 0 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 + 0.2, type: 'spring' }}
                                >
                                    {stat.value}
                                </motion.div>
                                <div className="text-sm opacity-80">{stat.label}</div>
                            </motion.div>
                        ))}
                    </motion.div>
                </Container>
            </section>

            {/* Treatments Section */}
            <section className="py-20">
                <Container>
                    <motion.div
                        variants={fadeInUp}
                        initial="initial"
                        whileInView="animate"
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <motion.span
                            className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                        >
                            Hizmetlerimiz
                        </motion.span>
                        <h2 className="font-display text-3xl lg:text-4xl font-bold mb-4">Tedavi Alanlarımız</h2>
                        <p className="text-muted-foreground max-w-2xl mx-auto">
                            Modern teknoloji ve uzman kadromuzla göz sağlığınız için en iyi tedavi seçeneklerini sunuyoruz.
                        </p>
                    </motion.div>

                    {treatmentsLoading ? (
                        <LoadingPage />
                    ) : (
                        <motion.div
                            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
                            variants={staggerContainer}
                            initial="initial"
                            whileInView="animate"
                            viewport={{ once: true }}
                        >
                            {treatments.slice(0, 6).map((treatment, index) => (
                                <motion.div
                                    key={treatment.id}
                                    variants={fadeInUp}
                                    custom={index}
                                    whileHover={{ y: -10 }}
                                    transition={{ type: 'spring', stiffness: 300 }}
                                >
                                    <Link to={`/tedaviler/${treatment.slug}`}>
                                        <Card className="h-full hover:shadow-xl transition-shadow group overflow-hidden">
                                            <CardContent className="p-6 relative">
                                                <motion.div
                                                    className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                                                    whileHover={{ rotate: 360 }}
                                                    transition={{ duration: 0.5 }}
                                                >
                                                    <Sparkles className="h-6 w-6" />
                                                </motion.div>
                                                <h3 className="font-display font-semibold text-xl mb-2">{treatment.title}</h3>
                                                <p className="text-muted-foreground text-sm line-clamp-2">
                                                    {treatment.description}
                                                </p>
                                                <motion.div
                                                    className="mt-4 flex items-center text-primary text-sm font-medium"
                                                    initial={{ x: 0 }}
                                                    whileHover={{ x: 5 }}
                                                >
                                                    Detaylı Bilgi
                                                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                                                </motion.div>

                                                {/* Hover gradient overlay */}
                                                <motion.div
                                                    className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                                                />
                                            </CardContent>
                                        </Card>
                                    </Link>
                                </motion.div>
                            ))}
                        </motion.div>
                    )}

                    <motion.div
                        className="text-center mt-10"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            <Button variant="outline" size="lg" asChild>
                                <Link to="/tedaviler">
                                    Tüm Tedavileri Gör
                                    <ArrowRight className="ml-2 h-5 w-5" />
                                </Link>
                            </Button>
                        </motion.div>
                    </motion.div>
                </Container>
            </section>

            {/* Blog Section */}
            <section className="py-20 bg-muted/30 relative overflow-hidden">
                <motion.div
                    className="absolute inset-0 pointer-events-none"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                >
                    <div className="absolute top-0 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
                    <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-secondary/5 rounded-full blur-3xl" />
                </motion.div>

                <Container className="relative z-10">
                    <motion.div
                        variants={fadeInUp}
                        initial="initial"
                        whileInView="animate"
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <motion.span
                            className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4"
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                        >
                            Blog
                        </motion.span>
                        <h2 className="font-display text-3xl lg:text-4xl font-bold mb-4">Blog Yazılarım</h2>
                        <p className="text-muted-foreground max-w-2xl mx-auto">
                            Göz sağlığı hakkında bilgilendirici yazılar ve güncel gelişmeler.
                        </p>
                    </motion.div>

                    {postsLoading ? (
                        <LoadingPage />
                    ) : posts.length > 0 ? (
                        <motion.div
                            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
                            variants={staggerContainer}
                            initial="initial"
                            whileInView="animate"
                            viewport={{ once: true }}
                        >
                            {posts.map((post, index) => (
                                <motion.div
                                    key={post.id}
                                    variants={fadeInUp}
                                    custom={index}
                                    whileHover={{ y: -10 }}
                                    transition={{ type: 'spring', stiffness: 300 }}
                                >
                                    <Link to={`/blog/${post.slug}`}>
                                        <Card className="h-full hover:shadow-xl transition-shadow overflow-hidden group">
                                            {post.featured_image && (
                                                <motion.div
                                                    className="aspect-video overflow-hidden"
                                                    whileHover={{ scale: 1.05 }}
                                                    transition={{ duration: 0.3 }}
                                                >
                                                    <img
                                                        src={post.featured_image}
                                                        alt={post.title}
                                                        className="w-full h-full object-cover transition-transform group-hover:scale-110"
                                                    />
                                                </motion.div>
                                            )}
                                            <CardContent className="p-6">
                                                <time className="text-sm text-muted-foreground">
                                                    {post.published_at && formatDate(post.published_at)}
                                                </time>
                                                <h3 className="font-display font-semibold text-xl mt-2 mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                                                    {post.title}
                                                </h3>
                                                <p className="text-muted-foreground text-sm line-clamp-2">{post.excerpt}</p>
                                            </CardContent>
                                        </Card>
                                    </Link>
                                </motion.div>
                            ))}
                        </motion.div>
                    ) : (
                        <p className="text-center text-muted-foreground">Henüz blog yazısı bulunmuyor.</p>
                    )}

                    <motion.div
                        className="text-center mt-10"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            <Button variant="outline" size="lg" asChild>
                                <Link to="/blog">
                                    Tüm Yazıları Gör
                                    <ArrowRight className="ml-2 h-5 w-5" />
                                </Link>
                            </Button>
                        </motion.div>
                    </motion.div>
                </Container>
            </section>

            {/* CTA Section */}
            <section className="py-20">
                <Container size="md">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 50 }}
                        whileInView={{ opacity: 1, scale: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ type: 'spring', stiffness: 100 }}
                        whileHover={{ scale: 1.02 }}
                        className="bg-gradient-to-r from-primary to-primary/80 rounded-2xl p-8 lg:p-12 text-center text-primary-foreground relative overflow-hidden"
                    >
                        {/* Animated background circles */}
                        <motion.div
                            className="absolute top-0 left-0 w-32 h-32 bg-white/10 rounded-full -translate-x-1/2 -translate-y-1/2"
                            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
                            transition={{ duration: 3, repeat: Infinity }}
                        />
                        <motion.div
                            className="absolute bottom-0 right-0 w-48 h-48 bg-white/10 rounded-full translate-x-1/2 translate-y-1/2"
                            animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.4, 0.2] }}
                            transition={{ duration: 4, repeat: Infinity, delay: 1 }}
                        />

                        <motion.div
                            initial={{ scale: 0 }}
                            whileInView={{ scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2, type: 'spring' }}
                        >
                            <Activity className="h-12 w-12 mx-auto mb-6 opacity-80" />
                        </motion.div>
                        <motion.h2
                            className="font-display text-3xl lg:text-4xl font-bold mb-4 relative z-10"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3 }}
                        >
                            Göz Sağlığınız İçin Buradayız
                        </motion.h2>
                        <motion.p
                            className="text-primary-foreground/80 max-w-xl mx-auto mb-8 relative z-10"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.4 }}
                        >
                            Uzman kadromuz ve modern teknolojimizle size en iyi hizmeti sunmak için hazırız.
                            Hemen randevu alın.
                        </motion.p>
                        <motion.div
                            className="flex flex-wrap justify-center gap-4 relative z-10"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.5 }}
                        >
                            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                <Button size="lg" variant="secondary" asChild>
                                    <Link to="/randevu">Randevu Al</Link>
                                </Button>
                            </motion.div>
                            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                <Button size="lg" variant="outline" className="bg-transparent border-primary-foreground/30 hover:bg-primary-foreground/10" asChild>
                                    <Link to="/iletisim">İletişime Geç</Link>
                                </Button>
                            </motion.div>
                        </motion.div>
                    </motion.div>
                </Container>
            </section>
        </div>
    )
}
