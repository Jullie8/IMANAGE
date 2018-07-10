import React from 'react';
import { FormErrors } from './FormErrors';
import axios from 'axios';
import { Redirect } from 'react-router-dom'

//React Component Composition
//Component Composition 
//Declarative UI
//event -> state change -> re-render

class RegisterCompany extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        fullName: "",
        companyName: "",
        companyEmail: "",
        password: "",
        message: "",
        // reEnteredPw: "",
        formErrors:{fullName: '', companyName:'', companyEmail: '', password: ''},
        fullNameIsValid:false,
        companyNameIsValid:false,
        passwordIsValid:false,
        isFormValid: false,
        // toDashBoard: false
       
      }
    }

    handleUserInput = (e) => {
      let name = e.target.name;
      let value = e.target.value;
      this.setState({
        [name]: value
      },
        function (){
        this.fieldValidation(name,value)
        });
        // () => { this.fieldValidation(name, value)});
        }

    
    fieldValidation(fieldName, value){
      let fieldErrors= this.state.formErrors;
      let passwordIsValid= this.state.passwordIsValid;
      let fullNameIsValid= this.state.fullNameIsValid;
      let companyNameIsValid= this.state.companyNameIsValid;

      switch(fieldName){
        case 'fullName':
          fullNameIsValid= value.length > 3;
          fieldErrors.fullName = fullNameIsValid ? '' : 'is too short'
          break;
          
        case 'companyName':
          companyNameIsValid= value.length > 3;
          fieldErrors.companyName = companyNameIsValid ? '' : 'is too short'
          break;
        //check to see if this works
        // case 'password':
        // passwordIsValid = this.validatePassword(this.state.password, this.state.reEnteredPw) 
        // fieldErrors.password = passwordIsValid ? '' : 'is invalid Password must be: At least 8 characters long, Include at least 1 lowercase letter 1 number, 1 special character -> !@#$%^&*';
        // break;
        // default:
        // break;

        case 'password':
        passwordIsValid = this.validatePassword(this.state.password) 
        fieldErrors.password = passwordIsValid ? '' : 'is invalid Password must be: At least 8 characters long, Include at least 1 lowercase letter 1 number, 1 special character -> !@#$%^&*';
        break;
        default:
        break;


      } 
      this.setState({formErrors: fieldErrors,
                    passwordIsValid: passwordIsValid,
                    fullNameIsValid: fullNameIsValid,
                    companyNameIsValid: companyNameIsValid, 
                  }, this.formValidation);
    
    }
     //function below is validating that the pw the user creates meets the following constraints
        validatePassword = (str, str2) => {
      //  Passwords must be :
      //  At least 8 characters long, max length
      //  Include at least 1 lowercase letter
      //  1 capital letter
      //  1 number
      //  1 special character => !@#$%^&*
      let format = /^(?=.*[\d])(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*])[\w!@#$%^&*]{8,}$/
    
      // if(format.test(str)) {
      //   return str === str2;
      // } else {
      //   return false;
      // }
      if(format.test(str)) {
        return true;
      } else {
        return false;
      }
    }

    formValidation(){
      this.setState({
        isFormValid: this.state.passwordIsValid && this.state.companyNameIsValid && this.state.fullNameIsValid});
    }

   // bootstrap has-error class to a field’s form-group based on its error value for boostrap to highlight on error 
    errClass(error) {
    return(error.length === 0 ? '' : 'has-error');
  }


    submitForm = (event) =>{
      event.preventDefault();
      axios.post("/company/new", {
          companyName: this.state.companyName,
          fullName: this.state.fullName,
          username: this.state.companyEmail,
          password: this.state.password
        })
        .then((res)=>{
          console.log(res.data)
          this.setState({
            // companyName: "",
            // fullName: "",
            // companyEmail: "",
            // password: "",
            message: window.alert("Registration Successful")
          })
        })
        // saveUser(user)
        .then(()=>
        // <Redirect to='/company/login'/>
          this.props.history.push('/admins/login')
        )
        .catch((err)=>{
            console.log(err)
            this.setState({
              companyName: "",
              message: "Something went wrong"
            })   
        })
    }

    render() {
      const {companyName, message} = this.state;
      // const { fields, passwordInput } = this.state;
      console.log(this.state.formErrors);
      console.log(this.state.fullName)
      console.log(this.state.companyName)
      console.log(this.state.companyEmail)
      console.log(this.state.password)
      console.log(this.state.passwordIsValid)    
      console.log(this.state.isFormValid)
      //all inputs have a value and handle change //
      const divFormStyle = {
      margin: '30px',
      border: '5px solid #FFFF'
};
      return ( 
      <div style={divFormStyle} class="card-body">

        <h2> Company Sign Up </h2> 
        <div >
        <FormErrors formErrors={this.state.formErrors} />
        </div>

        <label>Full Name: </label> {''} <br />
        <div className={`form-group ${this.errClass(this.state.formErrors.fullName)}`}>
        <input 
        type="text"
        required
        placeholder = "John Doe"
        name =  "fullName"
        onChange = {this.handleUserInput}
        value = {this.state.fullName} 
         />
         </div>
  
        <label> Company Name: </label> {''} <br />
        <div className={`form-group ${this.errClass(this.state.formErrors.companyName)}`}>
        <input 
        type = "text"
        required
        placeholder = "Company Name"
        name= "companyName"
        onChange = {this.handleUserInput}
        value = {this.state.companyName} 
       />
       </div>
        
        <label> Email address </label> {''} <br />
        <div className="form-group">
        <input 
        type = "email"
        required
        placeholder = "name@example.com"
        name = "companyEmail"
        onChange = {this.handleUserInput} 
        value = {this.state.companyEmail}
        />
        </div>


        <label> Create Your Password: </label> {''} <br />
        <div className={`form-group ${this.errClass(this.state.formErrors.password)}`}>
        <input 
        type= "password"
        required
        placeholder= "Minimum 8 characters"
        name= "password"
        onChange= {this.handleUserInput}
        value= {this.state.password}
        />
        </div>
        
{/*         
        <label> Re enter your password: </label> {''} <br />
        <input 
        type= "password"
        required
        placeholder= "Re enter Password"
        name= "reEnteredPw"
        onChange= {this.handleUserInput}
        value= {this.state.reEnteredPw}
        />
        <br/> */}
        <br/> 
        <button onClick={this.submitForm} type="submit" disabled={!this.state.isFormValid}> Sign Up </button> 
  
        {/* <button onClick={()=> this.props.history.push ('/company/login')} */}
        {message}
      </div>
      );

      }

    }

    export default RegisterCompany;