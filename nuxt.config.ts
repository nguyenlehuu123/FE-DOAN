// https://nuxt.com/docs/api/configuration/nuxt-config
import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'

export default defineNuxtConfig({
  devtools: { enabled: true },
  css: [
    'vuetify/lib/styles/main.sass',
    '@mdi/font/css/materialdesignicons.min.css',
  ],
  build: {
    transpile: ['vuetify', 'i18n'],
  },
  vite: {
    define: {
      'process.env.DEBUG': false
    }
  },
  ssr: false,
  plugins: [
    '~/plugins/toast',
    '~/plugins/vuetify',
    '~/plugins/i18n'
  ],
  modules: [
    '@pinia/nuxt',
  ],
  runtimeConfig: {
    public: {
      VUE_APP_API: process.env.VUE_APP_API
    }
  },
})
