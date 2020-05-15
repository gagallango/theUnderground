import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './Home.css'

class Home extends Component {

    render() {
        return (
            <>
                <div id="main-wrapper">
                    <aside>
                        <h1 className="the">THE</h1>
                    </aside>
                    <main>
                        <h1 className="underground">UNDERGROUND</h1>
                        <div className="sign-log">
                            <Link to='/signup'>Join</Link>
                            <Link to='/login'>Login</Link>
                        </div>
                    </main>
                </div>
                <section>
                    <div className="scroll text">
                        <div>a writting and content creator platform - a writting and content creator platform</div>
                    </div>
                </section>
            </>
        )
    }
}

export default Home