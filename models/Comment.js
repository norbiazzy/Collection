const {Schema, model, Types} = require("mongoose");

const Comment = new Schema({
  userId: {type: Types.ObjectId, ref: 'User', require: true},
  itemId: {type: Types.ObjectId, ref: 'Item', require: true},
  body: {type: String, require: true},
  created: {type: Date, default: Date.now},
})

module.exports = model('Comment', Comment)