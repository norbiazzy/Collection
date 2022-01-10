const {Router} = require('express')
const Collection = require("../models/Collection");
const auth = require("../middleware/auth.middleware")
const User = require("../models/User")
const router = Router()


// /api/collection/createCollection
router.post('/createCollection', auth, async (req, res) => {
  try {
    const obj = req.body
    obj.userId = req.user.userId
    console.log(1)
    // if (!obj.name || !obj.topic) return res.status(400).json({message: 'заебись... пустое поле'})
    let collection = new Collection(obj)
    await User.findByIdAndUpdate(req.user.userId, (user)=>{
      user.collections = [...user.collections, collection._id]
    })
    await collection.save()
    
    return res.status(200).json({message: 'заебись...'})
    
  } catch (e) {
    console.log(e, 'error')
  }
})

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
    return res.status(200).json(collection)
  } catch (e) {
    console.log(e, 'error')
  }
})
module.exports = router