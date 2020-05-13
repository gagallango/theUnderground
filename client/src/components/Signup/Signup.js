import React, { Component } from 'react'
import AuthService from './../../service/auth.service'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'


import { Link } from 'react-router-dom'

class Signup extends Component {

    constructor(props) {
        super(props)
        this.state = {
            loginInfo: {
                username: '',
                email: '',
                password: '',
                favoriteGenre: '',
                profilePic: '',
            },
            errorMessage: ''
        }
        this.authService = new AuthService()
    }


    handleInputChange = e => {

        let loginInfoCopy = { ...this.state.loginInfo }
        const { name, value } = e.target
        loginInfoCopy = { ...loginInfoCopy, [name]: value }

        this.setState({ loginInfo: loginInfoCopy })
    }

    handleSubmit = e => {
        e.preventDefault()
        this.authService.signup(this.state.loginInfo)
            .then(response => {
                this.props.setTheUser(response.data)
                this.props.history.push('/profile')
            })
            .catch(err => console.log(err))
        // .catch(err => {
        //     err.response.status === 400 && this.setState({ errorMessage: err.response.data.message })
        // })
    }




    render() {

        return (
            <>
                <Container>

                    <Row>
                        <Col md={{ span: 4, offset: 4 }}>

                            <h3>Join</h3>
                            <hr></hr>
                            <Form onSubmit={this.handleSubmit}>

                                <Form.Group controlId="name">
                                    <Form.Label>Username</Form.Label>
                                    <Form.Control name="username" type="text" value={this.state.username} onChange={this.handleInputChange} />
                                </Form.Group>

                                <Form.Group controlId="email">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control name="email" type="text" value={this.state.email} onChange={this.handleInputChange} />
                                </Form.Group>

                                <Form.Group controlId="pwd">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control name="password" type="password" value={this.state.password} onChange={this.handleInputChange} />
                                </Form.Group>

                                <Form.Group controlId="favoriteGenre">
                                    <Form.Label>Favorite genre</Form.Label>
                                    <Form.Group controlId="exampleForm.ControlSelect2">
                                        <Form.Control as="select" multiple>
                                            <option>Narrative</option>
                                            <option>NonFiction</option>
                                            <option>Poetry</option>
                                        </Form.Control>
                                    </Form.Group>
                                    {/* <Form.Control name="favoriteGenre" type="text" value={this.state.favoriteGenre} onChange={this.handleInputChange} /> */}
                                </Form.Group>

                                <p
                                    className='error-message'
                                    style={{ display: this.state.errorMessage ? 'block' : 'none' }}
                                >{this.state.errorMessage}</p>

                                <Button variant="dark" type="submit">Join</Button>
                            </Form>

                            <p><small>Already have an account? <Link to="/login">Login</Link></small></p>

                        </Col>
                    </Row>

                </Container>
            </>
        )
    }
}


export default Signup