import * as usersCtrl from '../dao/controllers/users'
import { User } from './objects/user'

export async function getAllUsers () {
  const users = await usersCtrl.get()
  return users.map(u => new User(u))
}

export async function getUser (id) {
  const user = await usersCtrl.getUser(id)
  return new User(user)
}
