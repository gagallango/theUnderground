import React, { Component } from 'react'
import PostService from '../../../service/post.service'
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { Redirect } from 'react-router-dom'

class NewPost extends Component {

    constructor() {
        super()
        this.state = {
            title: '',
            content: '',
            genre: 'Narrative',
            typology: 'Descriptive',
            cover: '',
            redirect: false
        }
        this.newPostService = new PostService()
    }

    handleInputChange = e => {
        const { name, value } = e.target
        this.setState({
            [name]: value
        })
    }

    handleSubmit = e => {
        e.preventDefault()
        const info = { ...this.state }
        info.user = this.props.user._id
        this.newPostService.createPost(info)
            .then(response => {
                if (response.data.create === true) {
                    this.setState({ redirect: true })
                }
            })
            .catch(err => console.log(err))
    }

    // finishAction = () => {
    //     this.props.hideModalWindow()
    // }

    render() {
        if (this.state.redirect) {
            return (<Redirect to="/profile" />)
        }
        return (
            <>
                <Container className="newpost">
                    <h1 className="title">Write your thougths</h1>
                    <Form onSubmit={this.handleSubmit}>
                        <Form.Group controlId="title">
                            <Form.Label>Title</Form.Label>
                            <Form.Control name="title" type="text" value={this.state.title} onChange={this.handleInputChange} />
                        </Form.Group>
                        <Form.Group controlId="content">
                            <Form.Label>Content</Form.Label>
                            <Form.Control name="content" type="text" value={this.state.content} onChange={this.handleInputChange} />
                        </Form.Group>
                        <Form.Group controlId="genre">
                            <Form.Label>genre</Form.Label>
                            <Form.Control as="select" name="genre" value={this.state.genre} onChange={this.handleInputChange}>
                                <option>Narrative</option>
                                <option>NonFiction</option>
                                <option>Poetry</option>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="">
                            <Form.Label>typology</Form.Label>
                            <Form.Control as="select" name="typology" value={this.state.typology} onChange={this.handleInputChange}>
                                <option>Descriptive</option>
                                <option>Narrative</option>
                                <option>Expository</option>
                                <option>Argumentative</option>
                                <option>Literature</option>
                            </Form.Control>
                        </Form.Group>
                        <Button variant="primary" type="submit" >Añadir</Button>
                    </Form>
                </Container>
            </>
        )
    }

}

export default NewPost