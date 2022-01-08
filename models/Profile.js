const {Schema, model, Types} = require("mongoose");

const Profile = new Schema({
    userId: {type: Types.ObjectId, ref: 'User'},
    photo: {
        type: String,
        unique: false,
        default: 'https://st2.depositphotos.com/1531183/5770/v/600/depositphotos_57709697-stock-illustration-male-person-silhouette-profile-picture.jpg'
    },
    status: {type: String, default: 'Just status'},
    name: {type: String, default: 'New user'},
    collections: [{type: Types.ObjectId, ref: 'Collection'}],
})

module.exports = model('Profile', Profile)