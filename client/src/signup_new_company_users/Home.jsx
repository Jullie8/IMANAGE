import React from 'react';
import {Link, Route, Switch} from "react-router-dom";

class Home extends React.Component{
  render (){
  const divStyle = {
  margin: '20px',
  height: '200px',
  border: '5px solid #FFFF'
};

return (
      <div className="card" style={divStyle}>
        <div className="card-body">
          <nav className=".navbar-toggler navbar bg-dark">
              <Link to="/">Home</Link> 
              <Link to="/companysignup">Sign Up</Link>
              <Link to="/login">Login</Link>
                </nav>
                  <h1> Welcome To Imanage </h1>
                    <img src= "https://static1.squarespace.com/static/54f9248de4b0b89d005f8d31/t/56f079fbcf80a186e335e9d3/1458600488716/?format=300w" />
                      <p class="text-justify">IMANAGE is a simple app to clock in and out that helps small business owners manage by allowing their employees to report their time when on the field. </p>
                       <button onClick={()=> this.props.history.push ('/companysignup')} type="button" class="btn btn-primary">Sign Up</button>
          </div>
      </div>)}
} 
export default Home;


//Notes: this.props.history.push only works on a stateful component && not in a functional stateless component 
//Each router component creates a history object that keeps track of the current location (history.location) also the previous locations in a stack.
//Cool things to keep in mind:
// history object has methods such as history.push() and history.replace() to take care of that. history.push() is invoked when you click on a <Link> component, and history.replace() is called when you use <Redirect>
