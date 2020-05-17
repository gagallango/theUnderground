import React, { Component } from 'react'
import Container from 'react-bootstrap/Container'
import PostService from '../../service/post.service'

import { Link } from 'react-router-dom'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import './Profile.css'

class Profile extends Component {

    constructor(props) {
        super(props)
        this.postService = new PostService()
        this.state = {
            user: props.loggedInUser,
            posts: []
        }
    }

    displayPosts = () => {
        return this.state.posts.map((post, idx) => <Link to={`/post/detail/${post._id}`} key={idx}><li>{post.title}</li></Link >)
        // return this.state.user.userPosts.map(post => <UserPost key={post.id}{...post} />)

    }

    // displayReviews = () => {
    //     return this.state.user.myReviews.splice(0, 3).map((review) => <ReviewCard key={review._id} {...review} />)
    // }

    componentDidMount = () => {
        this.postService.getAllUserPosts(this.state.user._id)
            .then(response => {
                this.setState({ posts: response.data.posts })
            })
            .catch(err => console.log(err))
    }


    render() {
        console.log(this.state.user.userPosts.length)
        if (this.state.user) {
            const { username, favoriteGenre, profilePic } = this.state.user
            return (
                <>
                    <div className="main-profile">
                        <h4>Posts you've done</h4>
                        <div className="post-list">
                            <p>{this.displayPosts()}</p>
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