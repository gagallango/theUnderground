import axios from 'axios'

export default class posts {
    constructor() {
        this.service = axios.create({ baseURL: process.env.REACT_APP_API_URL })
    }

    getPosts = () => this.service.get('/post/allPosts')
    getUserPost = id => this.service.get(`/post/detail/${id}`)
    getAllUserPosts = id => this.service.get(`/post/allUserPosts/${id}`)
    createPost = post => this.service.post('/post/newPost', post)
    deletePost = id => this.service.get(`/post/deletePost/${id}`)
}