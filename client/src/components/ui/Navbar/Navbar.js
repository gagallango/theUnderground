import React, { Component } from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'


import AuthService from './../../../service/auth.service'

import { Link } from 'react-router-dom'

class Navigation extends Component {
    constructor(props) {
        super(props)
        this.authService = new AuthService()
    }

    logout = () => {
        this.props.setTheUser(false)
        this.authService.logout()
    }

    render() {
        return (
            <Navbar bg="dark" variant="dark" expand="md">
                <Navbar.Brand as="div"><Link to="/">THE UNDER FUCKING GROUND</Link></Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav>
                        <Nav.Link as="div"><Link to="/">Home</Link></Nav.Link>
                        <Nav.Link as="div"><Link to="/allPosts">Posts</Link></Nav.Link>

                        {
                            !this.props.loggedInUser ?
                                <>
                                    <Nav.Link as="div"><Link to="/login">Login</Link></Nav.Link>
                                    <Nav.Link as="div"><Link to="/signup">Sign up</Link></Nav.Link>
                                </>

                                :
                                <>
                                    <Nav.Link as="div"><Link to="/profile">Profile</Link></Nav.Link>
                                    <Nav.Link as="div" onClick={this.logout}>Logout</Nav.Link>
                                </>

                        }

                    </Nav>
                    <Navbar.Text className="ml-auto"> Hi, {this.props.loggedInUser ? this.props.loggedInUser.username : 'person'}</Navbar.Text>
                </Navbar.Collapse>
            </Navbar>
        )
    }

}

export default Navigation
