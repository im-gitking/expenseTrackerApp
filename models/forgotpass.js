const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const forgotpassSchema = new Schema({
  uuid: {
    type: String,
    required: true,
  },
  isActive: {
    type: Boolean,
    required: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    require: true,
  },
});

module.exports = mongoose.model("Forgotpassword", forgotpassSchema);
