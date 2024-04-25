import {Validator} from '#nuxt-server-utils'
import {User} from '~/server/models/User'
import signupSchema from '~/server/schemas/signup.schema'

export default defineEventHandler(async event => {
      const body = await readBody(event)

      Validator.validateSchema(signupSchema, body)

      const user = await User.create(body)

      return {...user?.toObject(), password: undefined}
})
