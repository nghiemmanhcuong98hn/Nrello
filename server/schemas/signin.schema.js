import {z} from 'zod'

export default z.object({
      email: z
            .string({
                  required_error: 'Please enter your email address',
                  invalid_type_error: 'Please enter a valid email address'
            })
            .email('Please enter a valid email address'),
      password: z
            .string({
                  required_error: 'Please enter your password'
            })
            .min(8, 'Password must have at least 8 characters')
})
