import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import type { BlogPost, Category } from '@/types'

interface UseBlogPostsOptions {
    categoryId?: string
    search?: string
    status?: 'draft' | 'published'
    page?: number
    pageSize?: number
}

export function useBlogPosts(options: UseBlogPostsOptions = {}) {
    const { categoryId, search, status = 'published', page = 1, pageSize = 10 } = options
    const [posts, setPosts] = useState<BlogPost[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<Error | null>(null)
    const [total, setTotal] = useState(0)

    useEffect(() => {
        async function fetchPosts() {
            setLoading(true)
            try {
                let query = supabase
                    .from('blog_posts')
                    .select('*', { count: 'exact' })
                    .eq('status', status)
                    .order('published_at', { ascending: false })
                    .range((page - 1) * pageSize, page * pageSize - 1)

                if (categoryId) {
                    query = query.eq('category_id', categoryId)
                }

                if (search) {
                    query = query.or(`title.ilike.%${search}%,excerpt.ilike.%${search}%`)
                }

                const { data, error, count } = await query

                if (error) throw error
                setPosts(data || [])
                setTotal(count || 0)
            } catch (err) {
                setError(err as Error)
            } finally {
                setLoading(false)
            }
        }

        fetchPosts()
    }, [categoryId, search, status, page, pageSize])

    return { posts, loading, error, total, totalPages: Math.ceil(total / pageSize) }
}

export function useBlogPost(slug: string) {
    const [post, setPost] = useState<BlogPost | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<Error | null>(null)

    useEffect(() => {
        async function fetchPost() {
            setLoading(true)
            try {
                const { data, error } = await supabase
                    .from('blog_posts')
                    .select('*')
                    .eq('slug', slug)
                    .single()

                if (error) throw error
                setPost(data)
            } catch (err) {
                setError(err as Error)
            } finally {
                setLoading(false)
            }
        }

        if (slug) fetchPost()
    }, [slug])

    return { post, loading, error }
}

export function useCategories() {
    const [categories, setCategories] = useState<Category[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<Error | null>(null)

    useEffect(() => {
        async function fetchCategories() {
            try {
                const { data, error } = await supabase
                    .from('categories')
                    .select('*')
                    .order('name')

                if (error) throw error
                setCategories(data || [])
            } catch (err) {
                setError(err as Error)
            } finally {
                setLoading(false)
            }
        }

        fetchCategories()
    }, [])

    return { categories, loading, error }
}

export function useRelatedPosts(currentPostId: string, categoryId: string | null) {
    const [posts, setPosts] = useState<BlogPost[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function fetchRelated() {
            if (!categoryId) {
                setLoading(false)
                return
            }

            try {
                const { data } = await supabase
                    .from('blog_posts')
                    .select('*')
                    .eq('status', 'published')
                    .eq('category_id', categoryId)
                    .neq('id', currentPostId)
                    .limit(3)

                setPosts(data || [])
            } catch {
                setPosts([])
            } finally {
                setLoading(false)
            }
        }

        fetchRelated()
    }, [currentPostId, categoryId])

    return { posts, loading }
}
