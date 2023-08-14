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
      url: 'https://www.youtube.com/embed/uctVGETlogU',
      shop: 'TOKOPEDIA OFFICIAL',
    })

    const video2 = new Video({
      title: 'Video 2',
      thumbnail: 'https://pbs.twimg.com/media/ExZ6MYqU4AU4C5u.jpg',
      url: 'https://www.youtube.com/embed/uctVGETlogU',
      shop: 'XIAOMI OFFICIAL',
    })

    const video3 = new Video({
      title: 'Video 3',
      thumbnail:
        'https://lelogama.go-jek.com/cms_editor/2022/08/15/16_Aug_2.jpg',
      url: 'https://www.youtube.com/embed/uctVGETlogU',
      shop: 'SAMSUNG OFFICIAL',
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

    const productLink = [
      'https://akcdn.detik.net.id/visual/2021/04/08/helm-cargloss_169.jpeg?w=650',
      'https://polytron.co.id/wp-content/uploads/2022/04/Masker-4-Lapis-Masker-Hana-KF94-dari-Polytron.jpg',
      'https://polytron.co.id/wp-content/uploads/2021/01/YW50aWtvZGVfXzE1ODA0NTQ3NDBfcHZiMTEyZy1qcGc1.jpg',
      'https://id-media.apjonlinecdn.com/catalog/product/cache/b3b166914d87ce343d4dc5ec5117b502/6/6/669F1PA-1_T1679904750.png',
      'https://i01.appmifile.com/webfile/globalimg/id/cms/EFF3E152-A58B-3634-93A3-F059E98EBDE6!800x800!85.jpg',
      'https://www.yamaha-motor.co.id/uploads/products/featured_image/2023060517060636502W23568.png',
      'https://trexsporting.com/images/products/11-KbmXViHodZ.jpg',
      'https://upload.jaknot.com/2020/05/images/products/c92f5d/original/skmei-jam-tangan-digital-pria-1630.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/Bouteille.jpg/800px-Bouteille.jpg',
      'https://image.uniqlo.com/UQ/ST3/AsianCommon/imagesgoods/438859/item/goods_09_438859.jpg?width=494',
    ]

    // Create 10 prducts
    for (let i = 0; i < 10; i++) {
      const product = new Product({
        title: `Product ${i}`,
        url: `${productLink[i]}`,
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
