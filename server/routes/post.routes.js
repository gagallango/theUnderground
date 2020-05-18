const express = require('express')
const router = express.Router()
const User = require('./../models/user.model')
const Post = require('./../models/post.model')


//NUEVO POST FUNCIONA
router.post('/newPost', (req, res, next) => {
    const { title, content, genre, typology, cover, user } = req.body
    const postInfo = {
        title,
        content,
        genre,
        typology,
        cover,
        creatorID: user
    }
    Post.create(postInfo)
        .then(newPost => {
            User.findByIdAndUpdate(user, { $push: { userPosts: newPost._id } }, { new: true })
                .then(() => res.json({ create: true }))
                .catch(err => next(new Error(err)))
        })
        .catch(err => next(new Error(err)))
})

//POSTS DE UN USER FUNCIONA
router.get('/allUserPosts/:id', (req, res, next) => {
    User.findById(req.params.id)
        .populate('userPosts')
        .then(data => {
            const posts = data.userPosts
            res.json({ posts })
        })
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
        .populate('creatorID')
        .populate([{
            path: 'comments',
            model: 'Comment',
            populate: {
                path: 'creator',
                model: 'User'
            }
        }])
        .then(data => res.json(data))
        .catch(err => next(new Error(err)))
})

//EDIT POST
router.post('/editPost/:id', (req, res, next) => {
    Post.findByIdAndUpdate(req.params.id, req.body)
        .then(data => res.json(data))
        .catch(err => next(new Error(err)))
})

// DELETE POST FUNCIONA
router.get('/deletePost/:id', (req, res, next) => {
    Post.findByIdAndRemove(req.params.id)
        .then(data => res.json(data))
        .catch(err => next(new Error(err)))
})


module.exports = router

