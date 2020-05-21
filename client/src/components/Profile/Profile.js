import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PostService from '../../service/post.service'
import './Profile.css'

class Profile extends Component {

    constructor(props) {
        super(props)
        this.postService = new PostService()
        this.state = {
            user: props.loggedInUser,
            posts: [],
            likes: []
        }
    }

    displayPosts = () => {
        return this.state.posts.map((post, idx) => <Link to={`/post/detail/${post._id}`} className="link-posts" key={idx}><li>{post.title} <br></br> <p className="p-profile" style={{ color: '#706a94', fontSize: '10px' }}>{post.genre}</p></li></Link >)
    }

    displayLikedPosts = () => {
        return this.state.likes.map((fav, idx) => <Link to={`/post/detail/${fav._id}`} className="link-posts" key={idx}><li>{fav.title}</li></Link >)
    }

    componentDidMount = () => {
        this.postService.getAllUserPosts(this.state.user._id)
            .then(response => {
                this.setState({ posts: response.data.userPosts, likes: response.data.likedPosts })
            })
            .catch(err => console.log(err))
    }

    render() {
        if (this.state.user) {
            return (
                <>
                    <div className="row">
                        <div className="col-md-4">
                            <div className="title-profile">
                                <h4 style={{ fontSize: '35px' }}>Posts you've done<img style={{ width: '30px', marginLeft: '20px' }} src='/images/grey-pen.png' alt="LikeIcon" /></h4>
                            </div>
                            <div className="post-list">
                                <p>{this.displayPosts()}</p>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="title-profile">
                                <h4 style={{ fontSize: '35px' }}>Liked posts<img style={{ width: '25px', marginLeft: '20px' }} src='/images/grey-heart.png' alt="LikeIcon" /></h4>
                            </div>
                            <div className="post-list">
                                <p>{this.displayLikedPosts()}</p>
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