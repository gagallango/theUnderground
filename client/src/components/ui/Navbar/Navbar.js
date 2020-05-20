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
            <div className="main-nav">
                <nav className="nav-items">
                    <ul>

                        {
                            !this.props.loggedInUser ?
                                <>
                                    <Link to="/login">Login</Link>
                                    <Link to="/signup">Sign up</Link>
                                </>

                                :
                                <>

                                    <img style={{ width: '100px', borderRadius: '50px' }} src={this.props.loggedInUser.profilePic} alt="" />
                                    <p className="hi-username">Hi, {this.props.loggedInUser.username}</p>
                                    <br />
                                    <Link className="a-main" to="/explore">Explore</Link>
                                    <Link className="a-main" to="/profile">Profile</Link>
                                    <Link className="a-main" to="/post/new">New Post</Link>
                                    <Link style={{ fontSize: '15px' }} to="/" as="div" onClick={this.logout}>Logout</Link>

                                </>
                        }

                    </ul>
                </nav>
            </div>
        )
    }

}

export default Navigation
