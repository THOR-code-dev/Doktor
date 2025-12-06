import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import type { Treatment } from '@/types'

export function useTreatments() {
    const [treatments, setTreatments] = useState<Treatment[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<Error | null>(null)

    useEffect(() => {
        async function fetchTreatments() {
            try {
                const { data, error } = await supabase
                    .from('treatments')
                    .select('*')
                    .order('order_index')

                if (error) throw error
                setTreatments(data || [])
            } catch (err) {
                setError(err as Error)
            } finally {
                setLoading(false)
            }
        }

        fetchTreatments()
    }, [])

    return { treatments, loading, error }
}

export function useTreatment(slug: string) {
    const [treatment, setTreatment] = useState<Treatment | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<Error | null>(null)

    useEffect(() => {
        async function fetchTreatment() {
            setLoading(true)
            try {
                const { data, error } = await supabase
                    .from('treatments')
                    .select('*')
                    .eq('slug', slug)
                    .single()

                if (error) throw error
                setTreatment(data)
            } catch (err) {
                setError(err as Error)
            } finally {
                setLoading(false)
            }
        }

        if (slug) fetchTreatment()
    }, [slug])

    return { treatment, loading, error }
}
