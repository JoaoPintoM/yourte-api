import * as usersCtrl from '../dao/controllers/users'
import { User } from './objects/user'

export async function getAllUsers (id) {
  const _users = await usersCtrl.get()

  const users = _users.map((u) => new User({
    id: u._id,
    username: u.username
  }))

  return users
}
