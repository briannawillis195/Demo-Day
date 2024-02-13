const mongoose = require("mongoose");
const { ObjectId } = require("mongodb");

const CommunityForumSchema = new mongoose.Schema({
  user: {
    type: ObjectId,
    ref: 'User',
    required: true,
  },
  name: {
    type: String,
    trim: true,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  reply: {
    type: Boolean,
    required: false,
  },
  response: {
    type: String,
  }
});

module.exports = mongoose.model("CommunityForum", CommunityForumSchema);
