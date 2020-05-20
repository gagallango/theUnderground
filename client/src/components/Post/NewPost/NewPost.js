import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import PostService from '../../../service/post.service'
import CoverService from '../../../service/cover.service'
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Button from 'react-bootstrap/Button'

import './NewPost.css'
import PostEditor from '../../PostEditor/PostEditor.js'
import MicRecorder from 'mic-recorder-to-mp3';

const Mp3Recorder = new MicRecorder({ bitRate: 128 });


class NewPost extends Component {

    constructor() {
        super()
        this.state = {
            title: '',
            content: '',
            genre: 'Narrative',
            typology: 'Descriptive',
            cover: '',
            redirect: false,
            isRecording: false,
            blobURL: '',
            isBlocked: false,
            audio: ''
        }
        this.newPostService = new PostService()
        this.coverService = new CoverService()
    }

    start = () => {
        if (this.state.isBlocked) {
            console.log('Permission Denied');
        } else {
            Mp3Recorder
                .start()
                .then(() => {
                    this.setState({ isRecording: true });
                }).catch((e) => console.error(e));
        }
    };

    stop = () => {
        Mp3Recorder
            .stop()
            .getMp3()
            .then(([buffer, blob]) => {
                //const blobURL = URL.createObjectURL(blob)
                let theBlob = new Blob(buffer, { type: 'audio/mpeg-3' })
                console.log(theBlob.type)
                //theBlob.type = 'audio/mpeg-3'
                //console.log(blob.type)
                return this.handleAudioUpload(theBlob)
            })
            .then(response => {
                console.log('El archivo ya se ha subido. La URL de cloudinary es: ', response.data.secure_url)
                this.setState({
                    ...this.state, blobURL: response.data.secure_url, isRecording: false
                })
            })
            .catch(err => console.log(err)).catch((e) => console.log(e));
    };

    handleInputChange = e => {
        const { name, value } = e.target
        this.setState({
            [name]: value
        })
    }

    handleSubmit = e => {
        e.preventDefault()
        const info = { ...this.state }
        info.user = this.props.user._id
        this.newPostService.createPost(info)
            .then(response => {
                if (response.data.create === true) {
                    this.setState({ redirect: true })
                }
            })
            .catch(err => console.log(err))
    }

    handleFileUpload = e => {

        const uploadData = new FormData()
        uploadData.append('cover', e.target.files[0])
        this.coverService.handleUpload(uploadData)
            .then(response => {
                console.log('El archivo ya se ha subido. La URL de cloudinary es: ', response.data.secure_url)
                this.setState({
                    ...this.state, cover: response.data.secure_url
                })
            })
            .catch(err => console.log(err))
    }

    handleAudioUpload = blob => {
        const uploadData = new FormData()
        uploadData.append('audio', blob)
        return this.coverService.handleUploadAudio(uploadData)
    }

    componentDidMount() {
        navigator.getUserMedia({ audio: true },
            () => {
                console.log('Permission Granted');
                this.setState({ isBlocked: false });
            },
            () => {
                console.log('Permission Denied');
                this.setState({ isBlocked: true })
            },
        );
    }

    handlePostContent(content) {
        this.setState({ content })
    }

    render() {
        if (this.state.redirect) {
            return (<Redirect to="/profile" />)
        }
        return (
            <>
                <Container className="newpost">
                    <h1 className="title">Write your thoughts down here</h1>
                    <Form onSubmit={this.handleSubmit}>
                        <Form.Group as={Row} controlId="title">
                            <Col sm={10}>
                                <Form.Control name="title" placeholder="Title" type="text" value={this.state.title} onChange={this.handleInputChange} />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} controlId="content">
                            <Col sm={10}>
                                <PostEditor savePost={(content) => this.handlePostContent(content)} />
                                {/* <Form.Control name="content" placeholder="Write your text here" as="textarea" rows="10" cols="10" spellcheck="true" value={this.state.content} onChange={this.handleInputChange} /> */}
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} controlId="genre">
                            <Col sm={10}>
                                <Form.Label>Choose genre</Form.Label>
                                <Form.Control as="select" name="genre" value={this.state.genre} onChange={this.handleInputChange}>
                                    <option>Narrative</option>
                                    <option>NonFiction</option>
                                    <option>Poetry</option>
                                </Form.Control>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} controlId="">
                            <Col sm={10}>
                                <Form.Label>Choose typology</Form.Label>

                                <Form.Control as="select" name="typology" value={this.state.typology} onChange={this.handleInputChange}>
                                    <option>Descriptive</option>
                                    <option>Narrative</option>
                                    <option>Expository</option>
                                    <option>Argumentative</option>
                                    <option>Literature</option>
                                </Form.Control>
                            </Col>
                        </Form.Group>
                        <Form.Group controlId="cover">
                            <Form.Label>Choose your cover</Form.Label>
                            <Form.Control name="cover" type="file" onChange={this.handleFileUpload} />
                        </Form.Group>
                        {/* <Form.Group>
                            <Form.Label>Record your text so anyone can hear it</Form.Label>
                            <Button onClick={this.start} disabled={this.state.isRecording}>Record</Button>
                            <Button onClick={this.stop} disabled={!this.state.isRecording} >Stop</Button>
                            <audio src={this.state.blobURL} controls="controls" />
                        </Form.Group> */}
                        <br></br>
                        <Button className="boton" variant="primary" type="submit" >Publish</Button>
                    </Form>
                </Container>
            </>
        )
    }

}

export default NewPost