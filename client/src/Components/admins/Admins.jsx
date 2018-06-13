import React from 'react'
import { Route, Link, Switch } from 'react-router-dom';
import LoginAdmin from './LoginAdmin';
import RegisterCompany from './RegisterCompany';

class Admins extends React.Component {
  constructor() {
    super();
    this.state = {
      loggedIn: false,
      user: ""
    }
  }

  toggleLogin = () => {
    this.setState({
      loggedIn: !this.state.loggedIn
    })
  }

  setUser = (data) => {
    this.setState({
      user: data.username
    })
  }

  removeUser = () => {
    this.setState({
      user: ""
    })
  }

  renderLogin = () => {
    return (
      <LoginAdmin toggleLogin={this.toggleLogin} setUser={this.setUser} removeUser={this.removeUser} message="" user={this.state.user} />
    )
  }

  renderRegister = () => {
    if (this.state.user) {
      return (
        <LoginAdmin toggleLogin={this.toggleLogin} setUser={this.setUser} removeUser={this.removeUser} message="Please log out before you register" user={this.state.user}/>
      )
    } else {
      return (
        <RegisterCompany />
      )
    }
  }

  render() {
    return (
      <div>
        <Switch>
          <Route exact path='/admins/login' render={this.renderLogin} />
          <Route exact path='/admins/new' render={this.renderRegister} />
        </Switch>
      </div>
    )
  }
}

export default Admins;