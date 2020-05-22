import React from 'react'
import Col from 'react-bootstrap/Col'
import './Comment.css'
import Button from 'react-bootstrap/Button'


const ReviewCard = (props) => {

    const { isCreator, review, handleDelete } = props


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
                {isCreator &&
                    <Col md={{ span: 8, offset: 1 }} className="comment">
                        <button style={{ marginTop: '20px' }} className="boton" onClick={() => handleDelete(review._id)}>Delete</button>
                    </Col>

                }
            </div>
            <hr></hr>
        </>
    )
}

export default ReviewCard