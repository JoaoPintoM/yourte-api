import ColocationRequest from '../models/colocationRequest'

export function getById (id) {
  return ColocationRequest.findById(id).exec()
}

export function get () {
  return ColocationRequest.find().exec()
}

export function create (entry) {
  const cr = new ColocationRequest(entry)
  return cr.save()
}

export function update (colocationRequest) {
  return colocationRequest.save()
}

// Testing
export function getTests () {
  return ColocationRequest.find({ testing: true }).exec()
}

export function deleteTesting () {
  return ColocationRequest.remove({ testing: true }).exec()
}
