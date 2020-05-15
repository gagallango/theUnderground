import axios from 'axios'

export default class services {
    constructor() {
        this.service = axios.create({
            baseURL: process.env.REACT_APP_API_URL,
            withCredentials: true
        })
    }

    signup = ({ username, email, password, favoriteGenre }) => this.service.post('/user/signup', { username, email, password, favoriteGenre })
    login = ({ username, password }) => this.service.post('/user/login', { username, password })
    logout = () => this.service.post('/user/logout')
    isLoggedIn = () => this.service.get('/user/loggedin')
    userProfile = ({ id }) => this.service.get(`/user/${id}`)
}