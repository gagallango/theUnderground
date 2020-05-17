import React, { Component } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import AuthService from '../service/auth.service'
import Home from './Home/Home'
import SignUp from './Signup/Signup'
import Login from './Login/Login'
import Profile from './Profile/Profile'
import UserPost from './Post/UserPost/UserPost'
import Navbar from './ui/Navbar/Navbar'
import AllUserPosts from './Post/AllUserPosts/AllUserPosts';
import NewPost from './Post/NewPost/NewPost';
import EditPost from './Post/EditPost/EditPost'

class App extends Component {

  constructor() {
    super()
    this.state = { loggedInUser: null }
    this.authService = new AuthService()
    this.fetchUser()
  }

  setTheUser = userObj => this.setState({ loggedInUser: userObj })

  fetchUser = () => {
    if (this.state.loggedInUser === null) {
      this.authService.isLoggedIn()
        .then(response => this.setTheUser(response.data))
        .catch(() => this.setTheUser(false))
    }
  }

  render() {
    return (
      !this.state.loggedInUser ?
        <Switch>
          <Route exact path='/' render={() => <Home />} />
          <Route path='/signup' render={props => <SignUp {...props} setTheUser={this.setTheUser} />} />
          <Route path='/login' render={props => <Login {...props} setTheUser={this.setTheUser} />} />
        </Switch>
        :
        <div className="general-wrapper">
          <Navbar loggedInUser={this.state.loggedInUser} setTheUser={this.setTheUser} />
          <div className="main-container">
            <Switch>
              <Route path='/profile' render={() => this.state.loggedInUser ? <Profile loggedInUser={this.state.loggedInUser} /> : <Redirect to="/" />} />
              <Route path='/post/detail/:id' render={props => <UserPost {...props} />} />
              <Route path='/explore' render={props => <AllUserPosts {...props} />} />
              <Route path='/post/new' exact render={() => <NewPost user={this.state.loggedInUser} />} />
              <Route path='/post/detail/:id/edit' exact render={() => <EditPost user={this.state.loggedInUser} />} />
            </Switch>
          </div>
        </div>
    )
  }
}

export default App