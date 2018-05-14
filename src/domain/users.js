import { UsersRepository } from '../dao/repositories/users'
import { User } from './objects/user'

const usersRepo = new UsersRepository()

export async function getUsers (query) {
  const users = await usersRepo.get(query)
  return users.map(u => new User(u))
}

export async function getUser (id) {
  return await usersRepo.getUser(id)
}
