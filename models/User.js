const {Schema, model, Types} = require("mongoose");

const User = new Schema({
    _id: Types.ObjectId,
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    blocked: {type: Boolean, default: false},
    role: {type: String, required: true, ref: 'Role'},
    profile: {type: Types.ObjectId, ref:'Profile'},
    collections: {type: Types.ObjectId, ref: 'Collection' },
})

module.exports = model('User', User)