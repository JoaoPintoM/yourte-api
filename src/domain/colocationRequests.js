import * as colocCtrl from '../dao/controllers/colocationRequests'

export async function getColocationsRequestsFormUser (userId) {
  const colocs = await colocCtrl.get()
  return colocs
}
