import React from 'react'
import { Link } from 'react-router-dom'
import './PostCard.css'


const PostCard = props => {

    return (
        <div class="card-post">
            <h4 style={{ textAlign: 'center', fontSize: '30px', color: '#7a7499' }}>{props.title}</h4>
            <div className="yay">
                Written by: <br></br>
                <p style={{ fontSize: '15px' }}><b>{props.creatorID.username}</b></p>
            </div>
            <div className="card-link">
                <Link to={`/post/detail/${props._id}`}>Read</Link>
            </div>
        </div >
    )
}

export default PostCard