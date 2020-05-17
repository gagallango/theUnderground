import React, { Component } from 'react'
import Button from 'react-bootstrap/Button'
import PostService from '../../../service/post.service'


import { Link } from 'react-router-dom'
import './UserPost.css'

class UserPost extends Component {
    constructor(props) {
        super(props)
        this.state = {
            postInfo: {}
        }
        this.postService = new PostService()
    }

    displayThePost = () => {
        const id = this.props.match.params.id
        this.postService.getUserPost(id)
            .then(response => this.setState(response.data))
            .catch(err => console.log(err))
    }

    handleDelete = () => {
        this.postService.deletePost()
            .then(response => console.log(response))
            .catch(err => console.log(err))
    }



    componentDidMount = () => {
        this.displayThePost()
    }

    render() {
        return (
            <>
                <div className="post-details">
                    <div className="row">
                        <div class="col-md-6">
                            {this.state.creatorID ? <h5>{this.state.creatorID.username}</h5> : null}
                            <h3>{this.state.title}</h3>
                            <p class="content-box">{this.state.content}</p>
                        </div>
                        <div class="col-md-6">
                            <img style={{ width: '400px' }} src={this.state.cover} alt={this.state.title} />
                            <div className="genre-typo">
                                <ul>
                                    <li>{this.state.genre}</li>
                                    <li>{this.state.typology}</li>
                                </ul>
                            </div>
                            {/* <Link to="/explore" >Go back</Link> */}
                            <Link to="/post/edit" >Edit</Link>
                            <Button onClick={this.handleDelete()}>Delete</Button>
                        </div>
                    </div>
                </div>
            </>

        )
    }
}


export default UserPost

