import { useState } from 'react'
import { motion } from 'framer-motion'
import { Phone, Mail, MapPin, MessageCircle, Send, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent } from '@/components/ui/card'
import { Container } from '@/components/layout'
import { useToast } from '@/components/ui/toast'
import { supabase } from '@/lib/supabase'
import { isValidEmail, isValidPhone } from '@/lib/utils'
import { fadeInUp, fadeInLeft, fadeInRight, staggerContainer, float } from '@/lib/animations'
import type { ContactFormData, FormValidationResult } from '@/types'

export function validateContactForm(data: ContactFormData): FormValidationResult {
    const errors: Record<string, string> = {}
    if (!data.name.trim()) errors.name = 'İsim alanı zorunludur'
    if (!data.email.trim()) errors.email = 'Email alanı zorunludur'
    else if (!isValidEmail(data.email)) errors.email = 'Geçerli bir email adresi giriniz'
    if (data.phone && !isValidPhone(data.phone)) errors.phone = 'Geçerli bir telefon numarası giriniz'
    if (!data.message.trim()) errors.message = 'Mesaj alanı zorunludur'
    else if (data.message.trim().length < 10) errors.message = 'Mesaj en az 10 karakter olmalıdır'
    return { isValid: Object.keys(errors).length === 0, errors }
}

const contactInfo = [
    { icon: Phone, title: 'Telefon', value: '+90 352 606 0598', href: 'tel:+903526060598', color: 'bg-primary/10 text-primary' },
    { icon: MessageCircle, title: 'WhatsApp', value: '+90 352 606 0598', href: 'https://wa.me/903526060598', color: 'bg-green-500/10 text-green-500', external: true },
    { icon: Mail, title: 'Email', value: 'info@drfatihgundogan.com', href: 'mailto:info@drfatihgundogan.com', color: 'bg-primary/10 text-primary' },
]

export function ContactPage() {
    const { showToast } = useToast()
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState<ContactFormData>({ name: '', email: '', phone: '', message: '' })
    const [errors, setErrors] = useState<Record<string, string>>({})

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        const validation = validateContactForm(formData)
        setErrors(validation.errors)
        if (!validation.isValid) return

        setLoading(true)
        try {
            const { error } = await supabase.from('contact_submissions').insert({ name: formData.name, email: formData.email, phone: formData.phone || null, message: formData.message })
            if (error) throw error
            showToast('Mesajınız başarıyla gönderildi!', 'success')
            setFormData({ name: '', email: '', phone: '', message: '' })
        } catch {
            showToast('Mesaj gönderilirken bir hata oluştu.', 'error')
        } finally {
            setLoading(false)
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
        if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }))
    }

    return (
        <div className="py-12 overflow-hidden">
            <motion.div className="fixed inset-0 pointer-events-none -z-10" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <motion.div variants={float} initial="initial" animate="animate" className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
                <motion.div variants={float} initial="initial" animate="animate" transition={{ delay: 1 }} className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/5 rounded-full blur-3xl" />
            </motion.div>

            <Container>
                <motion.div variants={staggerContainer} initial="initial" animate="animate" className="text-center mb-12">
                    <motion.div initial={{ scale: 0, rotate: -180 }} animate={{ scale: 1, rotate: 0 }} transition={{ type: 'spring', stiffness: 200 }} className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6">
                        <Sparkles className="h-8 w-8 text-primary" />
                    </motion.div>
                    <motion.h1 variants={fadeInUp} className="font-display text-4xl lg:text-5xl font-bold mb-4">İletişim</motion.h1>
                    <motion.p variants={fadeInUp} className="text-muted-foreground max-w-2xl mx-auto">Sorularınız için bizimle iletişime geçebilirsiniz.</motion.p>
                </motion.div>

                <div className="grid lg:grid-cols-2 gap-12">
                    <motion.div variants={staggerContainer} initial="initial" animate="animate" className="space-y-6">
                        {contactInfo.map((item, index) => (
                            <motion.div key={index} variants={fadeInLeft} custom={index} whileHover={{ scale: 1.02, x: 10 }} transition={{ type: 'spring', stiffness: 300 }}>
                                <Card className="overflow-hidden group">
                                    <CardContent className="p-6">
                                        <div className="flex items-start gap-4">
                                            <motion.div className={`w-12 h-12 rounded-lg ${item.color} flex items-center justify-center flex-shrink-0`} whileHover={{ rotate: 360 }} transition={{ duration: 0.5 }}>
                                                <item.icon className="h-6 w-6" />
                                            </motion.div>
                                            <div>
                                                <h3 className="font-semibold mb-1">{item.title}</h3>
                                                <a href={item.href} target={item.external ? '_blank' : undefined} rel={item.external ? 'noopener noreferrer' : undefined} className="text-muted-foreground hover:text-primary transition-colors">{item.value}</a>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}

                        <motion.div variants={fadeInLeft} whileHover={{ scale: 1.02, x: 10 }} transition={{ type: 'spring', stiffness: 300 }}>
                            <Card className="overflow-hidden">
                                <CardContent className="p-6">
                                    <div className="flex items-start gap-4">
                                        <motion.div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0" whileHover={{ rotate: 360 }} transition={{ duration: 0.5 }}>
                                            <MapPin className="h-6 w-6 text-primary" />
                                        </motion.div>
                                        <div>
                                            <h3 className="font-semibold mb-1">Adres</h3>
                                            <p className="text-muted-foreground">Hunat Mah, Nuh Mehmet Baldöktü Sok, Özer Plaza, No: 3/18, Melikgazi, Kayseri</p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    </motion.div>

                    <motion.div variants={fadeInRight} initial="initial" animate="animate" transition={{ delay: 0.3 }}>
                        <Card className="overflow-hidden">
                            <CardContent className="p-6">
                                <motion.h2 className="font-display text-2xl font-bold mb-6" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}>Bize Yazın</motion.h2>
                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
                                        <label htmlFor="name" className="block text-sm font-medium mb-2">İsim *</label>
                                        <Input id="name" name="name" value={formData.name} onChange={handleChange} error={errors.name} placeholder="Adınız Soyadınız" />
                                    </motion.div>
                                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
                                        <label htmlFor="email" className="block text-sm font-medium mb-2">Email *</label>
                                        <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} error={errors.email} placeholder="ornek@email.com" />
                                    </motion.div>
                                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}>
                                        <label htmlFor="phone" className="block text-sm font-medium mb-2">Telefon</label>
                                        <Input id="phone" name="phone" type="tel" value={formData.phone} onChange={handleChange} error={errors.phone} placeholder="05XX XXX XX XX" />
                                    </motion.div>
                                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}>
                                        <label htmlFor="message" className="block text-sm font-medium mb-2">Mesajınız *</label>
                                        <Textarea id="message" name="message" value={formData.message} onChange={handleChange} error={errors.message} placeholder="Mesajınızı yazın..." rows={5} />
                                    </motion.div>
                                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9 }} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                                        <Button type="submit" className="w-full" disabled={loading}>
                                            {loading ? 'Gönderiliyor...' : <><Send className="mr-2 h-4 w-4" />Gönder</>}
                                        </Button>
                                    </motion.div>
                                </form>
                            </CardContent>
                        </Card>
                    </motion.div>
                </div>
            </Container>
        </div>
    )
}
