import mongoose from 'mongoose'

const commentSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    comment: {
      type: String,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { collection: 'comments' }
)

const Comment = mongoose.model('Comment', commentSchema)

export default Comment
