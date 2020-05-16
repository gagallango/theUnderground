const express = require('express')
const router = express.Router()
const User = require('./../models/user.model')
const Post = require('./../models/post.model')
const Comment = require('./../models/comment.model')


//NUEVA REVIEW FUNCIONA
router.post('/newReview', (req, res, next) => {
    const { content, rating, creator, post } = req.body
    console.log(req.body)
    Comment.create(req.body)
        .then(data => res.json(data))
        .catch(err => console.log(err))
})

//NUEVO POST FUNCIONA
router.post('/newPost', (req, res, next) => {
    const { title, content, genre, tags, typology, cover } = req.body
    Post.create(req.body)
        .then(data => res.json(data))
        .catch(err => next(new Error(err)))
})

//POSTS DE UN USER FUNCIONA
router.get('/allUserPosts/:id', (req, res, next) => {
    User.find(id)
        .populate('userPosts')
        .then(data => res.json(data))
        .catch(err => next(new Error(err)))
})

//POSTS DE TODOS LOS USUARIOS FUNCIONA
router.get('/allPosts', (req, res, next) => {
    Post.find()
        .then(data => res.json(data))
        .catch(err => next(new Error(err)))
})

//UN POST FUNCIONA
router.get('/detail/:id', (req, res, next) => {
    Post.findById(req.params.id)
        .then(data => res.json(data))
        .catch(err => next(new Error(err)))
})


//EDIT POST
router.post('/editPost/:id', (req, res, next) => {
    const { title, content, genre, tags, typology, cover } = req.body
    Post.findByIdAndUpdate(req.params.id, { title, content, genre, tags, typology, cover }, { new: true })
        .then(data => res.json(data))
        .catch(err => next(new Error(err)))
})

//DELETE POST FUNCIONA
router.get('/deletePost/:id', (req, res, next) => {
    Post.findByIdAndRemove(req.params.id)
        .then(data => res.json(data))
        .catch(err => next(new Error(err)))
})

router.get('/deleteReview/:id', (req, res, next) => {
    Comment.findByIdAndRemove(req.params.id, { new: true })
        .then(data => res.json(data))
        .catch(err => console.log(err))
})


module.exports = router

