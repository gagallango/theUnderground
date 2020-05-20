import React from 'react'
import Col from 'react-bootstrap/Col'
import './Comment.css'

const ReviewCard = review => {
    return (
        <>
            <div className="comment-style">
                <Col md={{ span: 8, offset: 1 }}>
                    <b>{review.creator.username}</b>
                </Col>
                <Col md={{ span: 8, offset: 1 }} className="comment">
                    {review.content}
                </Col>
                <Col md={{ span: 8, offset: 1 }} className="rating-info">
                    <img style={{ width: '13px', marginRight: '5px', marginBottom: '3px' }} src='/images/star-icon.png' alt="RateIcon" />{review.rating}
                </Col>
            </div>
            <hr></hr>
        </>
    )
}

export default ReviewCard