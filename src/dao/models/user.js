import mongoose from 'mongoose'

const userSchema = mongoose.Schema({
  username: String,
  password: String,
  facebook_id: String,
  twitter_id: String,
  google_id: String,
  testing: Boolean
})

// module.exports = mongoose.model('User', userSchema)
export default userSchema
