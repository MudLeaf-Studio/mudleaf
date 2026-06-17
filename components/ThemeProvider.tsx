'use client'

import { useEffect } from 'react'
import { createClient } from '@/lib/supabase'
import { getTheme } from '@/lib/themes'

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const supabase = createClient()
    supabase
      .from('site_theme')
      .select('theme_key')
      .eq('id', 1)
      .single()
      .then(({ data }) => {
        const theme = getTheme(data?.theme_key ?? 'terracotta')
        const root = document.documentElement
        for (const [key, value] of Object.entries(theme.vars)) {
          root.style.setProperty(key, value)
        }
      })
  }, [])

  return <>{children}</>
}
