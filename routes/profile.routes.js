const {Router} = require('express')
const Profile = require("../models/Profile");
const Collection = require("../models/Collection");
const auth = require("../middleware/auth.middleware")
const router = Router()


// /api/profile/get
router.get('/getUser', auth, async (req, res) => {
  try {
    console.log(123)
    const profile = await Profile.findOne({userId: req.user.userId})
    const collections = await Collection.find({userId: req.user.userId})
    if (profile) return res.status(201).json({profile, collections})
    
    return res.status(202).json({message: 'нету профиля...'})
  } catch (e) {
    console.log(e, 'error')
  }
})

module.exports = router