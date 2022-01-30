const {Router} = require('express')
const Profile = require("../models/Profile");
const Comment = require("../models/Comment");
const Item = require("../models/Item");
const User = require("../models/User");
const Collection = require("../models/Collection");
const auth = require("../middleware/auth.middleware")
const router = Router()


// /api/profile/get
router.get('/getUser', auth, async (req, res) => {
  try {
    const userId = req.user.userId
    const profile = await Profile.findOne({userId})
    const collections = await Collection.find({userId})
    const user = await User.findById(userId, {blocked: 1, role: 1})
    if (user && profile) return res.status(200).json({profile, user, collections})
    return res.status(202).json({message: 'нету профиля...'})
  } catch (e) {
    console.log(e, 'error')
  }
})
// /api/profile/get
router.get('/getUser/:id', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({userId: req.params.id})
    const collections = await Collection.find({userId: req.params.id})
    if (!profile) return res.status(200).json({profile, collections})
    return res.status(404).json({message: 'нету профиля...'})
  } catch (e) {
    return res.status(404).json({message: 'нету профиля...'})
  }
})
// /api/profile/update
router.post('/update', auth, async (req, res) => {
  try {
    let body = req.body
    await Profile.updateOne({userId: body.userId}, body)

    return res.status(200).json({message: 'Профиль обновлен успешно!'})
  } catch (e) {
    return res.status(404).json({message: 'Не удалось удалить пользователя'})
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
router.delete('/blockUser/:id', auth, async (req, res) => {
  try {
    const blockUserId = req.params.id
    if (req.user.role !== 'admin') if (req.user.userId !== blockUserId) return res.status(403).json({message: 'У вас нет прав!'})
    await User.findByIdAndUpdate(blockUserId, {blocked: true})
    return res.status(200).json({message: 'Block...'})
  } catch (e) {
    console.log(e, 'error')
    return res.status(409).json(e)
  }
})
router.delete('/unblockUser/:id', auth, async (req, res) => {
  try {
    const blockUserId = req.params.id
    if (req.user.role === 'admin') return res.status(403).json({message: 'У вас нет прав!'})
    await User.findByIdAndUpdate(blockUserId, {blocked: false})
    return res.status(200).json({message: 'Unblock...'})
  } catch (e) {
    console.log(e, 'error')
    return res.status(409).json(e)
  }
})

module.exports = router