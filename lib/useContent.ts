'use client'

import { useState, useEffect } from 'react'
import { createClient } from './supabase'
import { PAGE_CONTENT_SCHEMA } from './content-schema'

export function useContent(pageKey: string): Record<string, string> {
  const schema = PAGE_CONTENT_SCHEMA[pageKey]
  const defaults: Record<string, string> = {}
  for (const [key, field] of Object.entries(schema.fields)) {
    defaults[key] = field.default
  }

  const [content, setContent] = useState<Record<string, string>>(defaults)

  useEffect(() => {
    const supabase = createClient()
    supabase
      .from('page_content')
      .select('content')
      .eq('page_key', pageKey)
      .maybeSingle()
      .then(({ data }) => {
        if (data?.content) {
          setContent((prev) => ({ ...prev, ...data.content }))
        }
      })
  }, [pageKey])

  return content
}
