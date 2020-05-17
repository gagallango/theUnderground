import React, { Component } from 'react'
import Container from 'react-bootstrap/Container'
import PostService from '../../../service/post.service'
import Row from 'react-bootstrap/Row'
import Button from 'react-bootstrap/Button'
import PostCard from '../PostCard/PostCard'

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
                <div className="alluserposts">
                    <h1>All posts from users</h1>
                    {this.props.loggedInUser && <Button onClick={() => this.handleModal(true)} variant="dark" style={{ marginBottom: '20px' }}>Crear nueva montaña rusa</Button>}
                    <Row>
                        {this.state.posts.map(post => <PostCard key={post._id} {...post} />)}
                    </Row>
                </div>
            </>
        )
    }

}

export default AllUserPosts