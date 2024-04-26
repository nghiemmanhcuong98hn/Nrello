import {NuxtAuthHandler} from '#auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import {User} from '~/server/models/User'

const getUser = async id => {
      const user = await User.findById(id)
      return user?.toJSON()
}

export default NuxtAuthHandler({
      secret: useRuntimeConfig().auth.secret,

      pages: {
            signIn: '/auth/signin'
      },

      providers: [
            CredentialsProvider.default({
                  name: 'credentials',
                  origin: useRuntimeConfig().auth.origin,
                  async authorize(credentials) {
                        // logic login would go
                        const user = await User.findOne({email: credentials.email}).select('+password')
                        if (!user) return null
                        const invalid = await user.comparePassword(credentials.password)
                        if (!invalid) return null

                        return user.toObject()
                  }
            })
      ],
      session: {
            strategy: 'jwt'
      },
      callbacks: {
            async jwt({token, user}) {
                  if (user) {
                        return {
                              ...token,
                              ...user
                        }
                  }
                  return token
            },

            async session({session, token}) {
                  const refreshedUser = await getUser(token?._id)

                  return {
                        ...token,
                        ...session?.user,
                        ...refreshedUser
                  }
            }
      }
})
