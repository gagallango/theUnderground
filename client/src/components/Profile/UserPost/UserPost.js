import React, { Component } from 'react'
import Container from 'react-bootstrap/Container'
import PostService from '../../../service/post.service'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import { Link } from 'react-router-dom'

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
            <Container as="section" className="post-details">
                <h1>{this.state.title}</h1>
                <Row>
                    <Col md={{ span: 4, offset: 1 }}>
                        <p>{this.state.content}</p>
                        <ul>
                            <li>Genre: {this.state.genre}</li>
                            <li>Typology: {this.state.typology}</li>
                        </ul>
                    </Col>
                    <Col md={6}>
                        <img style={{ width: '200px' }} src={this.state.cover} alt={this.state.title} />
                    </Col>
                </Row>
                <Link to="/explore" className="btn btn-dark">Go back</Link>
            </Container>

        )
    }
}


export default UserPost

