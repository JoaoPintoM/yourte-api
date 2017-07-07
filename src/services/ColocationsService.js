import * as colocDomain from '../domain/colocations'
import _ from 'lodash'
import { sendEmail } from './emailService'

const getPriceQuery = (minPrice, maxPrice) => {
  if (minPrice && maxPrice) {
    return { $gte: minPrice, $lte: maxPrice }
  } else if (minPrice) {
    return { $gte: minPrice }
  } else if (maxPrice) {
    return { $lte: maxPrice }
  } else {
    return 0
  }
}

export default class ColocationsService {
  constructor ({ currentUser }) {
    this.currentUser = currentUser
    console.log('ColocationsService constructor:')
    console.log(this.currentUser)
  }

  createTest () {
    return colocDomain.createTest()
  }

  create (prms) {
    return colocDomain.create(prms)
  }

  findGeoTest (prms) {
    return colocDomain.getByGeo(prms)
  }

  find (prms) {
    console.log('prms', prms)
    const {
      gender,
      lng,
      lat,
      minPrice,
      maxPrice
    } = prms

    const q = { gender, lng, lat }

    if (minPrice || maxPrice) {
      q.price = getPriceQuery(minPrice, maxPrice)
    }

    const query = _(q)
                    .omitBy(_.isUndefined)
                    .omitBy(_.isNull)
                    .value()

    console.log(query)
    return colocDomain.getColocations(query)
  }

  contact (prms) {
    // return sendEmail('piro@live.be', { name: 'super machin' }, { message: 'je voudrais ton appart' })
    return { message: 'ok' }
  }
}
