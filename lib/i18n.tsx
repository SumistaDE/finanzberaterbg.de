'use client'

import { createContext, useContext, useState, type ReactNode } from 'react'

export type Lang = 'bg' | 'de'

type LangContextValue = {
  lang: Lang
  setLang: (lang: Lang) => void
  toggle: () => void
}

const LangContext = createContext<LangContextValue | null>(null)

// Bulgarian is the default: most visitors arrive from Bulgarian-language ads,
// so the first paint must not be German.
export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>('bg')
  const value: LangContextValue = {
    lang,
    setLang,
    toggle: () => setLang(lang === 'bg' ? 'de' : 'bg'),
  }
  return <LangContext.Provider value={value}>{children}</LangContext.Provider>
}

export function useLang(): LangContextValue {
  const ctx = useContext(LangContext)
  if (!ctx) throw new Error('useLang must be used within LanguageProvider')
  return ctx
}

export const common = {
  de: {
    navServices: 'Dienstleistungen',
    navBenefits: 'Vorteile',
    navContact: 'Kontakt',
    login: 'Anmelden',
    home: 'Startseite',
    toggle: 'BG',
    navigation: 'Navigation',
    legal: 'Rechtliches',
    contact: 'Kontakt',
    weekdays: 'Mo–Fr, 9:00–18:00 Uhr',
    imprint: 'Impressum',
    privacy: 'Datenschutz',
    terms: 'AGB',
    services: 'Dienstleistungen',
    footerLead: (
      <>
        Ihre Energie. Ihre Entscheidung.
        <br />
        Wir machen sie einfacher.
      </>
    ),
  },
  bg: {
    navServices: 'Услуги',
    navBenefits: 'Предимства',
    navContact: 'Контакт',
    login: 'Вход',
    home: 'Начало',
    toggle: 'DE',
    navigation: 'Навигация',
    legal: 'Правна информация',
    contact: 'Контакт',
    weekdays: 'Пн–Пт, 9:00–18:00 ч.',
    imprint: 'Импресум',
    privacy: 'Поверителност',
    terms: 'Общи условия',
    services: 'Услуги',
    footerLead: (
      <>
        Вашата енергия. Вашето решение.
        <br />
        Ние го правим по-лесно.
      </>
    ),
  },
} as const
