import React, { Component } from 'react'
import Container from 'react-bootstrap/Container'
import { Link } from 'react-router-dom'
import './Home.css'

class Home extends Component {

    render() {
        return (

            <Container className="underground">
                <div>
                    <h1>THE <br></br><span className="underground-title">UNDERGROUND</span></h1>
                </div>
                <div>
                    <Link to='/signup'>Join</Link>
                    <Link to='/login'>Login</Link>
                </div>
            </Container >
        )
    }
}

export default Home