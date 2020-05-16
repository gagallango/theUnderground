import React from 'react'

import { Link } from 'react-router-dom'

import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'

const PostCard = props => {
    return (
        <Col lg={3} md={6} >
            <Card as="article">
                <Card.Img variant="top" src={props.cover} />
                <Card.Body>
                    <Card.Title>{props.title}</Card.Title>
                    <Link to={`/post/detail/${props._id}`}>See details</Link>
                </Card.Body>
            </Card>
        </Col>
    )
}

export default PostCard