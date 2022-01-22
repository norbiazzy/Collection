const {Router} = require('express')
const Collection = require("../models/Collection");
const auth = require("../middleware/auth.middleware")
const User = require("../models/User")
const Item = require("../models/Item")
const Profile = require("../models/Profile")
const Comment = require("../models/Comment")

const router = Router()
// /api/collection/createCollection
router.post('/create', auth, async (req, res) => {
  try {
    const obj = req.body
    obj.userId = req.user.userId
    // if (!obj.name || !obj.topic) return res.status(400).json({message: 'заебись... пустое поле'})
    let collection = new Collection(obj)
    await User.findByIdAndUpdate(req.user.userId, {$addToSet: {collections: collection._id}})
    await collection.save()

    return res.status(200).json({message: 'заебись...'})

  } catch (e) {
    console.log(e, 'error')
  }
})
router.post('/createItem', auth, async (req, res) => {
  try {
    const item = req.body
    item.userId = req.user.userId
    // if (!obj.name || !obj.topic) return res.status(400).json({message: 'заебись... пустое поле'})
    let newItem = new Item(item)
    await Collection.findByIdAndUpdate(item.collectionId, {$addToSet: {items: newItem._id}})
    await newItem.save()
    // await User.findByIdAndUpdate(req.user.userId, (user)=>{
    //   user.collections = [...user.collections, collection._id]
    // })
    // await collection.save()

    return res.status(200).json({message: 'заебись...'})

  } catch (e) {
    console.log(e, 'error')
  }
})
router.post('/deleteItem', auth, async (req, res) => {
  try {
    const {itemId} = req.body
    await Item.findByIdAndDelete(itemId)
    await Collection.findOneAndUpdate({items: {$all: [itemId]}}, {$pullAll: {items: [itemId]}})
    return res.status(200).json({message: 'Удалили...'})
  } catch (e) {
    console.log(e, 'error')
  }
})
router.post('/likeItem', auth, async (req, res) => {
    try {
      const {itemId} = req.body
      let userId = req.user.userId
      await Item.findByIdAndUpdate(itemId, {$addToSet: {likes: userId}});
      return res.status(200).json({message: 'Лайк!', userId})

    } catch
      (e) {
      console.log(e, 'error')
    }
  }
)
router.post('/dislikeItem', auth, async (req, res) => {
    try {
      const {itemId} = req.body
      let userId = req.user.userId
      await Item.findByIdAndUpdate(itemId, {$pull: {likes: userId}});
      return res.status(200).json({message: 'Дизлайк(!', userId})
    } catch
      (e) {
      console.log(e, 'error')
    }
  }
)
router.post('/updateItem', auth, async (req, res) => {
    try {
      const item = req.body
      await Item.findByIdAndUpdate(item._id, item);
      return res.status(200).json({message: 'UPDATE!!!'})

    } catch
      (e) {
      console.log(e, 'error')
    }
  }
)
router.post('/comment', auth, async (req, res) => {
    try {
      const commentBody = req.body
      commentBody.userId = req.user.userId
      const newComment = new Comment(commentBody)
      await newComment.save()
      await Item.findByIdAndUpdate(commentBody.itemId, {$addToSet: {comments: newComment._id}})
      return res.status(200).json({message: 'new comment!!!'})
    } catch
      (e) {
      console.log(e, 'error')
    }
  }
)
router.get('/comment/:id', async (req, res) => {
    try {
      const itemId = req.params.id

      const comments = await Comment.find({itemId})
      const names = await comments.map(comment => {
        let profile = Profile.findOne({userId: comment.userId}, (e, p)=>{
          return p.name
        })
        return profile.name
      })
      console.log(names)
      return res.status(200).json({comments, names})
    } catch
      (e) {
      console.log(e, 'error')
    }
  }
)

// /api/collection/createCollection
router.post('/getCollectionsList', auth, async (req, res) => {
  try {
    console.log(req.user.userId)
    let collections = await Collection.find({userId: req.user.userId})
    return res.status(200).json(collections)
  } catch (e) {
    console.log(e, 'error')
  }
})
// /api/collection/getCollection
router.get('/:id', async (req, res) => {
  try {
    let collection = await Collection.findById(req.params.id)
    let items = await Item.find({collectionId: req.params.id})
    return res.status(200).json({collection, items})
  } catch (e) {
    console.log(e, 'error')
  }
})
module.exports = router