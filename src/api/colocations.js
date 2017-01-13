import { makeClassInvoker } from 'awilix-koa'

class ColocationAPI {
  constructor ({ colocationsService }) {
    this.colocationsService = colocationsService
  }

  async findColocs (ctx) {
    const prms = {}
    if (ctx.query.gender) {
      prms.gender = ctx.query.gender
    }
    const colocs = await this.colocationsService.find(prms)
    ctx.ok(colocs)
  }
}

export default function (router) {
  const api = makeClassInvoker(ColocationAPI)

  router.get('/api/colocations', api('findColocs'))
}
