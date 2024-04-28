import mongoose from 'mongoose';

export default defineNitroPlugin(async () => {
	const config = useRuntimeConfig();

	try {
		if (!mongoose.connection.readyState) {
			await mongoose.connect(config.public.mongodbUrl);
			console.log('Connect database successfully!');
		}
	} catch (error) {
		console.log(error);
	}
});
