import mongoose from 'mongoose'
import userSchema from '../models/user'

export class UsersRepository {
  constructor () {
    this.User = mongoose.model('User', userSchema)
  }

  getUser (userId) {
    return this.User.findById(userId).exec()
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
}
