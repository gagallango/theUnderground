require('dotenv').config()

// Database
require('./configs/mongoose.config')

// Debugger
require('./configs/debugger.config')

// App
const express = require('express')
const app = express()

// Configs
require('./configs/middleware.config')(app)
require('./configs/passport.config')(app)
require('./configs/preformatter.config')(app)
require('./configs/views.configs')(app)
require('./configs/locals.config')(app)
require('./configs/swagger.config')(app)

app.use('/api', require('./routes/api.routes'))

app.use((req, res) => {
    res.sendFile(__dirname + "/public/index.html");
})

module.exports = app