// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	devtools: { enabled: true },

	colorMode: {
		preference: 'dark'
	},

	modules: ['nuxt-server-utils', '@nuxt/ui', '@sidebase/nuxt-auth','@nuxt/image'],

	ui: {},

	runtimeConfig: {
		public: {
			mongodbUrl: `mongodb+srv://${process.env.NUXT_DB_USERNAME}:${process.env.NUXT_DB_PASSWORD}@trello.xk40ihq.mongodb.net/?retryWrites=true&w=majority&appName=trello`,
			pixapayApiKey: process.env.PIXAPAY_API_KEY
		},
		auth: {
			secret: process.env.AUTH_SECRET,
			origin: process.env.AUTH_ORIGIN
		}
	},

	auth: {
		baseURL: process.env.AUTH_ORIGIN,
		provider: {
			type: 'authjs'
		}
	}
});
