import * as usersDomain from '../domain/users'
import _ from 'lodash'

export default class UsersService {
  constructor ({ currentUser }) {
    this.currentUser = currentUser
  }

  find (prms) {
    console.log(this.currentUser)
    const {
      gender
    } = prms

    const q = {
      gender
    }

    const query = _(q)
                    .omitBy(_.isUndefined)
                    .omitBy(_.isNull)
                    .value()

    console.log(query)
    return usersDomain.getUsers(query)
  }

  getUser (id) {
    return usersDomain.getUser(id)
  }
}
