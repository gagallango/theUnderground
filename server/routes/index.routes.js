const express = require('express')
const router = express.Router()

router.use('/user', require('./auth.routes'))
router.use('/post', require('./post.routes'))



module.exports = router