import React, { Component } from 'react'
import PostService from '../../../service/post.service'
import Button from 'react-bootstrap/Button'
import EditPost from '../EditPost/EditPost'
import Comment from '../../Comments/Comment/Comment'
import CommentForm from '../../Comments/CommentForm/CommentForm'
import './UserPost.css'
import Modal from 'react-bootstrap/Modal'

class UserPost extends Component {
    constructor(props) {
        super(props)
        this.state = {
            postInfo: {},
            showModal: false,
            comments: []
        }
        this.postService = new PostService()
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
        return this.state.comments.map(comment => <Comment key={comment._id} {...comment} />)
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

    submitLike = (e) => {
        console.log("ha entrado en submit")
        e.preventDefault()
        const like = { user: this.props.loggedInUser._id, post: this.state._id }
        this.postService.likePost(like)
            .then(() => console.log("DONE"))
            .catch((err) => console.log(err))
    }

    render() {
        console.log(this.state)
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
                            <div className="row">
                                <div className="col-7">
                                    {this.state.creatorID ? <h6>{this.state.creatorID.username}</h6> : null}
                                    <h2>{this.state.title}</h2>
                                    <div className="genre-typo">
                                        <p className="genre-genre"><b>Genre:</b> {this.state.genre}</p>
                                        <p className="genre-typology"><b>Typology:</b> {this.state.typology}</p>
                                    </div>
                                    <p className="content-box">{this.state.content}</p>
                                    {this.state.creatorID._id === this.props.loggedInUser._id ?
                                        <div className="buttons-post">
                                            <Button className="boton" onClick={() => this.handleDelete(this.state._id)}>Delete</Button>
                                            <Button className="boton" onClick={this.showModal}>Update</Button>
                                        </div>
                                        :
                                        <Button onClick={this.submitLike}><img style={{ width: '15px' }} src='/images/black-heart.png' alt="LikeIcon" /></Button>
                                    }
                                </div>
                                <div className="col-5">
                                    <img style={{ width: '400px' }} src={this.state.cover} alt={this.state.title} />
                                </div>

                            </div>

                        </div>
                        <div className="main-image">
                            <div className="row">
                                <div className="col-6">
                                    {this.state && this.displayComment()}
                                </div>
                                <div className="col-4">

                                    {this.state.creatorID._id === this.props.loggedInUser._id ?
                                        null
                                        :
                                        <div>
                                            <CommentForm user={this.props.loggedInUser} post={this.state._id} newCommentAdded={() => this.handleNewComment()} />
                                        </div>
                                    }
                                </div>
                            </div>
                        </div>
                        <Button className="boton" onClick={this.goBack}>Go back</Button>
                    </div>
                </>
            )
        }
    }
}


export default UserPost

