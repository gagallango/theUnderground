import React, { Component } from 'react'
import PostService from '../../../service/post.service'
import Button from 'react-bootstrap/Button'
import EditPost from '../EditPost/EditPost'
import Comment from '../../Comments/Comment/Comment'
import CommentForm from '../../Comments/CommentForm/CommentForm'
import './UserPost.css'
import Modal from 'react-bootstrap/Modal'
import { Link } from 'react-router-dom'
import CommentService from '../../../service/comment.service'

class UserPost extends Component {
    constructor(props) {
        super(props)
        this.state = {
            postInfo: {},
            showModal: false,
            comments: []
        }
        this.postService = new PostService()
        this.commentService = new CommentService()
        this.goBack = this.goBack.bind(this)
    }

    goBack() {
        this.props.history.goBack();
    }

    displayThePost = () => {
        const id = this.props.match.params.id
        this.postService.getUserPost(id)
            .then(response => this.setState(response.data))
            .catch(err => console.log(err))
    }

    handleNewComment() {
        this.displayThePost()
    }

    displayComment = () => {
        return this.state.comments.map(comment => <Comment isCreator={comment.creator._id === this.props.loggedInUser._id} handleDelete={(reviewID) => this.deleteComment(reviewID)} key={comment._id} review={comment} />)
    }

    handleDelete = (id) => {
        this.postService.deletePost(id)
            .then(() => {
                this.props.history.push('/profile')
            })
            .catch(err => console.log(err))
    }

    deleteComment = id => {
        this.commentService.deleteComment(id)
            .then((info) => this.displayThePost())
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

    submitLike = (e) => {
        console.log("ha entrado en submit")
        e.preventDefault()
        const like = { user: this.props.loggedInUser._id, post: this.state._id }
        this.postService.likePost(like)
            .then(() => console.log("DONE"))
            .catch((err) => console.log(err))
    }

    render() {
        if (!this.state.creatorID) {
            return <h1></h1>
        } else {
            return (
                <>
                    <div className="post-details">
                        <Modal show={this.state.modalShow} onHide={this.hideModal}>
                            <Modal.Body>
                                <EditPost {...this.state} finishPost={this.finishPost} hideModalWindow={this.hideModal} />
                            </Modal.Body>
                        </Modal>
                        <div className="main-text">
                            <Link onClick={this.goBack}> <img style={{ width: '15px', marginBottom: '20px' }} src='/images/left-arrow.png' alt="" /> </Link>
                            <p> Written by: {this.state.creatorID ? <h6>{this.state.creatorID.username}</h6> : null}</p>

                            <h2 className="post-title">{this.state.title}</h2>
                            <div className="genre-typo" style={{ display: 'inline-flex' }}>
                                <p className="genre-genre"><b>Genre:</b> {this.state.genre}</p>
                                <p className="genre-genre"><b>Typology:</b> {this.state.typology}</p>
                            </div>
                            <div className="cover-image">
                                <img style={{ width: '500px', margin: '2%' }} src={this.state.cover} alt={this.state.title} />
                            </div>
                            <p className="content-box">
                                {this.state.content.blocks.map(block => {
                                    if (block.type === "header") {
                                        return <h2>{block.data.text}</h2>
                                    } else if (block.type === "paragraph") {
                                        return <p>{block.data.text}</p>
                                    }
                                })}

                            </p>
                            {this.state.creatorID._id === this.props.loggedInUser._id ?
                                <div className="buttons-post">
                                    <Button className="boton" onClick={() => this.handleDelete(this.state._id)}>Delete</Button>
                                    <Button className="boton" onClick={this.showModal}>Update</Button>
                                </div>
                                :
                                <Link onClick={this.submitLike}><img style={{ width: '15px' }} src='/images/grey-heart.png' alt="LikeIcon" /></Link>
                            }
                        </div>
                        <div className="main-image">
                            <h2>Comments</h2>
                            {this.state && this.displayComment()}
                            {this.state.creatorID._id === this.props.loggedInUser._id ?
                                null
                                :
                                <div>
                                    <CommentForm user={this.props.loggedInUser} post={this.state._id} newCommentAdded={() => this.handleNewComment()} />
                                </div>
                            }
                        </div>
                    </div>
                </>
            )
        }
    }
}


export default UserPost

