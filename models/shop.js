import mongoose from 'mongoose'

const shopSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
  },
  { collection: 'shops' }
)

const Shop = mongoose.model('Shop', shopSchema)

export default Shop
