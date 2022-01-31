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
// router.get('/popularItems', async (req, res) => {
//   try {
//     let items = await Item.find()
//     let collectionInfo = {
//       collectionsName: [],
//       headersInp: []
//     }
//     let collectionsName = []
//     for (let i = 0; i < items.length; i++) {
//       let c = await Collection.findById(items[i].collectionId)
//       collectionInfo.collectionsName.push(c.name)
//       collectionInfo.headersInp.push(c.headersInp)
//     }
//     console.log(collectionsName)
//     return res.status(200).json({items, collectionInfo, message: 'ахуенчик2'})
//
//   } catch (e) {
//     console.log(e, 'error')
//   }
// })
module.exports = router