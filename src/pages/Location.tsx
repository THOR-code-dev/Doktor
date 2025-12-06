import { motion } from 'framer-motion'
import { MapPin, Navigation, Phone, Clock } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Container } from '@/components/layout'
import { fadeInUp, fadeInLeft, fadeInRight, staggerContainer, float } from '@/lib/animations'

const workingHours = [
    { day: 'Pazartesi - Cuma', hours: '09:00 - 18:00' },
    { day: 'Cumartesi', hours: '09:00 - 14:00' },
    { day: 'Pazar', hours: 'Kapalı' },
]

export function LocationPage() {
    const address = 'Hunat Mah, Nuh Mehmet Baldöktü Sok, Özer Plaza, No: 3/18, Melikgazi, Kayseri'
    const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`

    return (
        <div className="py-12 overflow-hidden">
            <motion.div className="fixed inset-0 pointer-events-none -z-10" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <motion.div variants={float} initial="initial" animate="animate" className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
                <motion.div variants={float} initial="initial" animate="animate" transition={{ delay: 1 }} className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/5 rounded-full blur-3xl" />
            </motion.div>

            <Container>
                <motion.div variants={staggerContainer} initial="initial" animate="animate" className="text-center mb-12">
                    <motion.div initial={{ scale: 0, rotate: -180 }} animate={{ scale: 1, rotate: 0 }} transition={{ type: 'spring', stiffness: 200 }} className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6">
                        <MapPin className="h-8 w-8 text-primary" />
                    </motion.div>
                    <motion.h1 variants={fadeInUp} className="font-display text-4xl lg:text-5xl font-bold mb-4">Muayenehane Konumu</motion.h1>
                    <motion.p variants={fadeInUp} className="text-muted-foreground max-w-2xl mx-auto">Muayenehanemize nasıl ulaşacağınızı öğrenin.</motion.p>
                </motion.div>

                <div className="grid lg:grid-cols-3 gap-8">
                    <motion.div className="lg:col-span-2" variants={fadeInLeft} initial="initial" animate="animate" transition={{ delay: 0.2 }}>
                        <Card className="overflow-hidden group">
                            <motion.div className="aspect-video relative" whileHover={{ scale: 1.02 }} transition={{ duration: 0.3 }}>
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3108.5!2d35.4833!3d38.7333!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzjCsDQ0JzAwLjAiTiAzNcKwMjknMDAuMCJF!5e0!3m2!1str!2str!4v1234567890"
                                    width="100%"
                                    height="100%"
                                    style={{ border: 0 }}
                                    allowFullScreen
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                    title="Muayenehane Konumu"
                                    className="absolute inset-0"
                                />
                                <motion.div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                            </motion.div>
                        </Card>
                    </motion.div>

                    <motion.div className="space-y-6" variants={staggerContainer} initial="initial" animate="animate">
                        <motion.div variants={fadeInRight} whileHover={{ scale: 1.02, x: -5 }} transition={{ type: 'spring', stiffness: 300 }}>
                            <Card className="overflow-hidden group">
                                <CardContent className="p-6">
                                    <div className="flex items-start gap-4">
                                        <motion.div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary group-hover:text-primary-foreground transition-colors" whileHover={{ rotate: 360 }} transition={{ duration: 0.5 }}>
                                            <MapPin className="h-6 w-6" />
                                        </motion.div>
                                        <div>
                                            <h3 className="font-semibold mb-2">Adres</h3>
                                            <p className="text-sm text-muted-foreground">{address}</p>
                                            <p className="text-sm text-muted-foreground mt-2 italic">(Seyyit Burhanettin Türbesinin hemen yanındaki dışı cam kaplı iki plazadan altında A101 market olandır)</p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>

                        <motion.div variants={fadeInRight} whileHover={{ scale: 1.02, x: -5 }} transition={{ type: 'spring', stiffness: 300 }}>
                            <Card className="overflow-hidden group">
                                <CardContent className="p-6">
                                    <div className="flex items-start gap-4">
                                        <motion.div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary group-hover:text-primary-foreground transition-colors" whileHover={{ rotate: 360 }} transition={{ duration: 0.5 }}>
                                            <Clock className="h-6 w-6" />
                                        </motion.div>
                                        <div className="flex-1">
                                            <h3 className="font-semibold mb-2">Çalışma Saatleri</h3>
                                            <ul className="text-sm text-muted-foreground space-y-1">
                                                {workingHours.map((item, index) => (
                                                    <motion.li key={index} className="flex justify-between" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.1 + 0.5 }}>
                                                        <span>{item.day}</span>
                                                        <span className={item.hours === 'Kapalı' ? 'text-destructive' : ''}>{item.hours}</span>
                                                    </motion.li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>

                        <motion.div variants={fadeInRight} whileHover={{ scale: 1.02, x: -5 }} transition={{ type: 'spring', stiffness: 300 }}>
                            <Card className="overflow-hidden group">
                                <CardContent className="p-6">
                                    <div className="flex items-start gap-4">
                                        <motion.div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary group-hover:text-primary-foreground transition-colors" whileHover={{ rotate: 360 }} transition={{ duration: 0.5 }}>
                                            <Phone className="h-6 w-6" />
                                        </motion.div>
                                        <div>
                                            <h3 className="font-semibold mb-2">İletişim</h3>
                                            <a href="tel:+903526060598" className="text-sm text-muted-foreground hover:text-primary transition-colors">+90 352 606 0598</a>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>

                        <motion.div variants={fadeInRight} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            <Button className="w-full" size="lg" asChild>
                                <a href={googleMapsUrl} target="_blank" rel="noopener noreferrer">
                                    <Navigation className="mr-2 h-5 w-5" />Yol Tarifi Al
                                </a>
                            </Button>
                        </motion.div>
                    </motion.div>
                </div>
            </Container>
        </div>
    )
}
