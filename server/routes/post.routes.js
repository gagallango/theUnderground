const express = require('express')
const router = express.Router()

const Post = require('./../models/post.model')

//posts de un user
router.get('/allUserPosts/:id', (req, res, next) => {
    Post.find({ creatorID: req.params.id })
        .then(data => res.json(data))
        .catch(err => next(new Error(err)))
})
//todos los posts
router.get('/allPosts', (req, res, next) => {
    Post.find()
        .then(data => res.json(data))
        .catch(err => next(new Error(err)))
})
//nuevo post con su id
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
//edicion de post
router.get('/unpost/:id/edit', (req, res, next) => {

    Post.findById(req.params.id)
        .then(data => res.json('/edit', { data }))
        .catch(err => next(new Error(err)))
})

router.post('/unpost/:id/edit', (req, res, next) => {
    const { title, content, genre, tags, typology, cover } = req.body

    Post.findByIdAndUpdate(req.params.id, { title, content, genre, tags, typology, cover }, { new: true })
        .then(() => res.json(`/edit/${updatedCeleb.id}`))
        .catch(err => next(new Error(err)))
})
//eliminar post
router.post('/unpost/:id/delete', (req, res, next) => {
    Post.findByIdAndRemove(req.params.id)
        .then(() => res.json(data))
        .catch(err => next(new Error(err)))
})






module.exports = router

