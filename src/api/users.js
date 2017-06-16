import { makeClassInvoker } from 'awilix-koa'

class UsersAPI {
  constructor ({ usersService, colocationRequestsService }) {
    this.userService = usersService
    this.colocReqService = colocationRequestsService
  }

  async findUsers (ctx) {
    const prms = {}
    if (ctx.query.gender) {
      prms.gender = ctx.query.gender
    }
    const users = await this.userService.find(prms)
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

  async getColocationsRequestsFormUser (ctx) {
    const results = await this.colocReqService
                              .getColocationsRequestsFormUser(ctx.params.id)
    ctx.ok(results)
  }
}

export default function (router) {
  const api = makeClassInvoker(UsersAPI)

  router.get('/api/users', api('findUsers'))
  router.post('/api/users', api('createUser'))

  router.get('/api/users/:id', api('findUser'))
  router.get('/api/users/:id/colocationRequests', api('getColocationsRequestsFormUser'))
}
