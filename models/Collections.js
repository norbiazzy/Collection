const {Schema, model, Types} = require("mongoose");

const Collections = new Schema({
    userId: Types.ObjectId,
    items: {type: Array, unique: false},
})

module.exports = model('Collection', Collections)