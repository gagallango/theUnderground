import React, { Component } from 'react'
import Container from 'react-bootstrap/Container'
import PostService from '../../../service/post.service'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'

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
                <Row>
                    <Col md={4}>
                        <img className="post-cover" src={this.state.cover} alt="" />
                        <p>Genre: {this.state.genre}</p>
                        <p>Typology: {this.state.typology}</p>
                    </Col>
                    <Col md={8}>
                        <h1>{this.state.title}</h1>
                        <p>{this.state.content}</p>
                    </Col>
                </Row>
            </Container>
        )
    }
}


export default UserPost

