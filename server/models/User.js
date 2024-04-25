import mongoose from 'mongoose'
import {generateHash} from '../utils/hash'
import bcrypt from 'bcryptjs'

const UserSchema = new mongoose.Schema(
      {
            name: {
                  type: String,
                  required: true
            },
            email: {
                  type: String,
                  required: true,
                  unique: true,
                  trim: true
            },
            password: {
                  type: String,
                  required: true,
                  select: false
            },
            stripeCustomeId: {
                  type: String,
                  default: null
            }
      },
      {
            timestamps: true
      }
)

UserSchema.pre('save', async function next() {
      if (!this.isModified('password')) return next()
      this.password = await generateHash(this.password)
})

UserSchema.methods.comparePassword = async password => {
      return await bcrypt.compare(password, this.password)
}
export const User = mongoose.model('User', UserSchema)
