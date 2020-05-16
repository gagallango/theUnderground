// import React, { Component } from 'react'
// import PostService from '../../../service/post.service'

// class NewPost extends Component {

//     constructor(props) {
//         super(props)
//         this.state = {
//             title: '',
//             content: '',
//             genre: '',
//             tags: '',
//             typology: '',
//             cover: '',
//         }
//         this.newPostService = new PostService()
//     }

//     handleInputChange = e => {
//         const { name, value } = e.target
//         this.setState({[name]: value })
//     }

//     handleSubmit = e => {
//         e.preventDefault()
//         this.newPostService.createPost(this.state)
//             .then(() => this.finishAction())
//             .catch(err => console.log(err))
//     }

//     finishAction = () => {
//         this.props.hideModalWindow()
//     }

//     render() {
//         return (
//             <>
//                 <Container className="newpost">
//                     <h1 className="title">Añade tu restaurante</h1>
//                     <Form onSubmit={this.handleSubmit}>
//                         {/* <Form.Group controlId="imageUrl">
//                             <Form.Label>Imagen</Form.Label>
//                             <Form.Control type="file" name="imageUrl" onChange={this.handleFileUpload} />
//                         </Form.Group> */}
//                         <Form.Group controlId="title">
//                             <Form.Label>Title</Form.Label>
//                             <Form.Control name="title" type="text" value={this.state.title} onChange={this.handleInputChange} />
//                         </Form.Group>
//                         <Form.Group controlId="content">
//                             <Form.Label>Content</Form.Label>
//                             <Form.Control name="content" type="text" value={this.state.content} onChange={this.handleInputChange} />
//                         </Form.Group>
//                         <Form.Group controlId="genre">
//                             <Form.Label>genre</Form.Label>
//                             <Form.Control as="select" name="genre" value={this.state.genre} onChange={this.handleInputChange}>
//                                 <option>Narrative</option>
//                                 <option>NonFiction</option>
//                                 <option>Poetry</option>
//                             </Form.Control>
//                         </Form.Group>
//                         <Form.Group controlId="">
//                             <Form.Label>genre</Form.Label>
//                             <Form.Control as="select" name="genre" value={this.state.genre} onChange={this.handleInputChange}>
//                                 <option>Narrative</option>
//                                 <option>NonFiction</option>
//                                 <option>Poetry</option>
//                             </Form.Control>
//                         </Form.Group>
//                         <Button variant="primary" type="submit" className="btn btn-block btn-login">Añadir</Button>
//                     </Form>
//                 </Container>
//             </>
//         )
//     }

// }

// export default NewPost