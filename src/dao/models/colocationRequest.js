import mongoose from 'mongoose'
import { config } from '../../config/config'

const Schema = mongoose.Schema
const schema = Schema({ // eslint-disable-line new-cap

  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  maxPrice: { type: Number },
  testing: Boolean

}, { collection: config.MONGO.COLLECTIONS.COLOCREQUEST })

const ColocationRequest = mongoose.model('ColocationRequest', schema)
export default ColocationRequest
