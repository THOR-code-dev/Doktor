import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Eye, EyeOff, LogIn } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { useAuth } from '@/contexts/AuthContext'
import { isValidEmail } from '@/lib/utils'

export function AdminLoginPage() {
    const navigate = useNavigate()
    const { signIn } = useAuth()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError('')

        if (!email || !password) {
            setError('Email ve şifre alanları zorunludur')
            return
        }

        if (!isValidEmail(email)) {
            setError('Geçerli bir email adresi giriniz')
            return
        }

        setLoading(true)
        const { error: signInError } = await signIn(email, password)
        setLoading(false)

        if (signInError) {
            setError('Email veya şifre hatalı')
            return
        }

        navigate('/admin')
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-muted/30 p-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md"
            >
                <Card>
                    <CardContent className="p-8">
                        <div className="text-center mb-8">
                            <h1 className="font-display text-2xl font-bold mb-2">Admin Paneli</h1>
                            <p className="text-muted-foreground text-sm">Yönetim paneline giriş yapın</p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            {error && (
                                <div className="p-3 rounded-lg bg-destructive/10 text-destructive text-sm">
                                    {error}
                                </div>
                            )}

                            <div>
                                <label htmlFor="email" className="block text-sm font-medium mb-2">
                                    Email
                                </label>
                                <Input
                                    id="email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="admin@example.com"
                                    autoComplete="email"
                                />
                            </div>

                            <div>
                                <label htmlFor="password" className="block text-sm font-medium mb-2">
                                    Şifre
                                </label>
                                <div className="relative">
                                    <Input
                                        id="password"
                                        type={showPassword ? 'text' : 'password'}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="••••••••"
                                        autoComplete="current-password"
                                        className="pr-10"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                                        aria-label={showPassword ? 'Şifreyi gizle' : 'Şifreyi göster'}
                                    >
                                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                    </button>
                                </div>
                            </div>

                            <Button type="submit" className="w-full" disabled={loading}>
                                {loading ? (
                                    'Giriş yapılıyor...'
                                ) : (
                                    <>
                                        <LogIn className="mr-2 h-4 w-4" />
                                        Giriş Yap
                                    </>
                                )}
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </motion.div>
        </div>
    )
}
