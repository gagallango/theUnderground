import React, { Component } from 'react'
import Container from 'react-bootstrap/Container'
import PostService from '../../service/post.service'
import UserPost from '../Profile/UserPost/UserPost'
import Navbar from './../ui/Navbar/Navbar'
import { Link } from 'react-router-dom'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import ReviewCard from './Review/Review'
import './Profile.css'

class Profile extends Component {

    constructor(props) {
        super(props)
        this.postService = new PostService()
        this.state = {
            user: props.loggedInUser
        }
    }

    displayPosts = () => {
        return this.state.user.userPosts.map((post, idx) => <Link to={`/post/${post._id}`} key={idx}><ul><li>{post.title}</li></ul></Link >)
        // return this.state.user.userPosts.map(post => <UserPost key={post.id}{...post} />)

    }

    // displayReviews = () => {
    //     return this.state.user.myReviews.splice(0, 3).map((review) => <ReviewCard key={review._id} {...review} />)
    // }


    render() {
        if (this.state.user) {
            const { username, favoriteGenre, profilePic } = this.state.user
            return (
                <>
                    <Container as="section" className="profile-section">
                        <Row>
                            {/* <Col md={2}>
                                <div><h3>{username}</h3>
                                    <div>
                                        <h3>Contact info:</h3>
                                        <img src={profilePic} alt="" />
                                        <p>Favorite genre: {favoriteGenre}</p>

                                    </div>
                                </div>
                            </Col> */}
                            <Col md={6}>
                                <div className="wrote-by-user">
                                    <h3>What I wrote:</h3>
                                    <p>{this.displayPosts()}</p>
                                </div>
                            </Col>
                            {/* <Col md={4}>
                                <div className="review-by-user">
                                    <h3>Reviews I've done:</h3>
                                    {this.displayReviews()}
                                </div>
                            </Col> */}
                        </Row>
                    </Container>
                </>
            )
        } else {
            return <p>Cargando...</p>
        }

    }
}

export default Profile