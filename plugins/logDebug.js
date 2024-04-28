export default defineNuxtPlugin(nuxtApp => {
	return {
		provide: {
			logDebug: (msg, error) => {
				console.error(msg)
				console.error(error)
			}
		}
	};
});
