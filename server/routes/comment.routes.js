const express = require('express')
const router = express.Router()
const Comment = require('../models/comment.model')

//NUEVA REVIEW FUNCIONA
router.post('/new', (req, res, next) => {
    const { content, rating } = req.body
    Comment.create(req.body)
        .then(data => res.json(data))
        .catch(err => console.log(err))
})

router.get('/:id/delete', (req, res, next) => {
    Comment.findByIdAndRemove(req.params.id, { new: true })
        .then(data => res.json(data))
        .catch(err => console.log(err))
})

module.exports = router