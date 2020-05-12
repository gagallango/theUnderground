const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const cors = require('cors')

// CORS
const whitelist = [process.env.PORT]
const corsOptions = {
    origi: (origin, cb) => {
        const originIsWhiteListed = whitelist.includes(origin)
        cb(null, originIsWhiteListed)
    }
}

module.exports = app => {
    app.use(cors(corsOptions))
    app.use(logger('dev'))
    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({ extended: false }))
    app.use(cookieParser())
}