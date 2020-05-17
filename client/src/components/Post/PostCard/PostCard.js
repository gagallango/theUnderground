import React from 'react'

import { Link } from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import CardGroup from 'react-bootstrap/CardGroup'


const PostCard = props => {
    return (
        <>
            <img src={props.cover} alt="" />
            {props.title}
            {props.content}
            <Link to={`/post/detail/${props._id}`}>See details</Link>


        </>
    )
}

export default PostCard