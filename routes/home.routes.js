const {Router} = require('express')
const Collection = require("../models/Collection");
const Item = require("../models/Item");
const auth = require("../middleware/auth.middleware")

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
router.get('/popularItems', async (req, res) => {
  try {
    let items = await Item.find()
    let collectionsName = []
    for (let i = 0; i < items.length; i++) {
      let c = await Collection.findById(items[i].collectionId)
      collectionsName.push(c.name)
    }
    console.log(collectionsName)
    return res.status(200).json({items, collectionsName, message: 'ахуенчик2'})
    
  } catch (e) {
    console.log(e, 'error')
  }
})
module.exports = router