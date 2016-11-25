import User from '../models/user'

export function getUser (userId) {
  return User.findById(userId).exec()
}

export function get () {
  return User.find().exec()
}

export function createUser (entry) {
  const user = new User(entry)
  return user.save()
}

export function updateUser (user) {
  return user.save()
}
