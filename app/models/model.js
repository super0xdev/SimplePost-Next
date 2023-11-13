const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  content: {
    required: true,
    type: String,
  },
});

module.exports = mongoose.models.Post || mongoose.model("Post", postSchema);
