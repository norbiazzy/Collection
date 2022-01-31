const jwt = require('jsonwebtoken')
const config = require('config')
const User = require('../models/User')
module.exports = async (req, res, next) => {
  if (req.method === 'OPTIONS') {
    return next()
  }

  try {
    const token = req.headers.authorization.split(' ')[1] // "Bearer TOKEN"
    if (!token) {
      return res.status(401).json({message: 'Нет авторизации'})
    }
    req.user = jwt.verify(token, config.get('jwtSecret'))
    let user = await User.findById(req.user.userId, {blocked:1})
    if (!user) return res.status(404).json({message: 'Потзователь больше не существует'})
    if (user.blocked) return res.status(403).json({message: 'Пользователь заблокирован'})
    req.user.token = token
    next()

  } catch (e) {
    res.status(401).json({message: 'Нет авторизации'})
  }
}
