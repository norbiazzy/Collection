const jwt = require('jsonwebtoken')
const config = require('config')
const User = require('../models/User')
module.exports = (req, res, next) => {
  if (req.method === 'OPTIONS') {
    return next()
  }

  try {
    const token = req.headers.authorization.split(' ')[1] // "Bearer TOKEN"
    if (!token) {
      return res.status(401).json({message: 'Нет авторизации'})
    }
    req.user = jwt.verify(token, config.get('jwtSecret'))
    let user = User.findById(req.user.userId)
    if (user.role !== 'admin') return res.status(404).json({message: 'У вас нет прав'})
    req.user.token = token
    next()
  } catch (e) {
    res.status(401).json({message: 'Пользователь не авторизирован'})
  }
}
