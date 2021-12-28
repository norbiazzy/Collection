const express = require('express')
const config = require('config')
const mongoose = require('mongoose')

const app = express()
const PORT = config.get('port') || 5000

app.use('/api/auth', require('./routes/auth.routes'))

async function start(){
  try {
    await mongoose.connect(config.get('mongoUri'), {
      useNewUrlParser: true,
       useUndefinedTopology: true,
      useCreateIndex: true
    })
  
    app.listen(5000, ()=>{
      console.log(`app has been started on port ${PORT}...`)
    })
  } catch (e) {
    console.log(e)
  }
}