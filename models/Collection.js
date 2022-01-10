const {Schema, model, Types} = require("mongoose");

const Collection = new Schema({
    userId: {type: Types.ObjectId, ref: 'User'},
    items: {type: Array},
    name: {type: String, required: true},
    description: {type: String},
    created: {type: Date, default: Date.now},
    topic: {type: String, required: true},
    amountInputs: {
        str: {type: Number},
        num: {type: Number},
        text: {type: Number},
        boolean: {type: Number},
        date: {type: Number}
    }
})

module.exports = model('Collection', Collection)