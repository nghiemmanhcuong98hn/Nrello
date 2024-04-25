// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
      devtools: {enabled: true},

      modules: ['nuxt-server-utils', '@nuxt/ui', '@sidebase/nuxt-auth'],

      ui:{},

      runtimeConfig: {
            public: {
                  mongodbUrl: `mongodb+srv://${process.env.NUXT_DB_USERNAME}:${process.env.NUXT_DB_PASSWORD}@trello.xk40ihq.mongodb.net/?retryWrites=true&w=majority&appName=trello`
            },
            auth:{
                  secret:process.env.AUTH_SECRET,
                  origin:process.env.AUTH_ORIGIN,
            }
      },

      auth: {
            baseURL: process.env.AUTH_ORIGIN,
            provider: {
                  type: 'authjs'
            }
      }
})
