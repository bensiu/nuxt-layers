import type { acceptCategoriesType, ModuleOptions } from '../../types'
import { sendConsentToGTM } from '../utils/gtmConsent'

const cookieConsent: ModuleOptions = {
  expiresInDays: 180,
  consentVersion: '1.0.0',
  cookieName: 'cookie_consent',
  gtmConsentMapping: {
    analytics: 'analytics_storage',
    storage: 'ad_storage'
  },
  categories: {
    analytics: {
      label: 'Analytics',
      description: 'Used to improve website performance.',
      required: false
    }
  }
}

export default function (gtmId: string) {
  const config = useAppConfig().cookieConsent as ModuleOptions || cookieConsent

  const cookieName = config.cookieName || 'cookie_consent'
  const expiresInDays = config.expiresInDays ?? 180
  const maxAgeInSeconds = expiresInDays * 24 * 60 * 60
  const expiresInMs = expiresInDays * 24 * 60 * 60 * 1000
  const expiresDate = new Date(Date.now() + expiresInMs)

  const cookieOptions = {
    sameSite: 'lax' as const,
    maxAge: maxAgeInSeconds,
    expires: expiresDate,
    path: '/'
  }

  const consentTimestamp = useCookie<number | null>('cookie_consent_timestamp', cookieOptions)

  const isConsentExpired = computed(() => {
    return consentTimestamp.value
      ? Date.now() - consentTimestamp.value > expiresInMs
      : false
  })

  const state = useState<Record<string, boolean>>('cookieConsent', () => {
    return useCookie<Record<string, boolean>>(cookieName, cookieOptions).value || {}
  })

  function updatePreferences(newPrefs: Record<string, boolean>) {
    const updated: Record<string, boolean> = {}

    for (const [key, meta] of Object.entries(config.categories)) {
      const isRequired = meta.required === true
      const userValue = newPrefs[key]

      updated[key] = isRequired ? true : !!userValue
    }

    state.value = updated

    useCookie(cookieName, cookieOptions).value = JSON.stringify(updated)
    useCookie('cookie_consent_timestamp', cookieOptions).value = (Date.now() + expiresInMs).toString()
    useCookie('cookie_consent_version', cookieOptions).value = config.consentVersion || '1'

    if (import.meta.client && config.gtmConsentMapping) {
      setTimeout(() => {
        if (config.gtmConsentMapping) {
          return sendConsentToGTM(updated, config.gtmConsentMapping, !!config.debug)
        }
      }, 300) // delay to ensure GTM script has time to load
    }
  }

  const acceptCategories: acceptCategoriesType = (categories: string[]) => {
    const prefs = Object.keys(config.categories).reduce((acc, key) => {
      acc[key] = categories.includes(key)
      return acc
    }, {} as Record<string, boolean>)

    updatePreferences(prefs)
  }

  const hasUserMadeChoice = computed(() => {
    return Object.entries(config.categories).some(([key, meta]) => {
      if (meta.required) return false

      return state.value[key] !== null && state.value[key] !== undefined
    })
  })

  return {
    preferences: state,
    categories: Object.keys(config.categories),
    categoryMeta: config.categories,
    acceptCategories,
    isConsentExpired,
    hasUserMadeChoice
  }
}
