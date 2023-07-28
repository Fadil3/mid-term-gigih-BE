import commentSchema from '../models/comment.js'
import Video from '../models/video.js'

export const getComments = async (req, res) => {
  try {
    const comments = await commentSchema.find()
    res.json(comments)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const createComment = async (req, res) => {
  const comment = new commentSchema({
    username: req.body.username,
    comment: req.body.comment,
  })

  try {
    const newComment = await Video.findByIdAndUpdate(
      req.params.id,
      {
        $push: { comments: comment._id },
      },
      {
        new: true,
        useFindAndModify: false,
      }
    )
    await comment.save()
    res.status(201).json({ message: 'Comment created', newComment })
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}
