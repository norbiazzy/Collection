const {Router} = require('express')
const bcrypt = require('bcryptjs')
const User = require('../models/User')
const config = require('config')
const jwt = require('jsonwebtoken')
const {check, validationResult} = require("express-validator");
const router = Router()

// /api/auth/register
router.post('/register',
  [
    check('email').isEmail(),
    check('password')
      .isLength({min: 1})
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) return res.status(200).json({message: 'Ошибка при регистрации'})
      const {email, password} = req.body
      
      const candidate = await User.findeOne({email})
      
      if (candidate) return res.status(400).json({message: 'Уже есть такой'})
      
      const hashedPassword = bcrypt.hash(password, 7)
      const user = {
        email, hashedPassword
      }
      await user.save()
      
      res.status(201).json({message: 'Успешно создан'})
      
    } catch (e) {
      console.log(e)
    }
  })

// /api/auth/register
router.post('/login',
  [
    check('email').normalizeEmail().isEmail(),
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
        { userId: user.id},
        config.get('jwtSecret'),
        {expiresIn: '360d'}
      )
      res.json({token, userId: user.id})
    } catch (e) {
      console.log(e)
    }
  })

module.exports = router