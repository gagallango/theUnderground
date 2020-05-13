import React, { Component } from 'react'
import AuthService from '../../service/auth.service'
import Container from 'react-bootstrap/Container'
import PostService from '../../service/post.service'

// import { Link } from 'react-router-dom'

class Profile extends Component {

    constructor(props) {
        super(props)
        this.postService = new PostService()
        this.state = {
            user: props.loggedInUser
        }
    }
    // getAllPosts = () => {
    //     this.postService.getPosts()
    //         .then(response => this.setState({ posts: response.data }))
    //         .catch(err => console.log(err))

    // }
    displayPosts = () => {
        //cambiar la p por un componente que recibe props para pintar
        return this.state.user.userPosts.map((post, idx) => <p key={idx}>{post.title} <hr /> {post.content}</p>)
        //return this.state.user.userPosts.map((elm, idx) => <UserPost key={idx} {...post} content={}>{post.title}</UserPost>)
    }

    displayReviews = () => {
        return this.state.user.myReviews.map((review, idx) => <p key={idx}>{review.content}</p>)
    }


    render() {
        if (this.state.user) {
            const { username, email, favoriteGenre, profilePic } = this.state.user
            return (
                <>
                    <Container as="section" className="profile-section">
                        <div><h1>Hello yo mothafucker, {username}</h1>
                            <div>
                                <h3>Contact info:</h3>
                                <img src={profilePic} alt="" />
                                <p>Favorite genre: {favoriteGenre}</p>


                            </div>
                            <h3>What I wrote:</h3>
                            {this.displayPosts()}
                            <h3>What I reviewed:</h3>
                            {this.displayReviews()}
                        </div>
                    </Container>
                </>
            )
        } else {
            return <p>Cargando...</p>
        }

    }
}

export default Profile