import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export function slugify(text: string): string {
    return text
        .toString()
        .toLowerCase()
        .trim()
        .replace(/\s+/g, '-')
        .replace(/[üÜ]/g, 'u')
        .replace(/[öÖ]/g, 'o')
        .replace(/[çÇ]/g, 'c')
        .replace(/[şŞ]/g, 's')
        .replace(/[ğĞ]/g, 'g')
        .replace(/[ıİ]/g, 'i')
        .replace(/[^\w\-]+/g, '')
        .replace(/\-\-+/g, '-')
}

export function formatDate(date: string | Date): string {
    return new Intl.DateTimeFormat('tr-TR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    }).format(new Date(date))
}

export function isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
}

export function isValidPhone(phone: string): boolean {
    const phoneRegex = /^[\d\s\-\+\(\)]{10,}$/
    return phoneRegex.test(phone)
}

export function truncateText(text: string, maxLength: number): string {
    if (text.length <= maxLength) return text
    return text.slice(0, maxLength).trim() + '...'
}

export function getLayoutForViewport(width: number): 'mobile' | 'tablet' | 'desktop' {
    if (width < 768) return 'mobile'
    if (width < 1024) return 'tablet'
    return 'desktop'
}
