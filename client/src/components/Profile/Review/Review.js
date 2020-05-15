import React from 'react'
import Col from 'react-bootstrap/Col'

const ReviewCard = review => {

    return (
        <>
            <Col md={{ span: 8, offset: 1 }}>
                <h6 className="user-info">{review.creator}</h6>
            </Col>
            <Col md={{ span: 8, offset: 1 }} className="comment">
                {review.content}
            </Col>
            <Col md={{ span: 8, offset: 1 }} className="rating-info">
                {review.rating}<img className="img-rating" src='./' alt="Star icon" />
                <hr />
            </Col>
        </>
    )
}

export default ReviewCard