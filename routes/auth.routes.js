const {Router} = require('express')
const bcrypt = require('bcryptjs')
const config = require('config')
const Role = require('../models/Role')
const auth = require("../middleware/auth.middleware")
const User = require('../models/User')
const Profile = require('../models/Profile')
const Collections = require('../models/Collection')
const jwt = require('jsonwebtoken')
const {check, validationResult} = require("express-validator");
const {Types} = require("mongoose");
const router = Router()

// /api/auth/register
router.post('/register',
  [
    check('email').isEmail(),
    check('password').isLength({min: 1})
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(200).json({err: true, errorMessage: 'Ошибка при регистрации регистрации.'})
      }

      const {email, password, role} = req.body
      const candidate = await User.findOne({email})
      if (candidate) return res.status(400).json({err: true, errorMessage: 'Пользователь с таким email уже существует.'})
      const hashedPassword = await bcrypt.hash(password, 7)
      const userRole = await Role.findOne({value: role})
      const user = await new User({
        _id: new Types.ObjectId(),
        email, password: hashedPassword,
        role: userRole.value
      })
      const userProfile = await new Profile({userId: user._id})
      user.profile = userProfile._id
      // const userCollections = await new Collections({userId: user._id})
      await user.save(() => {
        // userCollections.save()
        userProfile.save()
      })
      const token = jwt.sign(
        {
          userId: user.id,
          email: user.email,
          role: user.role,
          blocked: user.blocked,
        },
        config.get('jwtSecret'),
        {expiresIn: '360d'}
      )

      res.status(201).json({
        token, email: user.email,
        userId: user.id, role: user.role, blocked: user.blocked
      })

    } catch (e) {
      console.log(e, 'error')
    }
  })

// /api/auth/login
router.post('/login',
  [
    check('email').isEmail(),
    check('password').exists()
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) return res.status(200).json({message: 'Ошибка при входе'})
      const {email, password} = req.body
      const user = await User.findOne({email})

      if (!user) return res.status(400).json({message: 'Пользователь не существует'})
      const isMatch = await bcrypt.compare(password, user.password)

      if (!isMatch) return res.status(400).json({message: 'Пароль не верен'})
      const token = jwt.sign(
        {
          userId: user.id,
          email: user.email,
          role: user.role,
          blocked: user.blocked,
        },
        config.get('jwtSecret'),
        {expiresIn: '360d'}
      )

      res.status(200).json({
        token, email: user.email,
        userId: user.id, role: user.role, blocked: user.blocked
      })
    } catch (e) {
      console.log(e)
    }
  }
)


// /api/auth/verify
router.get('/verify', auth, async (req, res) => {
  try {
    console.log(1)
    res.status(200).json(req.user)
  } catch (e) {
    console.log(2)
    res.status(401).json({message: 'is not auth'})
  }
})

module.exports = router