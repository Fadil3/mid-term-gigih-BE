import productSchema from '../models/product.js'
import Video from '../models/video.js'

export const getProducts = async (req, res) => {
  try {
    const products = await productSchema.find()
    res.json(products)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const getDetailProduct = async (req, res) => {
  try {
    const product = await productSchema.findById(req.params.id)
    res.json(product)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const createProduct = async (req, res) => {
  const product = new productSchema({
    title: req.body.title,
    url: req.body.url,
    price: req.body.price,
  })

  try {
    const newProduct = await Video.findByIdAndUpdate(
      req.params.id,
      {
        $push: { products: product._id },
      },
      {
        new: true,
        useFindAndModify: false,
      }
    )
    await product.save()

    res.status(201).json(newProduct)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

export const updateProduct = async (req, res) => {
  try {
    const product = await productSchema.findById(req.params.id)
    if (req.body.title) {
      product.title = req.body.title
    }
    if (req.body.url) {
      product.url = req.body.url
    }
    if (req.body.thumbnail) {
      product.thumbnail = req.body.thumbnail
    }
    const updatedProduct = await product.save()
    res.json(updatedProduct)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}
