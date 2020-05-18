import React from 'react'
import Col from 'react-bootstrap/Col'
import './Comment.css'

const ReviewCard = review => {

    return (
        <>
            <div className="comment-style">
                <Col md={{ span: 8, offset: 1 }}>
                    <h6 className="user-info">{review.creator.username}</h6>
                </Col>
                <Col md={{ span: 8, offset: 1 }} className="comment">
                    {review.content}
                </Col>
                <Col md={{ span: 8, offset: 1 }} className="rating-info">
                    {review.rating}<img style={{ width: '10px' }} src='/images/star-icon.png' alt="Star icon" />
                </Col>
            </div>
        </>
    )
}

export default ReviewCard