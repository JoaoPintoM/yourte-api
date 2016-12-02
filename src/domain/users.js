import { UsersRepository } from '../dao/repositories/users'
import { User } from './objects/user'

const usersRepo = new UsersRepository()

export async function getAllUsers () {
  const users = await usersRepo.get()
  return users.map(u => new User(u))
}

export async function getUser (id) {
  const user = await usersRepo.getUser(id)
  return new User(user)
}
