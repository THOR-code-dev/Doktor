import { motion } from 'framer-motion'
import { Calendar, Phone, MessageCircle, ExternalLink, Clock, CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Container } from '@/components/layout'
import { fadeInUp, staggerContainer, scaleInBounce, float } from '@/lib/animations'

const appointmentMethods = [
    { icon: Calendar, title: 'Online Randevu', description: 'Doktortakvimi.com üzerinden online randevu alabilirsiniz.', href: 'https://www.doktortakvimi.com/fatih-cakir-gundogan/goz-hastaliklari/kayseri', buttonText: 'Randevu Al', buttonIcon: ExternalLink, color: 'bg-primary', external: true },
    { icon: Phone, title: 'Telefonla Randevu', description: 'Bizi arayarak randevu alabilirsiniz.', href: 'tel:+903526060598', buttonText: '+90 352 606 0598', buttonIcon: Phone, variant: 'outline' as const },
]

const tips = [
    'Randevunuza 10 dakika önce gelmenizi rica ederiz.',
    'Varsa daha önce çekilmiş göz muayene raporlarınızı getirin.',
    'Kullandığınız ilaçların listesini yanınızda bulundurun.',
    'Göz damlası damlatılacağı için araç kullanmayın.',
]

export function AppointmentPage() {
    return (
        <div className="py-12 overflow-hidden">
            <motion.div className="fixed inset-0 pointer-events-none -z-10" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <motion.div variants={float} initial="initial" animate="animate" className="absolute top-20 right-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
                <motion.div variants={float} initial="initial" animate="animate" transition={{ delay: 1 }} className="absolute bottom-20 left-10 w-96 h-96 bg-secondary/5 rounded-full blur-3xl" />
            </motion.div>

            <Container size="md">
                <motion.div variants={staggerContainer} initial="initial" animate="animate" className="text-center mb-12">
                    <motion.div initial={{ scale: 0, rotate: -180 }} animate={{ scale: 1, rotate: 0 }} transition={{ type: 'spring', stiffness: 200 }} className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6">
                        <Calendar className="h-8 w-8 text-primary" />
                    </motion.div>
                    <motion.h1 variants={fadeInUp} className="font-display text-4xl lg:text-5xl font-bold mb-4">Randevu Alın</motion.h1>
                    <motion.p variants={fadeInUp} className="text-muted-foreground max-w-2xl mx-auto">Muayene olmak için aşağıdaki yöntemlerden birini kullanarak randevu alabilirsiniz.</motion.p>
                </motion.div>

                <motion.div className="grid md:grid-cols-2 gap-6 mb-8" variants={staggerContainer} initial="initial" animate="animate">
                    {appointmentMethods.map((method, index) => (
                        <motion.div key={index} variants={scaleInBounce} custom={index} whileHover={{ y: -10, scale: 1.02 }} transition={{ type: 'spring', stiffness: 300 }}>
                            <Card className="h-full overflow-hidden group">
                                <CardContent className="p-8 text-center relative">
                                    <motion.div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6 group-hover:bg-primary group-hover:text-primary-foreground transition-colors" whileHover={{ rotate: 360 }} transition={{ duration: 0.5 }}>
                                        <method.icon className="h-8 w-8" />
                                    </motion.div>
                                    <h2 className="font-display text-xl font-semibold mb-3">{method.title}</h2>
                                    <p className="text-muted-foreground mb-6">{method.description}</p>
                                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                        <Button className={`w-full ${method.color || ''}`} size="lg" variant={method.variant || 'default'} asChild>
                                            <a href={method.href} target={method.external ? '_blank' : undefined} rel={method.external ? 'noopener noreferrer' : undefined}>
                                                <method.buttonIcon className="mr-2 h-5 w-5" />{method.buttonText}
                                            </a>
                                        </Button>
                                    </motion.div>
                                    <motion.div className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </motion.div>

                <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} whileHover={{ scale: 1.02 }}>
                    <Card className="overflow-hidden group">
                        <CardContent className="p-8 text-center relative">
                            <motion.div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-6 group-hover:bg-green-500 group-hover:text-white transition-colors" whileHover={{ rotate: 360 }} transition={{ duration: 0.5 }}>
                                <MessageCircle className="h-8 w-8 text-green-500 group-hover:text-white" />
                            </motion.div>
                            <h2 className="font-display text-xl font-semibold mb-3">WhatsApp ile Randevu</h2>
                            <p className="text-muted-foreground mb-6">WhatsApp üzerinden mesaj göndererek randevu alabilirsiniz.</p>
                            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                <Button className="bg-green-500 hover:bg-green-600" size="lg" asChild>
                                    <a href="https://wa.me/903526060598" target="_blank" rel="noopener noreferrer">
                                        <MessageCircle className="mr-2 h-5 w-5" />WhatsApp ile İletişime Geç
                                    </a>
                                </Button>
                            </motion.div>
                        </CardContent>
                    </Card>
                </motion.div>

                <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="mt-12">
                    <Card className="bg-muted/50 overflow-hidden">
                        <CardContent className="p-6">
                            <div className="flex items-center gap-3 mb-4">
                                <motion.div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center" whileHover={{ rotate: 360 }} transition={{ duration: 0.5 }}>
                                    <Clock className="h-5 w-5 text-primary" />
                                </motion.div>
                                <h3 className="font-semibold">Randevu Öncesi Bilgilendirme</h3>
                            </div>
                            <motion.ul className="space-y-3" variants={staggerContainer} initial="initial" whileInView="animate" viewport={{ once: true }}>
                                {tips.map((tip, index) => (
                                    <motion.li key={index} className="flex items-start gap-3 text-sm text-muted-foreground" variants={scaleInBounce} custom={index}>
                                        <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: index * 0.1 + 0.8, type: 'spring' }}>
                                            <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                                        </motion.span>
                                        {tip}
                                    </motion.li>
                                ))}
                            </motion.ul>
                        </CardContent>
                    </Card>
                </motion.div>
            </Container>
        </div>
    )
}
