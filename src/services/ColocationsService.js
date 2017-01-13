import * as colocDomain from '../domain/colocations'
import _ from 'lodash'

export default class ColocationsService {
  constructor ({ currentUser }) {
    this.currentUser = currentUser
    console.log('ColocationsService constructor:')
    console.log(this.currentUser)
  }

  createTest () {
    return colocDomain.createTest()
  }

  findGeoTest (prms) {
    return colocDomain.getByGeo(prms)
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
    return colocDomain.getColocations(query)
  }
}