import mongoose from 'mongoose'
import Video from './models/video.js'
import Comment from './models/comment.js'
import Product from './models/product.js'
import Shop from './models/shop.js'

mongoose
  .connect(
    'mongodb://clklb1mv300dg9jof7y30a9j5:V2qzdCw39t0g7YOui7wTX3jG@103.253.145.117:8951/?readPreference=primary&ssl=false',
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(async () => {
    console.log('Connected to MongoDB')

    // Delete all data from the database
    await Video.deleteMany({})
    await Comment.deleteMany({})
    await Product.deleteMany({})
    console.log('Data deleted successfully.')

    // create shop
    const shop1 = new Shop({
      name: 'TOKOPEDIA OFFICIAL',
    })

    const shop2 = new Shop({
      name: 'XIAOMI OFFICIAL',
    })

    const shop3 = new Shop({
      name: 'SAMSUNG OFFICIAL',
    })

    const savedShop = await Shop.insertMany([shop1, shop2, shop3])

    // Create three videos
    const video1 = new Video({
      title: 'Video 1',
      thumbnail: 'https://pbs.twimg.com/media/ExYjC6GUYAEftoG.jpg',
    })

    const video2 = new Video({
      title: 'Video 2',
      thumbnail: 'https://pbs.twimg.com/media/ExZ6MYqU4AU4C5u.jpg',
    })

    const video3 = new Video({
      title: 'Video 3',
      thumbnail:
        'https://lelogama.go-jek.com/cms_editor/2022/08/15/16_Aug_2.jpg',
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
        shop: savedShop[Math.floor(Math.random() * savedShop.length)]._id,
        view: Math.floor(Math.random() * 100),
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
