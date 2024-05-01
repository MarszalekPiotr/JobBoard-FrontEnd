// https://nuxt.com/docs/api/configuration/nuxt-config
import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'

export default defineNuxtConfig({
  devtools: { enabled: false },
  ssr: false,
	build: {
    transpile: ['vuetify'],
  },
  runtimeConfig: {
    public: {
      BASE_URL: 'http://localhost:5073', //replace with ENV: NUXT_PUBLIC_BASE_URL 
    },
  },
  modules: [
    (_options, nuxt) => {
      nuxt.hooks.hook('vite:extendConfig', (config) => {
        // @ts-expect-error
        config.plugins.push(vuetify({ autoImport: true }))
      })
    },
    //...
    '@pinia/nuxt',
    '@vueuse/nuxt',
    'nuxt-lodash',
    'dayjs-nuxt'
  ],
  vite: {
    vue: {
      template: {
        transformAssetUrls,
      },
    },
  },
  imports: {
    dirs: ['stores'],
  },
  lodash: {
    prefix: "_",
    prefixSkip: false,
    upperAfterPrefix: false,
  },
  
})