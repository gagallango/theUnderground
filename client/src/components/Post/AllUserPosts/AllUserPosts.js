import React, { Component } from 'react'
import PostService from '../../../service/post.service'
import PostCard from '../PostCard/PostCard'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import './AllUserPosts.css'

class AllUserPosts extends Component {

    constructor(props) {
        super(props)
        this.state = {
            posts: [],
            filteredPosts: [],
            genreValue: '',
            typologyValue: '',
            randomChoice: {}
        }
        this.postService = new PostService()
    }

    displayPosts = () => {
        return this.state.filteredPosts.map(elm => <PostCard key={elm._id} {...elm} />)
    }

    displayAllPosts = () => {
        this.postService.getPosts()
            .then(response => this.setState({ posts: response.data, filteredPosts: response.data }))
            .catch(err => console.log(err))
    }

    componentDidMount = () => {
        this.displayAllPosts()
    }

    filterSearch = () => {
        const posts = this.state.posts
            .filter(post => post.genre.includes(this.state.genreValue))
            .filter(post => post.typology.includes(this.state.typologyValue))
        this.setState({ filteredPosts: posts })
    }

    handleFilterByGenre = e => {
        const value = e.currentTarget.value
        this.setState({ genreValue: value }, () => this.filterSearch())
    }

    handleFilterByTypology = e => {
        const value = e.currentTarget.value
        this.setState({ typologyValue: value }, () => this.filterSearch())
    }


    randomPost = () => {
        const random = Math.floor(Math.random() * this.state.filteredPosts.length)
        const choice = this.state.filteredPosts[random]
        this.props.history.push(`post/detail/${choice._id}`)
    }



    render() {
        return (
            <>
                <div style={{ marginLeft: '18%' }} className="row">
                    <div className="filters">
                        <div className="col-3">
                            <Form>
                                <Form.Group controlId="exampleForm.SelectCustom">
                                    <Form.Label>Choose by genre</Form.Label>
                                    <Form.Control onChange={this.handleFilterByGenre} as="select" style={{ width: '200px' }} custom>
                                        <option value="Narrative">Narrative</option>
                                        <option value="NonFiction">NonFiction</option>
                                        <option value="Poetry">Poetry</option>
                                    </Form.Control>
                                </Form.Group>
                            </Form>

                        </div>
                        <div className="col-3">
                            <Form>
                                <Form.Group controlId="exampleForm.SelectCustom">
                                    <Form.Label style={{ textAlign: 'center' }}>Choose by typology</Form.Label>
                                    <Form.Control onChange={this.handleFilterByTypology} as="select" style={{ width: '200px' }} custom>
                                        <option value="Descriptive">Descriptive</option>
                                        <option value="Narrative">Narrative</option>
                                        <option value="Expository">Expository</option>
                                        <option value="Argumentative">Argumentative</option>
                                        <option value="Literature">Literature</option>
                                    </Form.Control>
                                </Form.Group>
                            </Form>
                        </div>
                        <div className="col-4">
                            <p>Don't know what to read?</p> <br></br> <Button onClick={this.randomPost} className="boton" style={{ marginTop: '-50px', marginLeft: '30px' }}>CLICK HERE</Button>

                        </div>
                    </div>
                </div>

                <div className="posts-wrapper">
                    {this.displayPosts()}
                </div>
            </>
        )
    }

}

export default AllUserPosts