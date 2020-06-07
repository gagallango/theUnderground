import React from 'react'
import { Link } from 'react-router-dom'
import './Home.css'

const Home = () => {
    return (
        <>
            <div id="main-wrapper">
                <aside>
                    <h1 className="the" style={{ marginRight: '10px' }}>THE</h1>
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
                    <div>a writing and content creator platform - a writing and content creator platform - a writing and content creator plat</div>
                </div>
            </section>
        </>
    )
}

export default Home