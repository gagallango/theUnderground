import axios from 'axios'

export default class posts {
    constructor() {
        this.service = axios.create({ baseURL: 'http://localhost:5000/api' })
    }

    getPosts = () => this.service.get('/post/allPosts')
    getUserPost = ({ id }) => this.service.get(`/post/allUserPosts/${id}`)
}