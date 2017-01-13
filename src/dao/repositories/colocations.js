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

  createColocation (entry) {
    const colocation = new this.Colocation(entry)
    return colocation.save()
  }

  updateColocation (colocation) {
    return colocation.save()
  }

  getTestColocations () {
    return this.Colocation.find({ testing: true }).exec()
  }

  deleteTestColocations () {
    return this.Colocation.remove({ testing: true }).exec()
  }
}
