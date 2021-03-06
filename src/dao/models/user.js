import mongoose from 'mongoose'
const Schema = mongoose.Schema

const userSchema = mongoose.Schema({
  username: String,
  password: String,
  facebook_id: String,
  twitter_id: String,
  google_id: String,
  testing: Boolean,
  picture: String,
  gender: String,
  favorites: [{ type: Schema.Types.ObjectId, ref: 'Colocation' }]
})

// module.exports = mongoose.model('User', userSchema)
export default userSchema
