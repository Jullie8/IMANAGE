import React from 'react';
import {Link, Route, Switch} from "react-router-dom";

import Home from "./Components/Home";
// import LoginAdmin from "./Components/LoginAdmin";
import RegisterCompany from "./Components/admins/RegisterCompany";
import Admins from './Components/admins/Admins';
 
class App extends React.Component {
  constructor (){
    super ();
    this.state = {}
  }
  render () {
    return (
        <div>
            <Link to="/">Home</Link> {''}
            {/* <Link to="/companysignup">Sign Up</Link>  */}
            <Switch>
                <Route exact path="/" component={Home}/>
                <Route path="/admins/registercompany" component={RegisterCompany}/>
                {/* <Route path="/auth" component={Admins}/> */}
                <Route path="/admins" component={Admins} />
            </Switch>
           
         </div>)}
}


export default App;
