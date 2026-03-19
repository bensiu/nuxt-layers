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

export interface ModuleOptions {
  categories: Record<string, CookieConsentCategory>
  cookieName?: string
  expiresInDays?: number
  consentVersion?: string
  gtmConsentMapping?: Record<string, GTMConsentField>
  // when true, debug logs (like GTM consent payload) are printed to console
  debug?: boolean
}

export type acceptCategoriesType = (categories: string[]) => void

export interface CookieConsentBanerProps {
  // acceptCategories: acceptCategoriesType
  gtmId: string
  expiredCookie?: string
  title?: string
  description?: string
  acceptLabel?: string
  denyLabel?: string
}