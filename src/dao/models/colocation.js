import mongoose from 'mongoose'

const Schema = mongoose.Schema
const colocationSchema = Schema({ // eslint-disable-line new-cap

  name: { type: String, default: 'no-name' },
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  price: { type: Number },
  testing: Boolean,
  loc: {
    type: { type: String },
    coordinates: [Number]
  },
  adress: String,
  description: { type: String, default: 'pas de description :(' },
  images: { type: [String], required: true },
  filters: { type: [String] }
})

colocationSchema.index({ 'loc': '2dsphere' })
export default colocationSchema
