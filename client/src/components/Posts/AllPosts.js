import React, { Component } from 'react'
import PostServices from '../../service/post.service'
import Container from 'react-bootstrap/Container'

class AllPosts extends Component {

    constructor() {
        super()
        this.state = {
            posts: []
        }
        this.service = new PostServices()
    }

    getAllPosts = () => {
        this.service.getPosts()
            .then(response => this.setState({ posts: response.data }))
            .catch(err => console.log(err))
    }

    componentDidMount = () => {
        this.getAllPosts()
    }

    render() {

        return (
            <Container>
                <h1>All posts from users</h1>
                <h3>Titles</h3>
                {this.state.posts.map(elm => <p key={elm._id}> {elm.title}</p>)}
            </Container>
        )
    }
}

export default AllPosts