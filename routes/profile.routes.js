const {Router} = require('express')
const Profile = require("../models/Profile");
const Collection = require("../models/Collection");
const auth = require("../middleware/auth.middleware")
const router = Router()



// /api/profile/get
router.get('/getUser', auth, async (req, res) => {
  try {
    console.log('reg')
    console.log('asdasd')

    console.log('profile')
    const profile = await Profile.findOne({userId: req.user.userId})
    console.log('collection')
    const collections = await Collection.find({userId: req.user.userId})
    if (profile) return res.status(201).json({profile, collections})
    
    return res.status(202).json({message: 'нету профиля...'})
  } catch (e) {
    console.log(e, 'error')
  }
})
// /api/profile/get
router.get('/getUser/:id', auth, async (req, res) => {
  try {
    console.log('profile', req.params.id)
    const profile = await Profile.findById(req.params.id)
    const collections = await Collection.find({userId: profile.userId})
    if (profile) return res.status(201).json({profile, collections})

    return res.status(202).json({message: 'нету профиля...'})
  } catch (e) {
    console.log(e, 'error')
  }
})

module.exports = router