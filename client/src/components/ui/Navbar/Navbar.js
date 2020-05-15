import React, { Component } from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import './navbar.css'

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
            <div class="main-nav">
                <nav class="nav-items">
                    <ul>

                        {
                            !this.props.loggedInUser ?
                                <>
                                    <Link to="/login">Login</Link>
                                    <Link to="/signup">Sign up</Link>
                                </>

                                :
                                <>
                                    <Link to="/main">Home</Link>
                                    <Link to="/explore">Explore</Link>
                                    <Link to="/profile">Profile</Link>
                                    <Link to="/" as="div" onClick={this.logout}>Logout</Link>
                                </>

                        }

                    </ul>
                </nav>
            </div>
        )
    }

}

export default Navigation
