import * as colocDomain from '../domain/colocationRequests'

export default class ClassService {
  constructor ({ currentUser }) {
    this.currentUser = currentUser
  }

  getColocationsRequestsFormUser (id) {
    return colocDomain.getColocationsRequestsFormUser(id)
  }
}
