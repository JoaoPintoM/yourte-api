/* eslint-disable */

// API
/api/colocation-request/30/find/
service.getRoomatesForColocation(30)

// services
getRoomatesForColocation(id) {
  await do.findColocationRequests(30)
  await do.findRoomatesBasedOnColocationRequest(colocationRequest)
}

// Domain
findColocationRequests(id) {
  dao.getColocationRequest(50)

}

//dao
getColocationRequest(id) {
  const cR = await DBSCHEMA.findById(id)
  return {cr.name, cr.stuff}
}
