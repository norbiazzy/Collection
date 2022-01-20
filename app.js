const express = require('express');
const config = require('config')
const mongoose = require('mongoose')

const app = express();
app.use(express.json({ extended: true }))
app.use('/api/profile', require('./routes/profile.routes'))
app.use('/api/auth', require('./routes/auth.routes'))
app.use('/api/collection', require('./routes/collection.routes'))
app.use('/api/home', require('./routes/home.routes'))

const PORT =  process.env.PORT || config.get('port') || 5000

async function start() {
    try {
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