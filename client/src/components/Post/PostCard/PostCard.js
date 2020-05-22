import React from 'react'
import { Link } from 'react-router-dom'
import './PostCard.css'


const PostCard = props => {

    //pasar componente a clase
    //a card-post un onMouseEnter y en pnMouseLeave ()=>this.setState({showImage: !showImage})
    //en el css, card-post position:relative y card-bg-img position absolute width 100% height:100% object-fit:cover opacity:0.2
    return (
        <div className="card-post">
            <h4 style={{ textAlign: 'left', fontSize: '25px', color: '#7a7499' }}>{props.title}</h4>
            <div className="yay">
                Written by: <br></br>
                <p style={{ fontSize: '15px' }}><b>{props.creatorID.username}</b></p>
            </div>
            <div className="card-link">
                <Link to={`/post/detail/${props._id}`}>READ</Link>
            </div>
            {/* {this.state.showImage && <img className="card-bg-img" src={props.cover} alt='' />}  */}
        </div >
    )
}

export default PostCard