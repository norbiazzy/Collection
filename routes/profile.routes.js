const {Router} = require('express')
const Profile = require("../models/Profile");
const router = Router()


// /api/profile/get
router.post('/getUser', async (req, res) => {
    try {
        const {userId} = req.body
        const profile = await Profile.findOne({userId})
        if (profile) return res.status(201).json(profile)

        return res.status(202).json({message: 'нету профиля...'})
    } catch (e) {
        console.log(e, 'error')
    }
})

module.exports = router