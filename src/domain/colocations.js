import { ColocationRepository } from '../dao/repositories/colocations'
import { Colocation } from './objects/colocation'

const repo = new ColocationRepository()

export async function getColocations (query) {
  const colocs = await repo.get(query)
  console.log(colocs)
  return colocs.map(x => new Colocation(x))
}
