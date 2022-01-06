const {Schema, model, Types} = require("mongoose");

const schema = new Schema({
    _id: Types.ObjectId,
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    role: {type: String, required: true, ref: 'Role'},
    blocked: {type: Boolean, default: false}
    // profile: {type: Schema.Types.ObjectId, required: true, ref:'Profile'},
    // collections: {type: Schema.Types.ObjectId, required: true, ref: 'Collections' },
})

module.exports = model('User', schema)