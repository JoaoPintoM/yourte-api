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
  }
})

colocationSchema.index({ 'loc': '2dsphere' })
export default colocationSchema
