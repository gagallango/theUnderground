const express = require('express')
const router = express.Router()
const Comment = require('../models/comment.model')
const User = require('./../models/user.model')
const Post = require('./../models/post.model')

//NUEVA REVIEW FUNCIONA
router.post('/new', (req, res, next) => {
    const { content, rating, user, post } = req.body
    const newComment = {
        content,
        rating,
        creator: user,
        post: post
    }
    let result
    Comment.create(newComment)
        .then(newReview => {
            result = newReview;
            let updateUser = User.findByIdAndUpdate(user, { $push: { myReviews: newReview._id } }, { new: true })
            let updatePost = Post.findByIdAndUpdate(post, { $push: { comments: newReview._id } }, { new: true })
            Promise.all([updateUser, updatePost])
        })
        .then(response => {
            res.json(result.populate('creator').execPopulate())
        })
        .catch(err => console.log(err))
})


router.get('/:id/delete', (req, res, next) => {
    Comment.findByIdAndRemove(req.params.id, { new: true })
        .then(data => res.json(data))
        .catch(err => console.log(err))
})

module.exports = router