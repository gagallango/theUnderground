import React, { Component } from 'react'

import PostService from '../../../service/post.service'
import PostCard from '../PostCard/PostCard'

import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Form from 'react-bootstrap/Form'
import './AllUserPosts.css'

class AllUserPosts extends Component {

    constructor(props) {
        super(props)
        this.state = {
            posts: [],
            typeValue: ''
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

    handleFilterByGenre = e => {
        const value = e.currentTarget.value
        this.setState({ typeValue: value })

    }

    render() {
        return (
            <>
                <Container as="section">
                    <Row className="restaurants-filter">
                        <Col md={4}>
                            <Form>
                                <Form.Group controlId="exampleForm.SelectCustom">
                                    <Form.Label>Choose</Form.Label>
                                    <Form.Control onChange={this.handleFilterByGenre} as="select" style={{ width: '200px' }} custom>
                                        <option value="Narrative">Narrative</option>
                                        <option value="NonFiction">NonFiction</option>
                                        <option value="Poetry">Poetry</option>
                                    </Form.Control>
                                </Form.Group>
                            </Form>
                        </Col>
                    </Row>
                </Container>
                <div className="alluserposts">
                    <h1>All posts from users</h1>
                    {this.state.posts.map(post => <PostCard key={post._id} {...post} />)}
                </div>
            </>
        )
    }

}

export default AllUserPosts