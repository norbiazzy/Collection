const {Schema, model, Types} = require("mongoose");

const Collection = new Schema({
    userId: {type: Types.ObjectId, ref: 'User'},
    items: [{type:Types.ObjectId}],
    name: {type: String, required: true},
    description: {type: String},
    created: {type: Date, default: Date.now},
    topic: {type: String, required: true},
    headersInp: {
        str: [],
        num: [],
        text: [],
        boolean: [],
        date: []
    }
})

module.exports = model('Collection', Collection)