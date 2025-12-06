import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Phone, MessageCircle, ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { useIsMobile } from '@/hooks'

const navigation = [
    { label: 'Anasayfa', href: '/' },
    { label: 'Özgeçmiş', href: '/ozgecmis' },
    {
        label: 'Tedaviler',
        href: '/tedaviler',
        children: [
            { label: 'Katarakt', href: '/tedaviler/katarakt' },
            { label: 'Göz Çizdirme', href: '/tedaviler/goz-cizdirme' },
            { label: 'Akıllı Lens', href: '/tedaviler/akilli-lens' },
            { label: 'Göz Tansiyonu', href: '/tedaviler/goz-tansiyonu' },
            { label: 'Gece Körlüğü', href: '/tedaviler/gece-korlugu' },
        ],
    },
    { label: 'Blog', href: '/blog' },
    { label: 'İletişim', href: '/iletisim' },
    { label: 'Konum', href: '/konum' },
]

export function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const [dropdownOpen, setDropdownOpen] = useState(false)
    const location = useLocation()
    const isMobile = useIsMobile()

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container mx-auto px-4">
                <div className="flex h-16 items-center justify-between">
                    <Link to="/" className="flex items-center space-x-2">
                        <span className="font-display text-xl font-bold text-primary">
                            Doç. Dr. Fatih Çakır Gündoğan
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    {!isMobile && (
                        <nav className="hidden md:flex items-center space-x-1">
                            {navigation.map((item) => (
                                <div key={item.href} className="relative">
                                    {item.children ? (
                                        <div
                                            className="relative"
                                            onMouseEnter={() => setDropdownOpen(true)}
                                            onMouseLeave={() => setDropdownOpen(false)}
                                        >
                                            <button
                                                className={cn(
                                                    'flex items-center gap-1 px-3 py-2 text-sm font-medium rounded-lg transition-colors',
                                                    location.pathname.startsWith('/tedaviler')
                                                        ? 'text-primary bg-primary/10'
                                                        : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                                                )}
                                            >
                                                {item.label}
                                                <ChevronDown className="h-4 w-4" />
                                            </button>
                                            <AnimatePresence>
                                                {dropdownOpen && (
                                                    <motion.div
                                                        initial={{ opacity: 0, y: 10 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        exit={{ opacity: 0, y: 10 }}
                                                        className="absolute left-0 top-full mt-1 w-48 rounded-lg border bg-background p-2 shadow-lg"
                                                    >
                                                        {item.children.map((child) => (
                                                            <Link
                                                                key={child.href}
                                                                to={child.href}
                                                                className="block rounded-md px-3 py-2 text-sm hover:bg-accent"
                                                            >
                                                                {child.label}
                                                            </Link>
                                                        ))}
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </div>
                                    ) : (
                                        <Link
                                            to={item.href}
                                            className={cn(
                                                'px-3 py-2 text-sm font-medium rounded-lg transition-colors',
                                                location.pathname === item.href
                                                    ? 'text-primary bg-primary/10'
                                                    : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                                            )}
                                        >
                                            {item.label}
                                        </Link>
                                    )}
                                </div>
                            ))}
                        </nav>
                    )}

                    {/* Contact Buttons */}
                    <div className="hidden md:flex items-center space-x-2">
                        <Button variant="outline" size="sm" asChild>
                            <a href="tel:+903526060598" aria-label="Telefon">
                                <Phone className="h-4 w-4 mr-2" />
                                Ara
                            </a>
                        </Button>
                        <Button size="sm" asChild>
                            <a
                                href="https://wa.me/903526060598"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="WhatsApp"
                            >
                                <MessageCircle className="h-4 w-4 mr-2" />
                                WhatsApp
                            </a>
                        </Button>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden p-2 rounded-lg hover:bg-accent"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        aria-label={mobileMenuOpen ? 'Menüyü kapat' : 'Menüyü aç'}
                        aria-expanded={mobileMenuOpen}
                    >
                        {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {mobileMenuOpen && isMobile && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden border-t bg-background"
                    >
                        <nav className="container mx-auto px-4 py-4 space-y-2">
                            {navigation.map((item) => (
                                <div key={item.href}>
                                    <Link
                                        to={item.href}
                                        onClick={() => setMobileMenuOpen(false)}
                                        className={cn(
                                            'block px-3 py-2 rounded-lg text-sm font-medium',
                                            location.pathname === item.href
                                                ? 'text-primary bg-primary/10'
                                                : 'text-muted-foreground hover:bg-accent'
                                        )}
                                    >
                                        {item.label}
                                    </Link>
                                    {item.children && (
                                        <div className="ml-4 mt-1 space-y-1">
                                            {item.children.map((child) => (
                                                <Link
                                                    key={child.href}
                                                    to={child.href}
                                                    onClick={() => setMobileMenuOpen(false)}
                                                    className="block px-3 py-2 rounded-lg text-sm text-muted-foreground hover:bg-accent"
                                                >
                                                    {child.label}
                                                </Link>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}
                            <div className="pt-4 space-y-2 border-t">
                                <Button variant="outline" className="w-full" asChild>
                                    <a href="tel:+903526060598">
                                        <Phone className="h-4 w-4 mr-2" />
                                        Ara
                                    </a>
                                </Button>
                                <Button className="w-full" asChild>
                                    <a href="https://wa.me/903526060598" target="_blank" rel="noopener noreferrer">
                                        <MessageCircle className="h-4 w-4 mr-2" />
                                        WhatsApp
                                    </a>
                                </Button>
                            </div>
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    )
}
