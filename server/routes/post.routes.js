const express = require('express')
const router = express.Router()
const User = require('./../models/user.model')
const Post = require('./../models/post.model')



//posts de un user???? 
router.get('/allUserPosts/:id', (req, res, next) => {
    User.find(id)
        .populate('userPosts')
        .then(data => res.json(data))
        .catch(err => next(new Error(err)))
})


//todos los posts FUNCIONA
router.get('/allPosts', (req, res, next) => {
    Post.find()
        .then(data => res.json(data))
        .catch(err => next(new Error(err)))
})



router.get('/:id', (req, res, next) => {
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
router.get('/:id/edit', (req, res, next) => {

    Post.findById(req.params.id)
        .then(data => res.json(data))
        .catch(err => next(new Error(err)))
})

router.post('/:id/edit', (req, res, next) => {
    const { title, content, genre, tags, typology, cover } = req.body

    Post.findByIdAndUpdate(req.params.id, { title, content, genre, tags, typology, cover }, { new: true })
        .then(data => res.json(data))
        .catch(err => next(new Error(err)))
})
//eliminar post
router.post('/:id/delete', (req, res, next) => {
    Post.findByIdAndRemove(req.params.id)
        .then(data => res.json(data))
        .catch(err => next(new Error(err)))
})






module.exports = router

