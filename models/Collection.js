const {Schema, model, Types} = require("mongoose");

const Collection = new Schema({
  userId: {type: Types.ObjectId, ref: 'User'},
  items: [{type: Types.ObjectId, ref: 'Item'}],
  name: {type: String, required: true},
  description: {type: String},
  created: {type: Date, default: Date.now},
  topic: {value: {type: String, required: true}, label: {type: String, required: true}},
  headers: {
    text: [{header: {type: String}}],
    number: [{header: {type: String}}],
    textarea: [{header: {type: String}}],
    checkbox: [{header: {type: String}}],
    date: [{header: {type: String}}]
  }
})

module.exports = model('Collection', Collection)