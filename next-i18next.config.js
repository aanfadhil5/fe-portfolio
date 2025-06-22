/** @type {import('next-i18next').UserConfig} */
module.exports = {
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'id', 'es', 'fr', 'de', 'ja', 'zh'],
    localeDetection: true,
  },
  fallbackLng: {
    default: ['en'],
    id: ['en'],
    es: ['en'],
    fr: ['en'],
    de: ['en'],
    ja: ['en'],
    zh: ['en'],
  },
  debug: process.env.NODE_ENV === 'development',
  reloadOnPrerender: process.env.NODE_ENV === 'development',
  serializeConfig: false,
  use: [],
  ns: [
    'common',
    'navigation',
    'hero',
    'about',
    'experience',
    'skills',
    'projects',
    'contact',
  ],
  defaultNS: 'common',
  interpolation: {
    escapeValue: false,
  },
  react: {
    useSuspense: false,
  },
}
