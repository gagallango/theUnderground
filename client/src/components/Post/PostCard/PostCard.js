import React from 'react'
import Card from 'react-bootstrap/Card'
import CardDeck from 'react-bootstrap/CardDeck'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'

import { Link } from 'react-router-dom'


const PostCard = props => {
    return (
        <>
            <Container>
                <Row>
                    <CardDeck>
                        <Card>
                            <Card.Img variant="top" src={props.cover} alt="" />
                            <Card.Body>
                                <Card.Title> {props.title}</Card.Title>
                                <Card.Text>Genre: {props.genre}</Card.Text>
                                <Card.Text>Typology: {props.typology}</Card.Text>
                                <Link to={`/post/detail/${props._id}`}>See details</Link>
                            </Card.Body>
                        </Card>
                    </CardDeck>
                </Row>
            </Container>
            {/* <img src={props.cover} alt="" />
            {props.title}
            {props.content}
            <Link to={`/post/detail/${props._id}`}>See details</Link> */}
        </>
    )
}

export default PostCard