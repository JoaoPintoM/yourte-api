import { makeClassInvoker } from 'awilix-koa'

class ColocationAPI {
  constructor ({ colocationsService }) {
    this.colocationsService = colocationsService
  }

  async findColocs (ctx) {
    const prms = {}
    if (ctx.query.lng && ctx.query.lat) {
      prms.lng = ctx.query.lng
      prms.lat = ctx.query.lat
    }
    const colocs = await this.colocationsService.find(prms)
    ctx.ok(colocs)
  }

  async findColocsGeoTest (ctx) {
    const prms = {}
    const colocs = await this.colocationsService.findGeoTest(prms)
    ctx.ok(colocs)
  }

  async createTest (ctx) {
    const coloc = await this.colocationsService.createTest()
    ctx.ok(coloc)
  }

  async create (ctx) {
    const colocToAdd = ctx.request.body
    colocToAdd.user = ctx.state.jwtdata

    const coloc = await this.colocationsService.create(ctx.request.body)
    ctx.ok(coloc)
  }
}

export default function (router) {
  const api = makeClassInvoker(ColocationAPI)

  router.get('/api/colocations', api('findColocs'))
  router.post('/api/colocations/create', api('create'))
  router.get('/api/colocations/geoTest', api('findColocsGeoTest'))
  router.get('/api/colocations/createTest', api('createTest'))
}
