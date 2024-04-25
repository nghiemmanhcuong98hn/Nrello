import {NuxtAuthHandler} from '#auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import {User} from '~/server/models/User'

export default NuxtAuthHandler({
      secret: useRuntimeConfig().auth.secret,

      providers: [
            CredentialsProvider.default({
                  name: 'credentials',
                  origin: useRuntimeConfig().auth.origin,
                  authorize: async credentials => {
                        // logic login would go
                        const user = await User.findOne({email: credentials.email})
                        if (!user) return null
                        const invalid = await user.comparePassword(credentials.password)
                        if (!invalid) return null

                        return user.toObject()
                  }
            })
      ],

})
