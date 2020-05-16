const express = require('express')
const router = express.Router()

router.use('/user', require('./auth.routes'))
router.use('/post', require('./post.routes'))
router.use('/review', require('./comment.routes'))

module.exports = router