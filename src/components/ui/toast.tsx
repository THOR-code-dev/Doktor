import { createContext, useContext, useState, useCallback } from 'react'
import type { ReactNode } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, CheckCircle, AlertCircle, Info } from 'lucide-react'
import { cn } from '@/lib/utils'

type ToastType = 'success' | 'error' | 'info'

interface Toast {
    id: string
    message: string
    type: ToastType
}

interface ToastContextType {
    showToast: (message: string, type?: ToastType) => void
}

const ToastContext = createContext<ToastContextType | undefined>(undefined)

export function ToastProvider({ children }: { children: ReactNode }) {
    const [toasts, setToasts] = useState<Toast[]>([])

    const showToast = useCallback((message: string, type: ToastType = 'info') => {
        const id = Math.random().toString(36).substr(2, 9)
        setToasts(prev => [...prev, { id, message, type }])
        setTimeout(() => {
            setToasts(prev => prev.filter(t => t.id !== id))
        }, 5000)
    }, [])

    const removeToast = (id: string) => {
        setToasts(prev => prev.filter(t => t.id !== id))
    }

    const icons = {
        success: CheckCircle,
        error: AlertCircle,
        info: Info,
    }

    return (
        <ToastContext.Provider value={{ showToast }}>
            {children}
            <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
                <AnimatePresence>
                    {toasts.map(toast => {
                        const Icon = icons[toast.type]
                        return (
                            <motion.div
                                key={toast.id}
                                initial={{ opacity: 0, y: 50, scale: 0.3 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
                                className={cn(
                                    'flex items-center gap-3 rounded-lg px-4 py-3 shadow-lg',
                                    toast.type === 'success' && 'bg-green-500 text-white',
                                    toast.type === 'error' && 'bg-destructive text-destructive-foreground',
                                    toast.type === 'info' && 'bg-primary text-primary-foreground'
                                )}
                            >
                                <Icon className="h-5 w-5" />
                                <span className="text-sm font-medium">{toast.message}</span>
                                <button
                                    onClick={() => removeToast(toast.id)}
                                    className="ml-2 rounded-full p-1 hover:bg-white/20"
                                    aria-label="Kapat"
                                >
                                    <X className="h-4 w-4" />
                                </button>
                            </motion.div>
                        )
                    })}
                </AnimatePresence>
            </div>
        </ToastContext.Provider>
    )
}

export function useToast() {
    const context = useContext(ToastContext)
    if (!context) {
        throw new Error('useToast must be used within a ToastProvider')
    }
    return context
}
