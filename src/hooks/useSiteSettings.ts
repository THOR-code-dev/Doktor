import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import type { SiteSettings, DoctorInfo } from '@/types'

export function useSiteSettings() {
    const [settings, setSettings] = useState<SiteSettings | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<Error | null>(null)

    useEffect(() => {
        async function fetchSettings() {
            try {
                const { data, error } = await supabase
                    .from('site_settings')
                    .select('*')
                    .single()

                if (error) throw error
                setSettings(data)
            } catch (err) {
                setError(err as Error)
            } finally {
                setLoading(false)
            }
        }

        fetchSettings()
    }, [])

    return { settings, loading, error }
}

export function useDoctorInfo() {
    const [doctor, setDoctor] = useState<DoctorInfo | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<Error | null>(null)

    useEffect(() => {
        async function fetchDoctor() {
            try {
                const { data, error } = await supabase
                    .from('doctor_info')
                    .select('*')
                    .single()

                if (error) throw error
                setDoctor(data)
            } catch (err) {
                setError(err as Error)
            } finally {
                setLoading(false)
            }
        }

        fetchDoctor()
    }, [])

    return { doctor, loading, error }
}
