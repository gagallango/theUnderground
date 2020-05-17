import React from 'react'

import { Link } from 'react-router-dom'

import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import CardGroup from 'react-bootstrap/CardGroup'

const PostCard = props => {
    return (
        <Col lg={3} md={6} >
            <CardGroup>
                <Card>
                    <Card.Img variant="top" src={props.cover} />
                    <Card.Body>
                        <Card.Title>{props.title}</Card.Title>
                        <Card.Text>{props.content}</Card.Text>
                        <Link to={`/post/detail/${props._id}`}>See details</Link>
                    </Card.Body>
                </Card>
            </CardGroup>
        </Col>

    )
}

export default PostCard