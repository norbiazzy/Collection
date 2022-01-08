const {Router} = require('express')
const router = Router()


// /api/collection/get
router.post('/create', async (req, res) => {
    try {
        const obj = req.body
        debugger
        console.log(1)
        return res.status(200).json({message: 'заебись...'})
    } catch (e) {
        console.log(e, 'error')
    }
})

module.exports = router