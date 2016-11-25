import mongoose from 'mongoose'
import { config } from '../../config/config'

const Schema = mongoose.Schema
const schema = Schema({ // eslint-disable-line new-cap

  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  colocationName: { type: String },
  price: { type: Number },
  address: { type: String },
  testing: Boolean

}, { collection: config.MONGO.COLLECTIONS.ROOMMATEREQUEST })

const RoommateRequest = mongoose.model('RoommateRequest', schema)
export default RoommateRequest
