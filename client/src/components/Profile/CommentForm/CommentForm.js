import React, { Component } from 'react'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import CommentService from '../../../service/comment.service'

class CommentForm extends Component {
    constructor() {
        super()
        this.state = {
            content: '',
            rating: '',
        }
        this.commentService = new CommentService()
    }

    handleInputChange = e => {
        const { name, value } = e.target

        this.setState({
            [name]: value
        })
    }

    handleSubmit = e => {
        e.preventDefault()
        this.commentService.addComment(this.state)
            .then(() => this.finishAction())
            .catch(err => console.log(err))
    }

    render() {
        return (
            <>
                <Col md={{ span: 8, offset: 1 }}>
                    <Form className="comment-form" onSubmit={this.handleSubmit}>
                        <Form.Group controlId="exampleForm.ControlTextarea1">
                            <Form.Control placeholder="Write your comment" as="textarea" rows="3" name="content" value={this.state.content} onChange={this.handleInputChange} />
                        </Form.Group>
                        <Form.Group controlId="exampleForm.ControlSelect1">
                            <Form.Label>Rate the post</Form.Label>
                            <Form.Control as="select" name="rating" value={this.state.rating} onChange={this.handleInputChange}>
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                            </Form.Control>
                        </Form.Group>
                        <Button variant="info" type="submit">Add comment</Button>
                    </Form>
                </Col>
            </>
        )
    }


}

export default CommentForm