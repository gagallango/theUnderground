const express = require('express')
const router = express.Router()

router.use('/user', require('./auth.routes'))
router.use('/post', require('./post.routes'))
router.use('/comment', require('./comment.routes'))
router.use('/files', require('./cover.routes'))

module.exports = router