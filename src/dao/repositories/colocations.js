import mongoose from 'mongoose'
import colocationSchema from '../models/colocation'

export class ColocationRepository {
  constructor () {
    this.Colocation = mongoose.model('Colocation', colocationSchema)
  }

  getColocation (colocationId) {
    return this.Colocation.findById(colocationId).exec()
  }

  get (query) {
    return this.Colocation.find(query).populate('user').exec()
  }

  getByGeo () {
    console.log('oi')
    const long = 4.399925
    const lat = 50.797403

    return this.Colocation.find({
      loc: {
        $near: {
          $geometry: { type: 'Point', coordinates: [ long, lat ] },
          $minDistance: 0,
          $maxDistance: 2000
        }
      }
    })

    // return this.Colocation.aggregate([
    //   { '$geoNear': {
    //     'near': {
    //       'type': 'Point',
    //       'coordinates': [long, lat]
    //     },
    //     'distanceField': 'distance',
    //     'sperical': true,
    //     'maxDistance': 10000
    //   }}
    // ])
  }

  createColocation (entry) {
    const colocation = new this.Colocation(entry)
    return colocation.save()
  }

  updateColocation (colocation) {
    return colocation.save()
  }

  createTestColocation () {
    const colocation = new this.Colocation({
      name: 'Test Position',
      user: '58789bb844bcc155dbeb5af7',
      price: 666,
      'loc': {
        'type': 'Point',
        'coordinates': [-73.97, 40.77]
      }
    })
    console.log(colocation)
    return colocation.save()
  }

  getTestColocations () {
    return this.Colocation.find({ testing: true }).exec()
  }

  deleteTestColocations () {
    return this.Colocation.remove({ testing: true }).exec()
  }
}
