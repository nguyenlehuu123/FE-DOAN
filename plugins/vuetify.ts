// import this after install `@mdi/font` package
import '@mdi/font/css/materialdesignicons.css'

import 'vuetify/styles'
import { createVuetify, type ThemeDefinition } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { defineNuxtPlugin } from 'nuxt/app'

const myCustomLightTheme: ThemeDefinition = {
  dark: false,
  colors: {
    background: '#FFFFFF',
    surface: '#FFFFFF',
    primary: '#6200EE',
    'primary-darken-1': '#D1C4E9',
    secondary: '#03DAC6',
    'secondary-darken-1': '#018786',
    error: '#B00020',
    info: '#2196F3',
    success: '#4CAF50',
    warning: '#FB8C00',
    something: "#4A148C",
    'color-text': '#333',
    'bg-disable': '#f5f5f5'
  },
}

const myCustomDarkTheme: ThemeDefinition = {
  colors: {
    background: '#333',
    surface: '#FFFFFF',
    primary: '#6200EE',
    'primary-darken-1': '#BBDEFB',
    secondary: '#03DAC6',
    'secondary-darken-1': '#018786',
    error: '#B00020',
    info: '#2196F3',
    success: '#4CAF50',
    warning: '#FB8C00',
    something: "#B71C1C333",
    'color-text': '#fff',
    'bg-disable': '#f5f5f5'
  },
}


export default defineNuxtPlugin((app) => {
  const vuetify = createVuetify({
    ssr: false,
    components: {
      ...components
    },
    directives,
    theme: {
      themes: {
        light: myCustomLightTheme,
        dark: myCustomDarkTheme
      }
    }
  })
  app.vueApp.use(vuetify)
})