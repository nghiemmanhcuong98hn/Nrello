import mongoose from 'mongoose'

export default defineNitroPlugin(async() => {
      const config = useRuntimeConfig()

     try {
            await  mongoose.connect(config.public.mongodbUrl)
            console.log('Connect database successfully!');
     } catch (error) {
            console.log(error);
     }
})