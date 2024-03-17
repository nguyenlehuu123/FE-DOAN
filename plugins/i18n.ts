import { createI18n } from 'vue-i18n'

import page from 'assets/locales/en/page.json'
import message from 'assets/locales/en/message.json'
import errors from 'assets/locales/en/errors.json'
import pagevi from 'assets/locales/vi/page.json'
import messagevi from 'assets/locales/vi/message.json'
import errorsvi from 'assets/locales/vi/errors.json'

const i18n = createI18n({
  legacy: false,
  globalInjection: true,
  locale: 'vi',
  fallbackLocale: 'en',
  messages: {
    en: {
      page: page,
      message: message,
      errors: errors
    },
    vi: {
      page: pagevi,
      message: messagevi,
      errors: errorsvi
    }
  }
})

export default defineNuxtPlugin(({ vueApp }) => {
  vueApp.use(i18n)
})
export {
  i18n
}
