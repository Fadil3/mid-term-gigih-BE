import mongoose from 'mongoose'
import Video from './models/video.js'
import Comment from './models/comment.js'
import Product from './models/product.js'

mongoose
  .connect('mongodb://localhost:27017/tokopedia-play', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(async () => {
    console.log('Connected to MongoDB')

    // Create three videos
    const video1 = new Video({
      title: 'Video 1',
      thumbnail: 'https://example.com/thumbnail1',
      url: 'https://example.com/video1',
    })

    const video2 = new Video({
      title: 'Video 2',
      thumbnail: 'https://example.com/thumbnail2',
      url: 'https://example.com/video2',
    })

    const video3 = new Video({
      title: 'Video 3',
      thumbnail: 'https://example.com/thumbnail3',
      url: 'https://example.com/video3',
    })

    // Save the videos to the database
    const savedVideos = await Video.insertMany([video1, video2, video3])

    // Create 10 comments
    for (let i = 0; i < 10; i++) {
      const comment = new Comment({
        username: `user${i}`,
        comment: `Comment ${i}`,
      })
      await comment.save()
      await Video.findByIdAndUpdate(
        savedVideos[Math.floor(Math.random() * savedVideos.length)]._id,
        {
          $push: { comments: comment._id },
        },
        {
          new: true,
          useFindAndModify: false,
        }
      )
    }

    // Create 10 prducts
    for (let i = 0; i < 10; i++) {
      const product = new Product({
        title: `Product ${i}`,
        url: `https://example.com/product${i}`,
        price: Math.floor(Math.random() * 1000000),
      })
      await product.save()
      await Video.findByIdAndUpdate(
        savedVideos[Math.floor(Math.random() * savedVideos.length)]._id,
        {
          $push: { products: product._id },
        },
        {
          new: true,
          useFindAndModify: false,
        }
      )
    }

    console.log('Data populated successfully.')
    mongoose.disconnect()
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error)
  })
