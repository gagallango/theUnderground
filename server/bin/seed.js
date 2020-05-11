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

const users = [
    {
        username: 'Gabriela',
        email: 'ga.gallango@gmail.com',
        password: bcrypt.hashSync('gaby', salt),
        favoriteGenre: 'Narrative',
        profilePic: '',
        verificationToken: '',
        recuperationToken: ''
    },
    {
        username: 'juan',
        email: 'juan@gmail.com',
        password: bcrypt.hashSync('juan', salt),
        favoriteGenre: 'NonFiction',
        profilePic: '',
        verificationToken: '',
        recuperationToken: ''
    },
    {
        username: 'Paco',
        email: 'paco@paco.com',
        password: bcrypt.hashSync('paco', salt),
        favoriteGenre: 'Poetry',
        profilePic: '',
        verificationToken: '',
        recuperationToken: ''
    }]

const randomNum = (max) => Math.floor(Math.random() * (max - 1))

let allPost = []
let allU = []
let allRevs = []

const deleteUsers = User.deleteMany()
const deletePost = Post.deleteMany()
const deleteComment = Comment.deleteMany()

Promise.all([deleteUsers, deletePost, deleteComment])
    .then(() => {

        User.create(users)
            .then(allUsers => {
                allU = allUsers
                allUsers.forEach(user => {
                    let posts = []
                    for (let i = 1; i <= 5; i++) {
                        posts.push({
                            title: faker.lorem.word(5),
                            content: faker.lorem.word(70),
                            genre: faker.random.arrayElement(["Narrative",
                                "NonFiction",
                                "Poetry"]),
                            typology: faker.random.arrayElement(['Descriptive', 'Narrative', 'Expository', 'Argumentative', 'Literature']),
                            cover: faker.image.imageUrl(),
                            creatorID: user._id,
                        })
                    }
                    Post.create(posts)
                        .then(createdPosts => {
                            allPost = createdPosts
                            createdPosts.forEach(post => {
                                User.findByIdAndUpdate(post.creatorID, { $push: { userPosts: post._id } }, { new: true })
                                    .then(() => console.log("YEAH BITCH! :)"))

                                    .catch(err => console.log(err))
                            })
                        })
                        .then(() => console.log("succesfullyCreated!"))
                        .catch((err) => console.log(err))
                })
            })

            .then(() => {

                console.log("FINISHHH!!!! : AQUI VA LA LOGICA AHORA DE LOS COMMENTS :)")

            })
            .catch(err => console.log(`Ha ocurrido un error: ${err}`))
    })
    .catch(err => console.log(`Ha ocurrido un error: ${err}`))
