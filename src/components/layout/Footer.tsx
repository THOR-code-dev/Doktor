import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Phone, Mail, MapPin, Facebook, Instagram, Twitter, Youtube, Heart } from 'lucide-react'

const quickLinks = [
    { label: 'Göz Çizdirme', href: '/tedaviler/goz-cizdirme' },
    { label: 'Katarakt Ameliyatı', href: '/tedaviler/katarakt' },
    { label: 'Akıllı Mercekler', href: '/tedaviler/akilli-lens' },
    { label: 'Göz Tansiyonu', href: '/tedaviler/goz-tansiyonu' },
]

const socialLinks = [
    { icon: Facebook, href: 'https://facebook.com/doc.dr.fatih.c.gundogan', label: 'Facebook', color: 'hover:bg-blue-600' },
    { icon: Instagram, href: 'https://instagram.com/doc.dr.fatih.c.gundogan', label: 'Instagram', color: 'hover:bg-pink-600' },
    { icon: Twitter, href: 'https://twitter.com/docdrfcgundogan', label: 'Twitter', color: 'hover:bg-sky-500' },
    { icon: Youtube, href: 'https://www.youtube.com/channel/UCqPGUc2cuwB4C8HMUbZvBqw', label: 'YouTube', color: 'hover:bg-red-600' },
]

const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } }
}

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
}

export function Footer() {
    return (
        <footer className="bg-muted/50 border-t overflow-hidden">
            <div className="container mx-auto px-4 py-12">
                <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8" variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                    {/* About */}
                    <motion.div variants={itemVariants}>
                        <motion.h3 className="font-display font-semibold text-lg mb-4" whileHover={{ x: 5 }}>Doç. Dr. Fatih Çakır Gündoğan</motion.h3>
                        <p className="text-sm text-muted-foreground mb-4">Göz Hastalıkları Uzmanı<br />Uluslararası Yeterlilik Sertifikası<br />Avrupa Yeterlilik Sertifikası</p>
                        <div className="flex space-x-2">
                            {socialLinks.map((social, index) => (
                                <motion.a
                                    key={social.label}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`p-2 rounded-lg bg-background hover:text-white transition-all ${social.color}`}
                                    aria-label={social.label}
                                    initial={{ opacity: 0, scale: 0 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: index * 0.1 + 0.5, type: 'spring' }}
                                    whileHover={{ scale: 1.2, rotate: 5 }}
                                    whileTap={{ scale: 0.9 }}
                                >
                                    <social.icon className="h-5 w-5" />
                                </motion.a>
                            ))}
                        </div>
                    </motion.div>

                    {/* Quick Links */}
                    <motion.div variants={itemVariants}>
                        <motion.h3 className="font-display font-semibold text-lg mb-4" whileHover={{ x: 5 }}>Hızlı Menü</motion.h3>
                        <ul className="space-y-2">
                            {quickLinks.map((link, index) => (
                                <motion.li key={link.href} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }}>
                                    <Link to={link.href} className="text-sm text-muted-foreground hover:text-primary transition-colors inline-flex items-center group">
                                        <motion.span className="w-0 h-0.5 bg-primary mr-0 group-hover:w-3 group-hover:mr-2 transition-all" />
                                        {link.label}
                                    </Link>
                                </motion.li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* Contact Info */}
                    <motion.div variants={itemVariants}>
                        <motion.h3 className="font-display font-semibold text-lg mb-4" whileHover={{ x: 5 }}>İletişim</motion.h3>
                        <ul className="space-y-3">
                            <motion.li className="flex items-start gap-3 text-sm text-muted-foreground" whileHover={{ x: 5 }}>
                                <motion.div whileHover={{ rotate: 360 }} transition={{ duration: 0.5 }}>
                                    <Phone className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                                </motion.div>
                                <a href="tel:+903526060598" className="hover:text-primary transition-colors">+90 352 606 0598</a>
                            </motion.li>
                            <motion.li className="flex items-start gap-3 text-sm text-muted-foreground" whileHover={{ x: 5 }}>
                                <motion.div whileHover={{ rotate: 360 }} transition={{ duration: 0.5 }}>
                                    <Mail className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                                </motion.div>
                                <a href="mailto:info@drfatihgundogan.com" className="hover:text-primary transition-colors">info@drfatihgundogan.com</a>
                            </motion.li>
                            <motion.li className="flex items-start gap-3 text-sm text-muted-foreground" whileHover={{ x: 5 }}>
                                <motion.div whileHover={{ rotate: 360 }} transition={{ duration: 0.5 }}>
                                    <MapPin className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                                </motion.div>
                                <span>Hunat Mah, Nuh Mehmet Baldöktü Sok, Özer Plaza, No: 3/18, Melikgazi, Kayseri</span>
                            </motion.li>
                        </ul>
                    </motion.div>

                    {/* Working Hours */}
                    <motion.div variants={itemVariants}>
                        <motion.h3 className="font-display font-semibold text-lg mb-4" whileHover={{ x: 5 }}>Çalışma Saatleri</motion.h3>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <motion.li className="flex justify-between" whileHover={{ x: 5 }}><span>Pazartesi - Cuma</span><span>09:00 - 18:00</span></motion.li>
                            <motion.li className="flex justify-between" whileHover={{ x: 5 }}><span>Cumartesi</span><span>09:00 - 14:00</span></motion.li>
                            <motion.li className="flex justify-between" whileHover={{ x: 5 }}><span>Pazar</span><span className="text-destructive">Kapalı</span></motion.li>
                        </ul>
                    </motion.div>
                </motion.div>

                <motion.div className="mt-12 pt-8 border-t text-center text-sm text-muted-foreground" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.5 }}>
                    <p className="flex items-center justify-center gap-1">
                        © {new Date().getFullYear()} Doç. Dr. Fatih Çakır Gündoğan. Tüm hakları saklıdır.
                        <motion.span animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 1, repeat: Infinity }}>
                            <Heart className="h-4 w-4 text-red-500 fill-red-500" />
                        </motion.span>
                    </p>
                </motion.div>
            </div>
        </footer>
    )
}
