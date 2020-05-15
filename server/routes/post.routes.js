const express = require('express')
const router = express.Router()
const User = require('./../models/user.model')
const Post = require('./../models/post.model')

const checkLoggedIn = (req, res, next) => req.isAuthenticated() ? next() : res.json('/')



//posts de un user???? 
router.get('/allUserPosts/:id', checkLoggedIn, (req, res, next) => {
    User.find(id)
        .populate('userPosts')
        .then(data => res.json(data))
        .catch(err => next(new Error(err)))
})


//todos los posts FUNCIONA
router.get('/allPosts', checkLoggedIn, (req, res, next) => {
    Post.find()
        .then(data => res.json(data))
        .catch(err => next(new Error(err)))
})



router.get('/:id', checkLoggedIn, (req, res, next) => {
    Post.findById(req.params.id)
        .then(data => res.json(data))
        .catch(err => next(new Error(err)))
})

router.post('/:id', (req, res, next) => {
    const { title, content, genre, tags, typology, cover } = req.body
    Post.create({ title, content, genre, tags, typology, cover })
        .then(data => res.json(data))
        .catch(err => next(new Error(err)))
})


//edicion de post FUNCIONA EL GETTTT
router.get('/:id/edit', checkLoggedIn, (req, res, next) => {

    Post.findById(req.params.id)
        .then(data => res.json(data))
        .catch(err => next(new Error(err)))
})

router.post('/:id/edit', checkLoggedIn, (req, res, next) => {
    const { title, content, genre, tags, typology, cover } = req.body

    Post.findByIdAndUpdate(req.params.id, { title, content, genre, tags, typology, cover }, { new: true })
        .then(data => res.json(data))
        .catch(err => next(new Error(err)))
})
//eliminar post
router.post('/:id/delete', checkLoggedIn, (req, res, next) => {
    Post.findByIdAndRemove(req.params.id)
        .then(data => res.json(data))
        .catch(err => next(new Error(err)))
})






module.exports = router

