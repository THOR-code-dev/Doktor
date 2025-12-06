export * from './database'

export interface NavigationItem {
    label: string
    href: string
    children?: NavigationItem[]
}

export interface ContactInfo {
    phone: string
    whatsapp: string
    email?: string
    address?: string
}

export interface SocialLink {
    platform: 'facebook' | 'instagram' | 'twitter' | 'youtube'
    url: string
}

export interface ContactFormData {
    name: string
    email: string
    phone: string
    message: string
}

export interface FormValidationResult {
    isValid: boolean
    errors: Record<string, string>
}

export interface DashboardStats {
    totalBlogs: number
    publishedBlogs: number
    draftBlogs: number
    totalTreatments: number
}

export interface PaginationInfo {
    page: number
    pageSize: number
    total: number
    totalPages: number
}
