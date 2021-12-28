const express = require('express')
const config = require('config')
const Role = require('./models/Role')
const User = require('./models/User')
const mongoose = require('mongoose')

const app = express()
const PORT = config.get('port') || 5000

app.use('/api/auth', require('./routes/auth.routes'))
console.log(123)
async function start() {
  try {
    const userRole = new Role()
    const adminRole = new Role({value: 'admin'})
    // userRole.save()
    adminRole.save()
    await mongoose.connect(config.get('mongoUri'), {
      useNewUrlParser: true
    })
    app.listen(PORT, () => {
      console.log(`app has been started on port ${PORT}...`)
    })
  } catch (e) {
    console.log(e)
  }
}

start()