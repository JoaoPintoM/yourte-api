import mongoose from 'mongoose'
import userSchema from '../models/user'

export class UsersRepository {
  constructor () {
    this.User = mongoose.model('User', userSchema)
  }

  getUser (userId) {
    return this.User.findById(userId).populate('favorites').exec()
  }

  getUserByFacebookId (facebook_id) { // eslint-disable-line
    return this.User.findOne({ facebook_id }).exec()
  }

  get (query) {
    return this.User.find(query).exec()
  }

  createUser (entry) {
    const user = new this.User(entry)
    return user.save()
  }

  updateUser (user) {
    return user.save()
  }

  getTestUsers () {
    return this.User.find({ testing: true }).exec()
  }

  deleteTestUsers () {
    return this.User.remove({ testing: true }).exec()
  }

  async updateUserPhoto(id, photo) {
    console.log('ici lol putain ')
    const user = await this.getUser(id)
    user.picture = photo
    console.log(user.picture)
    return user.save()
  }

}
