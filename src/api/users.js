import { makeClassInvoker } from 'awilix-koa'

class UsersAPI {
  constructor ({ usersService }) {
    this.userService = usersService
  }

  async findUsers (ctx) {
    const users = await this.userService.find()
    ctx.ok(users)
  }

  async createUser (ctx) {
    const user = await this.userService.create()
    ctx.ok(user)
  }
}

export default function (router) {
  const api = makeClassInvoker(UsersAPI)

  router.get('/api/users', api('findUsers'))
  router.post('/api/users', api('createUser'))
}
