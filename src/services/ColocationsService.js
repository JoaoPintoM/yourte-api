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

const getFiltersQuery = (array) => {
  return { $all : array }
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
      maxPrice,
      filters
    } = prms

    const q = { gender, lng, lat, filters }


    if (minPrice || maxPrice) {
      q.price = getPriceQuery(minPrice, maxPrice)
    }

    const query = _(q)
                    .omitBy(_.isUndefined)
                    .omitBy(_.isNull)
                    .omitBy(_.isEmpty)
                    .value()

    if (query.filters) {
      if (typeof query.filters === 'string') {
        query.filters = [query.filters]
      }

      query.filters = getFiltersQuery(query.filters);
    }
    console.log(query)
    return colocDomain.getColocations(query)
  }

  contact (prms) {
    return sendEmail(prms.email, { name: 'contact colocation' }, { message: prms.message })
  }
}
