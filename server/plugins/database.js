import mongoose from 'mongoose'

export default defineNitroPlugin(async () => {
    const config = useRuntimeConfig()

    try {
        await mongoose.connect(
            config.public.mongodbUrl ??
                'mongodb+srv://nghiemmanhcuong98hn:0987954221@trello.xk40ihq.mongodb.net/?retryWrites=true&w=majority&appName=trello'
        )
        console.log('Connect database successfully!')
    } catch (error) {
        console.log(error)
    }
})
