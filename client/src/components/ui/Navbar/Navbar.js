import React, { Component } from 'react'
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
                                    <p className="hi-username">Hi, {this.props.loggedInUser.username}</p>
                                    <Link className="a-main" to="/explore">Explore</Link>
                                    <Link className="a-main" to="/profile">Profile</Link>
                                    <Link className="a-main" to="/post/new">New Post</Link>
                                    <Link className="logout" to="/" as="div" onClick={this.logout}>Logout</Link>

                                </>

                        }

                    </ul>
                </nav>
            </div>
        )
    }

}

export default Navigation
