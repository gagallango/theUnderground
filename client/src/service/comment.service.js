import axios from 'axios'

export default class posts {
    constructor() {
        this.service = axios.create({ baseURL: process.env.REACT_APP_API_URL })
    }

    addComment = () => this.service.post('/comment/new')
}