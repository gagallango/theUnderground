import React, { Component } from 'react'
import Container from 'react-bootstrap/Container'
import PostService from '../../../service/post.service'
import Row from 'react-bootstrap/Row'

class AllUserPosts extends Component {

    constructor(props) {
        super(props)
        this.state = {
            posts: []
        }
        this.postService = new PostService()
    }

    displayAllPosts = () => {
        this.postService.getPosts()
            .then(response => this.setState({ posts: response.data }))
            .catch(err => console.log(err))
    }

    componentDidMount = () => {
        this.displayAllPosts()
    }

    render() {
        return (
            <>
                <Container>
                    <h1>All posts from users</h1>
                    <Row>
                        {this.state.posts.map((post, idx) =>
                            <div key={idx}>
                                <img src={post.cover} alt="" />
                                <h4>Title: {post.title}</h4>
                                <p>Content: {post.content}</p>
                                <p>Genre: {post.genre}</p>
                                <p>Typology: {post.typology}</p>
                                <p>Creator: {post.creatorID}</p>
                                <p>Comment: {post.comments}</p>
                            </div>
                        )}
                    </Row>
                </Container>
            </>
        )
    }

}

export default AllUserPosts