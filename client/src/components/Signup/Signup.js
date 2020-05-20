import React, { Component } from 'react'
import AuthService from './../../service/auth.service'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import { Link } from 'react-router-dom'
import './Signup.css'
import CoverService from '../../service/cover.service'

class Signup extends Component {

    constructor(props) {
        super(props)
        this.state = {
            loginInfo: {
                username: '',
                email: '',
                password: '',
                favoriteGenre: '',
                profilePic: ''
            },
            errorMessage: ''
        }
        this.authService = new AuthService()
        this.profilePicService = new CoverService()
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
    }

    handleFileUpload = e => {

        const uploadData = new FormData()
        uploadData.append('profilePic', e.target.files[0])
        this.profilePicService.handleUploadProfilePic(uploadData)
            .then(response => {
                console.log('El archivo ya se ha subido. La URL de cloudinary es: ', response.data.secure_url)
                let loginInfoCopy = { ...this.state.loginInfo }
                loginInfoCopy = { ...loginInfoCopy, profilePic: response.data.secure_url }
                console.log(loginInfoCopy)
                this.setState({
                    loginInfo: loginInfoCopy
                })
            })
            .catch(err => console.log(err))
    }


    render() {
        return (
            <>
                <Container className="signup">
                    <Row>
                        <Col className="join-the" md={6}>
                            <div className="title-form">
                                <h1>JOIN <br></br> THE <br></br>HOOD</h1>
                            </div>
                            <p style={{ fontSize: '20px', marginTop: '-30px' }}>Already have an account? <Link style={{ color: "#f9f9f9" }} to="/login">Login</Link></p>
                        </Col>
                        <Col className="sign-form" md={6}>
                            <Form onSubmit={this.handleSubmit} className="join-form">
                                <Form.Group controlId="name">
                                    <Form.Label className="inputname">Username</Form.Label>
                                    <Form.Control className="inputform" name="username" type="text" value={this.state.username} onChange={this.handleInputChange} />
                                </Form.Group>
                                <Form.Group controlId="email">
                                    <Form.Label className="inputname">Email</Form.Label>
                                    <Form.Control className="inputform" name="email" type="text" value={this.state.email} onChange={this.handleInputChange} />
                                </Form.Group>
                                <Form.Group controlId="pwd">
                                    <Form.Label className="inputname">Password</Form.Label>
                                    <Form.Control className="inputform" name="password" type="password" value={this.state.password} onChange={this.handleInputChange} />
                                </Form.Group>
                                <Form.Group controlId="favoriteGenre">
                                    <Form.Label className="inputname">Favorite genre</Form.Label>
                                    <Form.Group className="genres" name=" favoriteGenre" value={this.state.favoriteGenre} onChange={this.handleInputChange} >
                                        <Form.Control as="select" multiple name="favoriteGenre">
                                            <option>Narrative</option>
                                            <option>NonFiction</option>
                                            <option>Poetry</option>
                                        </Form.Control>
                                    </Form.Group>
                                </Form.Group>
                                <Form.Group controlId="cover">
                                    <Form.Label>Choose your profile pic</Form.Label>
                                    <Form.Control name="cover" type="file" onChange={this.handleFileUpload} />
                                </Form.Group>
                                <p
                                    className='error-message'
                                    style={{ display: this.state.errorMessage ? 'block' : 'none' }}
                                >{this.state.errorMessage}</p>
                                <Button className="boton" type="submit">Join</Button>

                            </Form>
                        </Col>
                    </Row>
                </Container>
            </>
        )
    }
}


export default Signup