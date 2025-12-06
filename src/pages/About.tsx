import { motion } from 'framer-motion'
import { GraduationCap, Award, Briefcase, Eye, CheckCircle } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Container } from '@/components/layout'
import { LoadingPage } from '@/components/ui/loading'
import { useDoctorInfo } from '@/hooks'
import { fadeInUp, fadeInLeft, fadeInRight, staggerContainer, scaleInBounce, float } from '@/lib/animations'

export function AboutPage() {
    const { doctor, loading } = useDoctorInfo()

    if (loading) return <LoadingPage />

    const defaultDoctor = {
        name: 'Fatih Çakır Gündoğan',
        title: 'Doç. Dr.',
        specialty: 'Göz Hastalıkları Uzmanı',
        photo: null as string | null,
        bio: 'Uluslararası ve Avrupa Yeterlilik Sertifikası sahibi, deneyimli göz hastalıkları uzmanı.',
        certifications: ['Uluslararası Yeterlilik Sertifikası', 'Avrupa Yeterlilik Sertifikası'],
        education: ['Tıp Fakültesi Mezuniyeti', 'Göz Hastalıkları Uzmanlık Eğitimi', 'Doçentlik'],
        experience: ['Katarakt Cerrahisi', 'Göz Çizdirme (Excimer Laser)', 'Akıllı Lens Uygulamaları', 'Göz Tansiyonu Tedavisi', 'Retina Hastalıkları'],
    }

    const info = doctor || defaultDoctor

    return (
        <div className="py-12 overflow-hidden">
            <motion.div className="fixed inset-0 pointer-events-none -z-10" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <motion.div variants={float} initial="initial" animate="animate" className="absolute top-20 right-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
                <motion.div variants={float} initial="initial" animate="animate" transition={{ delay: 1 }} className="absolute bottom-20 left-10 w-96 h-96 bg-secondary/5 rounded-full blur-3xl" />
            </motion.div>

            <Container>
                <motion.div variants={staggerContainer} initial="initial" animate="animate" className="text-center mb-12">
                    <motion.div initial={{ scale: 0, rotate: -180 }} animate={{ scale: 1, rotate: 0 }} transition={{ type: 'spring', stiffness: 200 }} className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6">
                        <Eye className="h-8 w-8 text-primary" />
                    </motion.div>
                    <motion.h1 variants={fadeInUp} className="font-display text-4xl lg:text-5xl font-bold mb-4">Özgeçmiş</motion.h1>
                    <motion.p variants={fadeInUp} className="text-muted-foreground max-w-2xl mx-auto">{info.title} {info.name} hakkında bilgi edinin.</motion.p>
                </motion.div>

                <div className="grid lg:grid-cols-3 gap-8">
                    <motion.div variants={fadeInLeft} initial="initial" animate="animate" transition={{ delay: 0.2 }}>
                        <Card className="sticky top-24 overflow-hidden">
                            <CardContent className="p-6 text-center relative">
                                <motion.div className="w-32 h-32 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center mx-auto mb-6 relative" whileHover={{ scale: 1.1, rotate: 5 }} transition={{ type: 'spring', stiffness: 300 }}>
                                    {info.photo ? <img src={info.photo} alt={info.name} className="w-full h-full rounded-full object-cover" /> : <Eye className="w-16 h-16 text-primary/50" />}
                                    <motion.div className="absolute inset-0 rounded-full border-2 border-primary/30" animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0, 0.5] }} transition={{ duration: 2, repeat: Infinity }} />
                                </motion.div>
                                <motion.h2 className="font-display text-2xl font-bold mb-1" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>{info.title} {info.name}</motion.h2>
                                <motion.p className="text-primary font-medium mb-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>{info.specialty}</motion.p>
                                <motion.p className="text-sm text-muted-foreground" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>{info.bio}</motion.p>
                            </CardContent>
                        </Card>
                    </motion.div>

                    <div className="lg:col-span-2 space-y-6">
                        <motion.div variants={fadeInRight} initial="initial" animate="animate" transition={{ delay: 0.3 }} whileHover={{ scale: 1.02 }}>
                            <Card className="overflow-hidden group">
                                <CardContent className="p-6">
                                    <div className="flex items-center gap-3 mb-4">
                                        <motion.div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-colors" whileHover={{ rotate: 360 }} transition={{ duration: 0.5 }}><Award className="h-5 w-5" /></motion.div>
                                        <h3 className="font-display text-xl font-semibold">Sertifikalar</h3>
                                    </div>
                                    <motion.ul className="space-y-3" variants={staggerContainer} initial="initial" whileInView="animate" viewport={{ once: true }}>
                                        {info.certifications.map((cert, index) => (
                                            <motion.li key={index} className="flex items-center gap-3 text-muted-foreground" variants={scaleInBounce} custom={index}>
                                                <CheckCircle className="h-5 w-5 text-primary" />{cert}
                                            </motion.li>
                                        ))}
                                    </motion.ul>
                                </CardContent>
                            </Card>
                        </motion.div>

                        <motion.div variants={fadeInRight} initial="initial" animate="animate" transition={{ delay: 0.4 }} whileHover={{ scale: 1.02 }}>
                            <Card className="overflow-hidden group">
                                <CardContent className="p-6">
                                    <div className="flex items-center gap-3 mb-4">
                                        <motion.div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-colors" whileHover={{ rotate: 360 }} transition={{ duration: 0.5 }}><GraduationCap className="h-5 w-5" /></motion.div>
                                        <h3 className="font-display text-xl font-semibold">Eğitim</h3>
                                    </div>
                                    <motion.ul className="space-y-3" variants={staggerContainer} initial="initial" whileInView="animate" viewport={{ once: true }}>
                                        {info.education.map((edu, index) => (
                                            <motion.li key={index} className="flex items-center gap-3 text-muted-foreground" variants={scaleInBounce} custom={index}>
                                                <CheckCircle className="h-5 w-5 text-primary" />{edu}
                                            </motion.li>
                                        ))}
                                    </motion.ul>
                                </CardContent>
                            </Card>
                        </motion.div>

                        <motion.div variants={fadeInRight} initial="initial" animate="animate" transition={{ delay: 0.5 }} whileHover={{ scale: 1.02 }}>
                            <Card className="overflow-hidden group">
                                <CardContent className="p-6">
                                    <div className="flex items-center gap-3 mb-4">
                                        <motion.div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-colors" whileHover={{ rotate: 360 }} transition={{ duration: 0.5 }}><Briefcase className="h-5 w-5" /></motion.div>
                                        <h3 className="font-display text-xl font-semibold">Uzmanlık Alanları</h3>
                                    </div>
                                    <motion.ul className="space-y-3" variants={staggerContainer} initial="initial" whileInView="animate" viewport={{ once: true }}>
                                        {info.experience.map((exp, index) => (
                                            <motion.li key={index} className="flex items-center gap-3 text-muted-foreground" variants={scaleInBounce} custom={index}>
                                                <CheckCircle className="h-5 w-5 text-primary" />{exp}
                                            </motion.li>
                                        ))}
                                    </motion.ul>
                                </CardContent>
                            </Card>
                        </motion.div>
                    </div>
                </div>
            </Container>
        </div>
    )
}
