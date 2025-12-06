import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
    LayoutDashboard,
    FileText,
    Stethoscope,
    Settings,
    LogOut,
    Menu,
    X,
    Sun,
    Moon,
} from 'lucide-react'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/contexts/AuthContext'
import { useTheme } from '@/contexts/ThemeContext'
import { cn } from '@/lib/utils'

const navigation = [
    { label: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { label: 'Blog Yönetimi', href: '/admin/blog', icon: FileText },
    { label: 'Tedavi Yönetimi', href: '/admin/tedaviler', icon: Stethoscope },
    { label: 'Ayarlar', href: '/admin/ayarlar', icon: Settings },
]

export function AdminLayout() {
    const location = useLocation()
    const navigate = useNavigate()
    const { signOut, user } = useAuth()
    const { theme, toggleTheme } = useTheme()
    const [sidebarOpen, setSidebarOpen] = useState(false)

    const handleSignOut = async () => {
        await signOut()
        navigate('/admin/login')
    }

    return (
        <div className="min-h-screen bg-muted/30">
            {/* Mobile Header */}
            <header className="lg:hidden sticky top-0 z-50 flex items-center justify-between h-16 px-4 border-b bg-background">
                <button
                    onClick={() => setSidebarOpen(true)}
                    className="p-2 rounded-lg hover:bg-accent"
                    aria-label="Menüyü aç"
                >
                    <Menu className="h-6 w-6" />
                </button>
                <span className="font-display font-semibold">Admin Panel</span>
                <Button variant="ghost" size="icon" onClick={toggleTheme}>
                    {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                </Button>
            </header>

            {/* Sidebar */}
            <aside
                className={cn(
                    'fixed inset-y-0 left-0 z-50 w-64 bg-background border-r transform transition-transform lg:translate-x-0',
                    sidebarOpen ? 'translate-x-0' : '-translate-x-full'
                )}
            >
                <div className="flex flex-col h-full">
                    <div className="flex items-center justify-between h-16 px-4 border-b">
                        <Link to="/admin" className="font-display font-bold text-lg">
                            Admin Panel
                        </Link>
                        <button
                            onClick={() => setSidebarOpen(false)}
                            className="lg:hidden p-2 rounded-lg hover:bg-accent"
                            aria-label="Menüyü kapat"
                        >
                            <X className="h-5 w-5" />
                        </button>
                    </div>

                    <nav className="flex-1 p-4 space-y-1">
                        {navigation.map((item) => {
                            const isActive =
                                item.href === '/admin'
                                    ? location.pathname === '/admin'
                                    : location.pathname.startsWith(item.href)

                            return (
                                <Link
                                    key={item.href}
                                    to={item.href}
                                    onClick={() => setSidebarOpen(false)}
                                    className={cn(
                                        'flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors',
                                        isActive
                                            ? 'bg-primary text-primary-foreground'
                                            : 'text-muted-foreground hover:bg-accent hover:text-foreground'
                                    )}
                                >
                                    <item.icon className="h-5 w-5" />
                                    {item.label}
                                </Link>
                            )
                        })}
                    </nav>

                    <div className="p-4 border-t space-y-2">
                        <div className="flex items-center justify-between">
                            <span className="text-sm text-muted-foreground truncate">{user?.email}</span>
                            <Button variant="ghost" size="icon" onClick={toggleTheme} className="hidden lg:flex">
                                {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                            </Button>
                        </div>
                        <Button variant="outline" className="w-full" onClick={handleSignOut}>
                            <LogOut className="mr-2 h-4 w-4" />
                            Çıkış Yap
                        </Button>
                    </div>
                </div>
            </aside>

            {/* Overlay */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 z-40 bg-black/50 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Main Content */}
            <main className="lg:pl-64">
                <div className="p-4 lg:p-8">
                    <motion.div
                        key={location.pathname}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.2 }}
                    >
                        <Outlet />
                    </motion.div>
                </div>
            </main>
        </div>
    )
}
