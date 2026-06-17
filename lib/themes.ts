export type Theme = {
  key: string
  label: string
  preview: string[]
  vars: Record<string, string>
  bodyFont: string
  headingFont: string
}

export const THEMES: Theme[] = [
  {
    key: 'terracotta',
    label: 'Terracotta — Warm Earth',
    preview: ['#C4622D', '#2C1810', '#FAF7F4', '#7A9E7E'],
    bodyFont: "'DM Sans', sans-serif",
    headingFont: "'Cormorant Garamond', serif",
    vars: {
      '--terracotta': '#C4622D',
      '--terracotta-light': '#D4845A',
      '--terracotta-pale': '#F5EDE6',
      '--dark': '#2C1810',
      '--dark-mid': '#4A2E22',
      '--text': '#3D2B1F',
      '--text-mid': '#6B5044',
      '--text-light': '#9E8070',
      '--cream': '#FAF7F4',
      '--warm-white': '#FDF9F6',
      '--border': '#E2D5C8',
      '--sage': '#7A9E7E',
      '--sage-light': '#E8F0E9',
    },
  },
  {
    key: 'sage',
    label: 'Sage — Green & Natural',
    preview: ['#4A7C59', '#1A2E22', '#F4F8F5', '#C4622D'],
    bodyFont: "'DM Sans', sans-serif",
    headingFont: "'Cormorant Garamond', serif",
    vars: {
      '--terracotta': '#4A7C59',
      '--terracotta-light': '#6A9C79',
      '--terracotta-pale': '#E8F0E9',
      '--dark': '#1A2E22',
      '--dark-mid': '#2E4A36',
      '--text': '#1F3828',
      '--text-mid': '#4A6B54',
      '--text-light': '#7A9E84',
      '--cream': '#F4F8F5',
      '--warm-white': '#F8FCF9',
      '--border': '#D0E2D4',
      '--sage': '#C4622D',
      '--sage-light': '#F5EDE6',
    },
  },
  {
    key: 'slate',
    label: 'Slate — Dark Minimal',
    preview: ['#6B7FA6', '#0F1520', '#F4F5F8', '#A67B6B'],
    bodyFont: "'DM Sans', sans-serif",
    headingFont: "'Cormorant Garamond', serif",
    vars: {
      '--terracotta': '#6B7FA6',
      '--terracotta-light': '#8B9FC6',
      '--terracotta-pale': '#EEF0F5',
      '--dark': '#0F1520',
      '--dark-mid': '#1E2A3A',
      '--text': '#1A2235',
      '--text-mid': '#4A5A78',
      '--text-light': '#7A8AAA',
      '--cream': '#F4F5F8',
      '--warm-white': '#F8F9FC',
      '--border': '#D8DCE8',
      '--sage': '#A67B6B',
      '--sage-light': '#F0EAE8',
    },
  },
  {
    key: 'ochre',
    label: 'Ochre — Desert Gold',
    preview: ['#B8860B', '#2C1F08', '#FAF6EE', '#7A9E7E'],
    bodyFont: "'DM Sans', sans-serif",
    headingFont: "'Cormorant Garamond', serif",
    vars: {
      '--terracotta': '#B8860B',
      '--terracotta-light': '#D4A820',
      '--terracotta-pale': '#FAF3DC',
      '--dark': '#2C1F08',
      '--dark-mid': '#4A3610',
      '--text': '#3D2E0A',
      '--text-mid': '#6B5520',
      '--text-light': '#9E8040',
      '--cream': '#FAF6EE',
      '--warm-white': '#FDFAF2',
      '--border': '#E8DFC0',
      '--sage': '#7A9E7E',
      '--sage-light': '#E8F0E9',
    },
  },
  {
    key: 'charcoal',
    label: 'Charcoal — Monochrome',
    preview: ['#555555', '#111111', '#F6F6F6', '#888888'],
    bodyFont: "'DM Sans', sans-serif",
    headingFont: "'Cormorant Garamond', serif",
    vars: {
      '--terracotta': '#444444',
      '--terracotta-light': '#666666',
      '--terracotta-pale': '#EEEEEE',
      '--dark': '#111111',
      '--dark-mid': '#222222',
      '--text': '#1A1A1A',
      '--text-mid': '#555555',
      '--text-light': '#888888',
      '--cream': '#F6F6F6',
      '--warm-white': '#FAFAFA',
      '--border': '#DDDDDD',
      '--sage': '#888888',
      '--sage-light': '#EEEEEE',
    },
  },
]

export function getTheme(key: string): Theme {
  return THEMES.find(t => t.key === key) ?? THEMES[0]
}
