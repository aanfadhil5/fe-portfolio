import { AnimatePresence, motion } from 'framer-motion'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { useState } from 'react'

interface Language {
  code: string
  name: string
  nativeName: string
  flag: string
}

const languages: Language[] = [
  { code: 'en', name: 'English', nativeName: 'English', flag: '🇺🇸' },
  {
    code: 'id',
    name: 'Indonesian',
    nativeName: 'Bahasa Indonesia',
    flag: '🇮🇩',
  },
  { code: 'es', name: 'Spanish', nativeName: 'Español', flag: '🇪🇸' },
  { code: 'fr', name: 'French', nativeName: 'Français', flag: '🇫🇷' },
  { code: 'de', name: 'German', nativeName: 'Deutsch', flag: '🇩🇪' },
  { code: 'ja', name: 'Japanese', nativeName: '日本語', flag: '🇯🇵' },
  { code: 'zh', name: 'Chinese', nativeName: '中文', flag: '🇨🇳' },
]

interface LanguageSwitcherProps {
  className?: string
  variant?: 'dropdown' | 'inline'
  showNativeName?: boolean
}

export default function LanguageSwitcher({
  className = '',
  variant = 'dropdown',
  showNativeName = true,
}: LanguageSwitcherProps) {
  const router = useRouter()
  const { t } = useTranslation('common')
  const [isOpen, setIsOpen] = useState(false)

  const currentLanguage =
    languages.find(lang => lang.code === router.locale) || languages[0]

  const handleLanguageChange = async (languageCode: string) => {
    setIsOpen(false)

    // Change language using Next.js router
    await router.push(router.asPath, router.asPath, { locale: languageCode })

    // Track language change event
    if (typeof window !== 'undefined' && (window as any).gtag) {
      ;(window as any).gtag('event', 'language_change', {
        event_category: 'engagement',
        event_label: languageCode,
        value: 1,
      })
    }
  }

  if (variant === 'inline') {
    return (
      <div className={`flex flex-wrap gap-2 ${className}`}>
        {languages.map(language => (
          <button
            key={language.code}
            onClick={() => handleLanguageChange(language.code)}
            className={`
              px-3 py-1 rounded-md text-sm font-medium transition-colors duration-200
              ${
                language.code === router.locale
                  ? 'bg-blue-600 text-white dark:bg-blue-500'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
              }
            `}
            aria-label={`Switch to ${language.name}`}
          >
            <span className='mr-1' aria-hidden='true'>
              {language.flag}
            </span>
            {showNativeName ? language.nativeName : language.code.toUpperCase()}
          </button>
        ))}
      </div>
    )
  }

  return (
    <div className={`relative ${className}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className='
          flex items-center gap-2 px-3 py-2 rounded-md
          bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700
          text-gray-700 dark:text-gray-300
          transition-colors duration-200
          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
          dark:focus:ring-offset-gray-900
        '
        aria-label={t('language')}
        aria-expanded={isOpen}
        aria-haspopup='listbox'
      >
        <span className='text-lg' aria-hidden='true'>
          {currentLanguage.flag}
        </span>
        <span className='text-sm font-medium'>
          {showNativeName
            ? currentLanguage.nativeName
            : currentLanguage.code.toUpperCase()}
        </span>
        <motion.svg
          className='w-4 h-4'
          fill='none'
          stroke='currentColor'
          viewBox='0 0 24 24'
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={2}
            d='M19 9l-7 7-7-7'
          />
        </motion.svg>
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <div
              className='fixed inset-0 z-40'
              onClick={() => setIsOpen(false)}
              aria-hidden='true'
            />

            {/* Dropdown */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -10 }}
              transition={{ duration: 0.2 }}
              className='
                absolute top-full right-0 mt-2 z-50
                bg-white dark:bg-gray-800
                border border-gray-200 dark:border-gray-700
                rounded-md shadow-lg
                min-w-[200px]
                max-h-60 overflow-y-auto
              '
              role='listbox'
              aria-label={t('language')}
            >
              {languages.map(language => (
                <button
                  key={language.code}
                  onClick={() => handleLanguageChange(language.code)}
                  className={`
                    w-full flex items-center gap-3 px-4 py-3 text-left
                    hover:bg-gray-50 dark:hover:bg-gray-700
                    transition-colors duration-200
                    ${
                      language.code === router.locale
                        ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                        : 'text-gray-700 dark:text-gray-300'
                    }
                  `}
                  role='option'
                  aria-selected={language.code === router.locale}
                >
                  <span className='text-lg' aria-hidden='true'>
                    {language.flag}
                  </span>
                  <div className='flex-1'>
                    <div className='font-medium'>{language.nativeName}</div>
                    <div className='text-xs text-gray-500 dark:text-gray-400'>
                      {language.name}
                    </div>
                  </div>
                  {language.code === router.locale && (
                    <svg
                      className='w-4 h-4 text-blue-600 dark:text-blue-400'
                      fill='currentColor'
                      viewBox='0 0 20 20'
                      aria-hidden='true'
                    >
                      <path
                        fillRule='evenodd'
                        d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
                        clipRule='evenodd'
                      />
                    </svg>
                  )}
                </button>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}

// Hook for getting language information
export function useLanguageInfo() {
  const router = useRouter()
  const currentLanguage =
    languages.find(lang => lang.code === router.locale) || languages[0]

  return {
    currentLanguage,
    availableLanguages: languages,
    isRTL: false, // Add RTL support if needed for Arabic/Hebrew
  }
}

// Utility function to get language name
export function getLanguageName(code: string, native = false): string {
  const language = languages.find(lang => lang.code === code)
  if (!language) return code

  return native ? language.nativeName : language.name
}
