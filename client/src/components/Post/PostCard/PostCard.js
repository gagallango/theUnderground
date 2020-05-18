import React from 'react'
import Card from 'react-bootstrap/Card'

import { Link } from 'react-router-dom'


const PostCard = props => {
    return (
        <>
            <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src={props.cover} alt="" />
                <Card.Body>
                    <Card.Title> {props.title}</Card.Title>
                    <Card.Text>Genre: {props.genre}</Card.Text>
                    <Card.Text>Typology: {props.typology}</Card.Text>
                    <Link to={`/post/detail/${props._id}`}>See details</Link>
                </Card.Body>
            </Card>
            {/* <img src={props.cover} alt="" />
            {props.title}
            {props.content}
            <Link to={`/post/detail/${props._id}`}>See details</Link> */}
        </>
    )
}

export default PostCard