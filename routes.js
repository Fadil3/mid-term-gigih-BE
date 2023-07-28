import { Router } from 'express'
import {
  createVideo,
  deleteVideo,
  getDetailVideo,
  getVideos,
  updateVideo,
} from './controllers/video.js'

import { createComment, getComments } from './controllers/comment.js'
import {
  getProducts,
  createProduct,
  updateProduct,
} from './controllers/product.js'

const router = Router()

// videos
router.get('/videos', getVideos)
router.get('/videos/:id', getDetailVideo)
router.post('/videos', createVideo)
router.put('/videos/:id', updateVideo)
router.delete('/videos/:id', deleteVideo)

// comments
router.get('/comments', getComments) // get all comments
router.post('/videos/:id/comments', createComment)

router.get('/products', getProducts)
router.post('/videos/:id/products', createProduct)
router.put('/videos/:id/products/:id', updateProduct)

export default router
