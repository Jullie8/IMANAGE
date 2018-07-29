import React from 'react'
import { Route, Link, Switch } from 'react-router-dom';
import LoginAdmin from './LoginAdmin';
import RegisterCompany from './RegisterCompany';

//How to use React Context
//Setting Up Context Provider & define the data I want to store
//2. use a context consumer where ever you need the data from the store
//The newly created AppContext will be used to build a context provider component. This provider will store, in its state, the data we need and it will wrap all of the content of the component:
const AppContext= React.createContext();

class AppProvider extends React.Component {
  state= {
    user: ''
    
  }
  render(){
    return <AppContext.Provider value={this.state} >
         {this.props.children}
      </AppContext.Provider>
   
  }
}

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

  setUser= (data) => {
    console.log(data);
    this.setState({
      user: data
    })
  }

  removeUser = () => {
    this.setState({
      user: ""
    })
  }
//REACT CONTEXT BEGUN HERE
  renderLogin = () => {
    return (
    <AppProvider>  
      <div className="loginAdmin">
       <AppContext.Consumer>
          {(context) => context.user}
        </AppContext.Consumer>
        <LoginAdmin toggleLogin={this.toggleLogin} setUser={this.setUser} removeUser={this.removeUser} message="" user={this.state.user} /> 
     </div>
   </AppProvider>
    )
  }

  renderRegister = () => {
    if (this.state.user) {
      return (
        <AppProvider>
          <div>
            <AppContext.Consumer>
              {(context) => context.user}
            </AppContext.Consumer>
            <LoginAdmin toggleLogin={this.toggleLogin} setUser={this.setUser} removeUser={this.removeUser} message="Please log out before you register" user={this.state.user}/>
        </div>
        </AppProvider>
      )
    } else {
      return (
        <div>
        
            <RegisterCompany />
        </div>
   
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