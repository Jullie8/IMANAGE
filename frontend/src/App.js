import React from 'react';
import {Link, Route, Switch} from "react-router-dom";
import Home from "./signup/Home";
import NewCompany from "./signup/NewCompany";

class App extends React.Component {
  constructor (){
    super ();
    this.state = {

    }
  }
  render () {

    return (
    <div>
      <nav>
      <Link to="/">Home</Link>
      {" "}
      <Link to="/companysignup">Sign Up</Link>
      </nav>
      
      <Switch>
      <Route exact path="/" component={Home}/>
      <Route path="/companysignup" component={NewCompany}/>
      </Switch>
  </div>

   
    )
  }
}


export default App;
