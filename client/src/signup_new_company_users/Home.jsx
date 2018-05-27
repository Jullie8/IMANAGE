import React from 'react';


class Home extends React.Component{
  render () {
    return (
      <div>

        <h1> Welcome To Imanage </h1>
        <p>IMANAGE is a simple app to clock in and out that helps small business owners manage by allowing their employees to report their time when on the field. </p>
        <button onClick={()=> this.props.history.push ('/companysignup')} type="button" class="btn btn-primary">Sign Up</button>
     </div>
)
  }
} 
export default Home;


//Notes: this.props.history.push only works on a stateful component && not in a functional stateless component 
//Each router component creates a history object that keeps track of the current location (history.location) also the previous locations in a stack.
//Cool things to keep in mind:
// history object has methods such as history.push() and history.replace() to take care of that. history.push() is invoked when you click on a <Link> component, and history.replace() is called when you use <Redirect>
