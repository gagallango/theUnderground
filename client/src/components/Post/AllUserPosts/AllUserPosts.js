import React, { Component } from 'react'
import PostService from '../../../service/post.service'
import PostCard from '../PostCard/PostCard'
import Form from 'react-bootstrap/Form'
import './AllUserPosts.css'

class AllUserPosts extends Component {

    constructor(props) {
        super(props)
        this.state = {
            posts: [],
            filteredPosts: [],
            genreValue: '',
            typologyValue: ''
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

    render() {
        console.log(this.state.filteredPosts)
        return (
            <>
                <div className="row">
                    <div className="filters">
                        <div className="col-5">
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
                        <div className="col-5">
                            <Form>
                                <Form.Group controlId="exampleForm.SelectCustom">
                                    <Form.Label>Choose by typology</Form.Label>
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