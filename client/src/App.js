import React from 'react';



import {Link, Route, Switch} from "react-router-dom";

import Home from "./signup_new_company_users/Home";
import CompanySignUpForm from "./signup_new_company_users/CompanySignUpForm";
 

class App extends React.Component {
  constructor (){
    super ();
    this.state = {

    }
  }
  render () {

    return (
    <div>
          <Link to="/">Home</Link> {''}
          <Link to="/companysignup">Sign Up</Link> 
    <Switch>
        <Route exact path="/" component={Home}/>
        <Route path="/companysignup" component={CompanySignUpForm}/>
    </Switch>
    </div>
   
    )
  }
}


export default App;
