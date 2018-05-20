import React, { Component } from 'react';

class NewCompany extends React.Component {
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
            <h1>Company Information</h1>
          
        </div>
);
    
}


}





export default NewCompany;