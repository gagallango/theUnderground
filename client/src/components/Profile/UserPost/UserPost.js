import React, { Component } from 'react'
import Container from 'react-bootstrap/Container'
import PostService from '../../../service/post.service'

class UserPost extends Component {
    constructor(props) {
        super(props)
        this.state = {}
        this.postService = new PostService()
    }

    displayThePost = () => {
        const id = this.props.match.params.id
        this.postService.getUserPost(id)
            .then(response => this.setState(response.data))
            .catch(err => console.log(err))
    }


    componentDidMount = () => {
        this.displayThePost()
    }

    render() {
        return (
            <Container>
                <h1>Title: {this.state.title}</h1>
                <img src={this.state.cover} alt="" />
                <p>Genre: {this.state.genre}</p>
                <p>Typology: {this.state.typology}</p>
                <p>Content: {this.state.content}</p>
            </Container>
        )
    }
}


export default UserPost

