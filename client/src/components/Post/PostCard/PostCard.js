import React from 'react'

import { Link } from 'react-router-dom'


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