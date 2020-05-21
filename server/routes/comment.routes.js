const express = require('express')
const router = express.Router()
const Comment = require('../models/comment.model')
const User = require('./../models/user.model')
const Post = require('./../models/post.model')
const ensureLogin = require('connect-ensure-login')

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


router.get('/deleteComment/:id', (req, res, next) => {
    console.log("ola estoy en deleteComment")
    Comment.findById(req.params.id)
        .then((comment) => {
            return User.findByIdAndUpdate(comment.creator, { $pull: { myReviews: comment._id } }, { new: true })
        })
        .then(comment => Post.findByIdAndUpdate(comment.post, { $pull: { comments: comment._id } }, { new: true }))
        .then(postUpdated => {
            return Comment.findByIdAndRemove(req.params.id)
        })
        .then(data => res.json(data))
        .catch(err => next(new Error(err)))
})
module.exports = router