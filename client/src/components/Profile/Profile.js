import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Button from 'react-bootstrap/Button'


import PostService from '../../service/post.service'

import './Profile.css'

class Profile extends Component {

    constructor(props) {
        super(props)
        this.postService = new PostService()
        this.state = {
            user: props.loggedInUser,
            posts: [],
        }
    }

    displayPosts = () => {
        return this.state.posts.map((post, idx) => <Link to={`/post/detail/${post._id}`} className="link-posts" key={idx}><li>{post.title} </li></Link >)
    }

    displayLikedPosts = () => {
        return this.props.loggedInUser.likedPosts.map((fav, idx) => <Link to={`/post/detail/${fav._id}`} className="link-posts" key={idx}><li>{fav.title}</li></Link >)
    }

    componentDidMount = () => {
        this.postService.getAllUserPosts(this.state.user._id)
            .then(response => {
                this.setState({ posts: response.data.posts })
            })
            .catch(err => console.log(err))
    }



    render() {
        console.log(this.state.posts)
        if (this.state.user) {
            return (
                <>
                    <div className="container">
                        <div className="row">
                            <div className="col-md-4">
                                <div className="title-profile">
                                    <h4>Posts you've done</h4>
                                </div>

                                <div className="post-list">
                                    <p>{this.displayPosts()}</p>
                                </div>

                            </div>
                            <div className="col-md-4">
                                <div className="title-profile">
                                    <h4>Liked posts</h4>
                                </div>
                                <div className="post-list">
                                    <p>{this.displayLikedPosts()}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )
        } else {
            return <p>Charging...</p>
        }

    }
}

export default Profile