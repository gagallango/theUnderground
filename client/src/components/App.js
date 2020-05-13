import React, { Component } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import AuthService from '../service/auth.service'
import Home from './Home/Home'
import SignUp from './Signup/Signup'
import Login from './Login/Login'
import Profile from './Profile/Profile'

class App extends Component {

  constructor() {
    super()
    this.state = { loggedInUser: null }
    this.authService = new AuthService()
  }


  setTheUser = userObj => this.setState({ loggedInUser: userObj }, () => this.state)

  fetchUser = () => {
    if (this.state.loggedInUser === null) {
      this.authService.isLoggedIn()
        .then(response => this.setTheUser(response.data))
        .catch(() => this.setTheUser(false))
    }
  }

  render() {

    this.fetchUser()
    return (
      <>
        <Switch>
          <Route exact path='/' render={() => <Home />} />
          <Route path='/signup' render={props => <SignUp {...props} setTheUser={this.setTheUser} />} />
          <Route path='/login' render={props => <Login {...props} setTheUser={this.setTheUser} />} />
          <Route path="/profile" render={() => this.state.loggedInUser ? <Profile loggedInUser={this.state.loggedInUser} /> : <Redirect to="/" />} />
        </Switch>
      </>
    );
  }
}

export default App
