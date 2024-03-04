const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const downloadSchema = new Schema({
  url: {
    type: String,
    required: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    require: true,
  },
});

module.exports = mongoose.model("Download", downloadSchema);
