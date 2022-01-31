const {Router} = require('express')
const Collection = require("../models/Collection");
const auth = require("../middleware/auth.middleware")
const User = require("../models/User")
const Item = require("../models/Item")
const Profile = require("../models/Profile")
const Comment = require("../models/Comment")

const router = Router()
router.post('/createItem?:id', auth, async (req, res) => {
  try {
    const item = req.body
    item.userId = req.user.userId
    let newItem = new Item(item)
    await Collection.findByIdAndUpdate(item.collectionId, {$addToSet: {items: newItem._id}})
    await newItem.save()
    return res.status(200).json(newItem)
    
  } catch (e) {
    console.log(e, 'error')
    return res.status(400)
  }
})
// /api/collection/createCollection
router.post('/create?:id', auth, async (req, res) => {
  try {
    const userId = req.params.id || req.user.userId
    const obj = req.body
    obj.userId = userId
    let collection = new Collection(obj)
    await User.findByIdAndUpdate(userId, {$addToSet: {collections: collection._id}})
    await collection.save()
    
    return res.status(200).json(collection)
    
  } catch (e) {
    console.log(e, 'error')
    return res.status(400).json({message: 'Коллекцию сохранить не удалось, не все поля зыли заполнены!'})
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
    return res.status(400).json({message: 'error'})
    
  }
})

router.post('/likeItem', auth, async (req, res) => {
    try {
      const {itemId} = req.body
      let userId = req.user.userId
      await Item.findByIdAndUpdate(itemId, {$addToSet: {likes: userId}});
      return res.status(200).json({userId})
      
    } catch (e) {
      console.log(e, 'error')
      return res.status(400)
    }
  }
)
router.post('/dislikeItem', auth, async (req, res) => {
    try {
      const {itemId} = req.body
      let userId = req.user.userId
      await Item.findByIdAndUpdate(itemId, {$pull: {likes: userId}});
      return res.status(200).json({userId})
    } catch
      (e) {
      console.log(e, 'error')
      return res.status(400)
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
      const names = []
      const comments = await Comment.find({itemId})
      for (let i = 0; i < comments.length; i++) {
        let profile = await Profile.findOne({userId: comments[i].userId})
        console.log(profile)
        await names.push(profile.name)
      }
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
router.post('/update', auth, async (req, res) => {
  try {
    let body = req.body
    await Collection.findByIdAndUpdate({_id: body.collectionId}, body)
    return res.status(200).json({message: 'Коллекция обновлена успешно!'})
  } catch (e) {
    return res.status(404).json({message: 'Не удалось обновить коллекцию:('})
  }
})

// /api/collection/deleteCollection
router.delete('/:id', auth, async (req, res) => {
  try {
    const collectionId = req.params.id
    await User.updateMany({collections: [collectionId]}, {$pull: {collections: [collectionId]}})
    await Collection.deleteMany({_id: collectionId})
    await Item.deleteMany({collectionId})
    return res.status(200).json('Удалили...')
  } catch (e) {
    console.log(e, 'error')
    return res.status(400).json('Не удалили...')
  }
})
router.get('/itemList', async (req, res) => {
  try {
    let itemList = await Item.find()
    let result = []
    for (let i = 0; i < itemList.length; i++) {
      let collectionInfo = await Collection.findById(itemList[i].collectionId, {name: 1, topic: 1,})
      let userInfo = await User.findById(itemList[i].userId, {email: 1})
      result = [...result, {item: itemList[i], collectionInfo, userInfo}]
    }
    return res.status(200).json({result})
    
  } catch (e) {
    console.log(e, 'error')
    return res.status(404)
  }
})
router.get('/list', async (req, res) => {
  try {
    let collectionList = await Collection.find()
    let result = []
    for (let i = 0; i < collectionList.length; i++) {
      let author = await User.findById(collectionList[i].userId, {email: 1})
      result = [...result, {collection: collectionList[i], author}]
    }
    return res.status(200).json({result})
    
  } catch (e) {
    console.log(e, 'error')
    return res.status(404)
  }
})
// /api/collection/getCollection
router.get('/:id', async (req, res) => {
  try {
    let collection = await Collection.findById(req.params.id)
    if (!collection) throw new Error('Collection is not defined')
    let items = await Item.find({collectionId: req.params.id})
    return res.status(200).json({collection, items})
  } catch (e) {
    console.log(e, 'error')
    return res.status(404).json({message: e.message})
  }
})

module.exports = router