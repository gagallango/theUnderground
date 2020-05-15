const mongoose = require('mongoose')
const User = require('../models/user.model')
const Post = require('../models/post.model')
const Comment = require('../models/comment.model')
const faker = require('faker')
const bcrypt = require('bcrypt')
const bcryptSalt = 10
const salt = bcrypt.genSaltSync(bcryptSalt)
require('dotenv').config()
mongoose.connect(`${process.env.DB}`, { useNewUrlParser: true, useUnifiedTopology: true })


const randomNum = (max) => Math.floor(Math.random() * (max - 1))

let allPost = []
let allU = []
let allRevs = []

const deleteUsers = User.deleteMany()
const deletePost = Post.deleteMany()
const deleteComment = Comment.deleteMany()

Promise.all([deleteUsers, deletePost, deleteComment])
    .then(() => {
        let users = []
        for (let i = 1; i <= 20; i++) {
            let user = {
                username: faker.name.findName(),
                email: faker.internet.email(),
                password: bcrypt.hashSync('123', salt),
                favoriteGenre: faker.random.arrayElement(["Narrative",
                    "NonFiction",
                    "Poetry"]),
                myReviews: [],
                profilePic: faker.internet.avatar(),
                userPosts: []
            }
            users.push(user)
        };
        return User.create(users)
    })
    .then(allUsers => {
        let promises = []
        allU = allUsers
        allUsers.forEach(user => {
            let posts = []
            for (let i = 1; i <= 5; i++) {
                posts.push({
                    title: faker.lorem.words(5),
                    content: faker.lorem.sentences(),
                    genre: faker.random.arrayElement(["Narrative",
                        "NonFiction",
                        "Poetry"]),
                    typology: faker.random.arrayElement(['Descriptive', 'Narrative', 'Expository', 'Argumentative', 'Literature']),
                    cover: faker.image.imageUrl(),
                    creatorID: user._id,
                })
            }
            promises.push(Post.create(posts)
                .then(createdPosts => {
                    allPost.push(...createdPosts)
                    return createdPosts
                })
                .catch(err => err))
        })
        return Promise.all(promises)
    })
    .then(() => {
        let promises = []
        allPost.forEach(post => {
            promises.push(User.findByIdAndUpdate(post.creatorID, { $push: { userPosts: post._id } }, { new: true }))
        })
        return Promise.all(promises)
    })
    .then(() => {
        let comments = []
        for (let i = 1; i <= 100; i++) {
            let comment = {
                creator: allU[randomNum(allU.length)],
                content: faker.lorem.sentences(),
                post: allPost[randomNum(allPost.length)],
                rating: randomNum(5),
            }
            comments.push(comment)
        };
        return Comment.create(comments)
    })
    .then(commentsCreated => {
        console.log(commentsCreated)
        commentsCreated.forEach((comment) => {
            const updateUser = User.findByIdAndUpdate(comment.creator, {
                $push: {
                    myReviews: comment._id
                },
            }, { new: true })
            const updatePost = Post.findByIdAndUpdate(comment.post, {
                $push: {
                    comments: comment._id
                }
            }, { new: true })
            return Promise.all([updateUser, updatePost])
        })
    })
    .then((finished) => console.log(finished))
    .catch(err => console.log(`Ha ocurrido un error: ${err}`))