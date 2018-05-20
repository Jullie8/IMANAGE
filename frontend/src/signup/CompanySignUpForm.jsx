import React, { Component } from 'react';

class CompanySignUpForm extends React.Component {
  constructor (){
    super ();
    this.state = {
      companyEmailInput: "",
      message: ""
    }
  }

  handleEmailChange = e =>{
      this.setState({
        companyEmailInput: e.target.value
      });
    }

    submitSignUpButton = e => {
      e.preventDefault();
      const {companyEmailInput} = this.state;
      if (companyEmailInput.length < 5){
        this.setState({
          message:"Company email length must be at least 5"
        });

      }
    }

render () {
  const {companyEmailInput} = this.state;
  console.log(this.state.companyEmailInput)
    return (
    <div>
      <h1>Company Information </h1>
      <h4> Enter Your Company Details Below</h4>
      <form onSubmit={''}>

      <label for="usr">Full Name:</label>
        <input type="text" class="form-control" id="usr" placeholder="Enter Full Name"/>

      <label for="usr">Company Name:</label>
        <input type="text" class="form-control" id="usr" placeholder="Enter Company Name"/>
     
      <label for="exampleInputEmail1">Email address </label>
        <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"/>
     
      <label for="pwd">Create Your Password:</label>
        <input type="password" class="form-control" id="pwd" placeholder="Password must be at least 8 characters"/>

      <label for="pwd">Re enter your password:</label>
        <input type="password" class="form-control" id="pwd" placeholder="Re enter password"/>
      <br />
      <button type="button" class="btn btn-success">Register</button>

    </form>
    </div>
);
    
}


}

export default CompanySignUpForm;