import RoommateRequest from '../models/roommateRequest'

export function getById (id) {
  return RoommateRequest.findById(id).exec()
}

export function get () {
  return RoommateRequest.find().exec()
}

export function getUserRoommatesRequests (userId) {
  return RoommateRequest.find({ user: userId }).exec()
}

export function create (entry) {
  const rr = new RoommateRequest(entry)
  return rr.save()
}

export function update (rr) {
  return rr.save()
}

// Testing
export function getTests () {
  return RoommateRequest.find({ testing: true }).exec()
}

export function deleteTesting () {
  return RoommateRequest.remove({ testing: true }).exec()
}
