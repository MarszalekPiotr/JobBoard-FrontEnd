// import this after install `@mdi/font` package
import '@mdi/font/css/materialdesignicons.css'

import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import colors from 'vuetify/lib/util/colors'

export default defineNuxtPlugin((app) => {
  const vuetify = createVuetify({
    // ... your configuration
    theme: {
        defaultTheme: 'light',
        themes: {
          light: {
            colors: {  
                'layout': colors.blue.lighten1   
            }
          }, 
          dark :{
            colors: {
                'layout': colors.blue.darken4  
            }
          }
        }
      }
  })
  app.vueApp.use(vuetify)
})