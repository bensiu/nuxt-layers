export type GTMConsentField = 'ad_storage'
  | 'analytics_storage'
  | 'personalization_storage'
  | 'functionality_storage'
  | 'security_storage'

export interface CookieConsentCategory {
  label: string
  description?: string
  required?: boolean
}

export interface CookieScript {
  id: string
  src: string
  async?: boolean
  defer?: boolean
  type?: string
  customContent?: string
  customHTML?: string
  categories: string[]
}

export interface ModuleOptions {
  categories: Record<string, CookieConsentCategory>
  scripts: CookieScript[]
  cookieName?: string
  expiresInDays?: number
  consentVersion?: string
  gtmConsentMapping?: Record<string, GTMConsentField>
  // when true, debug logs (like GTM consent payload) are printed to console
  debug?: boolean
}
