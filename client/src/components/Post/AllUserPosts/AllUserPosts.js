import React, { Component } from 'react'

import PostService from '../../../service/post.service'
import PostCard from '../PostCard/PostCard'

import './AllUserPosts.css'

class AllUserPosts extends Component {

    constructor(props) {
        super(props)
        this.state = {
            posts: []
        }
        this.postService = new PostService()
    }

    displayAllPosts = () => {
        this.postService.getPosts()
            .then(response => this.setState({ posts: response.data }))
            .catch(err => console.log(err))
    }

    componentDidMount = () => {
        this.displayAllPosts()
    }

    render() {
        return (
            <>
                <div className="alluserposts">
                    <h1>All posts from users</h1>
                    {this.state.posts.map(post => <PostCard key={post._id} {...post} />)}
                </div>
            </>
        )
    }

}

export default AllUserPosts