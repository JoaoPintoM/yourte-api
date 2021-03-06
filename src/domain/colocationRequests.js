import * as colocCtrl from '../dao/repositories/colocationRequests'
import { ColocationRequest } from './objects/colocationRequest'

export async function getColocationsRequestsFormUser (userId) {
  const colocs = await colocCtrl.getUserColocationsRequests(userId)
  return colocs.map(c => new ColocationRequest(c))
}
