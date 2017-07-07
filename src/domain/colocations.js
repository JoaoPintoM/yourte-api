import { ColocationRepository } from '../dao/repositories/colocations'
import { Colocation } from './objects/colocation'

const repo = new ColocationRepository()

export async function getColocations (query) {
  console.log('')
  console.log('')
  console.log('')
  console.log(query)
  console.log(' ')

  let colocs = {}
  if (query.lng && query.lat) {
    colocs = await repo.getByGeo(query)
  } else {
    colocs = await repo.get(query)
  }
  return colocs.map(x => new Colocation(x))
}

export async function getByGeo (query) {
  const colocs = await repo.getByGeo(query)
  return colocs.map(x => new Colocation(x))
}

export async function createTest () {
  const coloc = await repo.createTestColocation()
  return new Colocation(coloc)
}

export async function create (body) {
  const result = await repo.createColocation(body)
  return new Colocation(result)
}
