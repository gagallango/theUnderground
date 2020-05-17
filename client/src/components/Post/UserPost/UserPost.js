import React, { Component } from 'react'

import PostService from '../../../service/post.service'

import Button from 'react-bootstrap/Button'
import { Link } from 'react-router-dom'

import EditPost from '../EditPost/EditPost'
import Comment from '../../Comments/Comment/Comment'
import './UserPost.css'
import Modal from 'react-bootstrap/Modal'

class UserPost extends Component {
    constructor(props) {
        super(props)
        this.state = {
            // user: props.loggedInUser,
            postInfo: {},
            showModal: false
        }
        this.postService = new PostService()
    }



    displayThePost = () => {
        const id = this.props.match.params.id
        this.postService.getUserPost(id)
            .then(response => this.setState(response.data))
            .catch(err => console.log(err))
    }

    handleNewComment() {
        this.displayThePost()
            .then(response => this.setState({
                postInfo: response.data
            }))
            .catch(err => console.log(err))
    }

    displayComment = () => {
        return this.state.postInfo.myReviews.map(comment => <Comment key={comment._id} newCommentAdded={() => this.handleNewComment()} {...comment} />)
    }

    handleDelete = (id) => {
        this.postService.deletePost(id)
            .then(() => {
                this.props.history.push('/profile')
            })
            .catch(err => console.log(err))
    }

    showModal = () => this.setState({ modalShow: true })
    hideModal = () => this.setState({ modalShow: false })


    componentDidMount = () => {
        this.displayThePost()
    }

    finishPost = () => {
        this.hideModal(false)
        this.displayThePost()
    }


    render() {
        return (
            <>
                <div className="post-details">
                    <Modal show={this.state.modalShow} onHide={this.hideModal}>
                        <Modal.Body>
                            <EditPost {...this.state} finishPost={this.finishPost} hideModalWindow={this.hideModal} />
                        </Modal.Body>
                    </Modal>

                    <div className="row">
                        <div className="col-md-8">
                            {this.state.creatorID ? <h6>{this.state.creatorID.username}</h6> : null}
                            <h2>{this.state.title}</h2>
                            <p className="content-box">{this.state.content}</p>
                            <div className="genre-typo">
                                <p className="genre-typology">Genre: {this.state.genre}</p>
                                <p className="genre-typology">Typology: {this.state.typology}</p>
                            </div>

                        </div>

                        <div className="col-md-4">
                            <div className="buttons-post">
                                <Button onClick={() => this.handleDelete(this.state._id)}>Delete</Button>
                                <Button onClick={this.showModal}>Update</Button>
                            </div>
                            <img style={{ width: '290px', marginTop: '10%', borderRadius: '10px', padding: '2%', background: "#fff" }} src={this.state.cover} alt={this.state.title} />

                            {this.state.postInfo.myReviews && this.displayComment()}
                        </div>
                    </div>
                </div>
            </>

        )
    }
}


export default UserPost

