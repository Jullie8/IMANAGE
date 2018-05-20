import React from 'react';
import {Link, Route, Switch} from "react-router-dom";
import Home from "./signup/Home";
import CompanySignUpForm from "./signup/CompanySignUpForm";

class App extends React.Component {
  constructor (){
    super ();
    this.state = {

    }
  }
  render () {

    return (
    <div>
      <div class="pos-f-t">
        <div class="collapse" id="navbarToggleExternalContent">
          <div class="bg-dark p-4">
          <Link to="/">Home</Link>
          <br />
          <Link to="/companysignup">Sign Up</Link>
          </div>
        </div>

  <nav class="navbar navbar-dark bg-dark">
         <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarToggleExternalContent" aria-controls="navbarToggleExternalContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
        </button>
   </nav>
  
</div>
    <Switch>
        <Route exact path="/" component={Home}/>
        <Route path="/companysignup" component={CompanySignUpForm}/>
    </Switch>
</div>
   
    )
  }
}


export default App;
