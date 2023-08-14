import videoSchema from '../models/video.js'

export const getVideos = async (req, res) => {
  try {
    const videos = await videoSchema
      .find()
      .populate('comments')
      .populate('products')
      .populate('shops')
    res.json(videos)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const getDetailVideo = async (req, res) => {
  try {
    // aggregate
    const video = await videoSchema
      .findById(req.params.id)
      .populate('comments')
      .populate('products')
      .populate('shops')
    // add views
    const incVideo = await videoSchema.findById(req.params.id)
    incVideo.views += 1
    await video.save()
    res.json(video)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const createVideo = async (req, res) => {
  const video = new videoSchema({
    title: req.body.title,
    thumbnail: req.body.thumbnail,
  })

  try {
    const newVideo = await video.save()
    res.status(201).json(newVideo)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

export const updateVideo = async (req, res) => {
  try {
    const video = await videoSchema.findById(req.params.id)
    if (req.body.title) {
      video.title = req.body.title
    }
    if (req.body.thumbnail) {
      video.thumbnail = req.body.thumbnail
    }
    const updatedVideo = await video.save()
    res.json(updatedVideo)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

export const deleteVideo = async (req, res) => {
  try {
    const video = await videoSchema.findById(req.params.id)
    await video.remove()
    res.json({ message: 'Video deleted' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
