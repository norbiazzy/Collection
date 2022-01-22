const {Router} = require('express')
const Collection = require("../models/Collection");
const Item = require("../models/Item");
const User = require("../models/User");
const Profile = require("../models/Profile");
const Comment = require("../models/Comment");

const router = Router()
// /api/home/bigCollections
router.get('/bigCollections', async (req, res) => {
  try {
    const collections = await Collection.find()
    return res.status(200).json({collections})

  } catch (e) {
    console.log(e, 'error')
    return res.status(409).json(e)
  }
})
router.get('/users', async (req, res) => {
  try {
    const users = await User.find()
    return res.status(200).json({users})
  } catch (e) {
    console.log(e, 'error')
    return res.status(409).json(e)
  }
})
router.delete('/user/:id', async (req, res) => {
  try {
    const userId = req.params.id
    await User.findByIdAndDelete(userId)
    await Collection.deleteMany({userId})
    await Profile.deleteMany({userId})
    await Comment.deleteMany({userId})
    await Item.deleteMany({userId})
    await Item.updateMany({likes: [userId]}, {$pull: {likes: userId}})
    await Item.updateMany({comments: [userId]}, {$pull: {comments: userId}})
    return res.status(200).json({message: 'удалили...'})
  } catch (e) {
    console.log(e, 'error')
    return res.status(409).json(e)
  }
})
router.get('/popularItems', async (req, res) => {
  try {
    let items = await Item.find()
    let collectionInfo = {
      collectionsName: [],
      headersInp: []
    }
    let collectionsName = []
    for (let i = 0; i < items.length; i++) {
      let c = await Collection.findById(items[i].collectionId)
      collectionInfo.collectionsName.push(c.name)
      collectionInfo.headersInp.push(c.headersInp)
    }
    console.log(collectionsName)
    return res.status(200).json({items, collectionInfo, message: 'ахуенчик2'})

  } catch (e) {
    console.log(e, 'error')
  }
})
module.exports = router