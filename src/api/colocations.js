import { makeClassInvoker } from 'awilix-koa'

class ColocationAPI {
  constructor ({ colocationsService }) {
    this.colocationsService = colocationsService
  }

  async findColocs (ctx) {
    const prms = {}
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
}

export default function (router) {
  const api = makeClassInvoker(ColocationAPI)

  router.get('/api/colocations', api('findColocs'))
  router.get('/api/colocations/geoTest', api('findColocsGeoTest'))
  router.get('/api/colocations/createTest', api('createTest'))
}
