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

  async findUser (ctx) {
    let client
    if (ctx.params.id) {
      client = await this.userService.getUser(ctx.params.id)
    }
    ctx.ok(client)
  }
}

export default function (router) {
  const api = makeClassInvoker(UsersAPI)

  router.get('/api/users', api('findUsers'))
  router.post('/api/users', api('createUser'))

  router.get('/api/users/:id', api('findUser'))
}
