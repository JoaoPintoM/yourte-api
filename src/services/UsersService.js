import * as usersDomain from '../domain/users'

export default class ClassService {
  constructor ({ currentUser }) {
    this.currentUser = currentUser
  }

  find () {
    console.log(this.currentUser)
    return usersDomain.getAllUsers()
  }
}
