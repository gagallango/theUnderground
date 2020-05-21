import React, { Component } from 'react'
import AuthService from '../../service/auth.service'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import './Login.css'
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'

class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loginInfo: {
                username: '',
                password: ''
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
        this.authService.login(this.state.loginInfo)
            .then(response => {
                this.props.setTheUser(response.data)
                this.props.history.push('/profile')
            })
            .catch(err => console.log(err))

    }
    render() {
        return (
            <>
                <Container className="joinform-dos">
                    <Row>
                        <Col className="sign-form" md={6}>
                            <Form onSubmit={this.handleSubmit}>
                                <Form.Group controlId="name">
                                    <Form.Label className="inputname">Username</Form.Label>
                                    <Form.Control className="inputform" name="username" type="text" value={this.state.username} onChange={this.handleInputChange} />
                                </Form.Group>
                                <Form.Group controlId="pwd">
                                    <Form.Label className="inputname">Password</Form.Label>
                                    <Form.Control className="inputform" name="password" type="password" value={this.state.password} onChange={this.handleInputChange} />
                                </Form.Group>
                                <p
                                    className='error-message'
                                    style={{ display: this.state.errorMessage ? 'block' : 'none' }}
                                >{this.state.errorMessage}</p>
                                <Button className="boton" type="submit">Login</Button>

                            </Form>
                        </Col>
                        <Col className="join-the" md={6}>
                            <h1 >LOGIN</h1>
                            <p style={{ fontSize: '20px', marginTop: '-30px' }}>WE KNOW YOU'RE SUCH A GOOD WRITER</p>
                        </Col>
                    </Row>
                </Container>
            </>
        )
    }
}
export default Login