import React from 'react';
import axios from 'axios';
const AppContext = React.createContext()


class AddEmployeeForm extends React.Component {
    constructor(props){
        super(props);

        this.roles = ["Office Admin", "Crew Manager", "Employee"];

        this.state= {
            prefRole: "",
            fullName: "",
            username: "",
            activated_user: false,
            providedNotification: false

            // organizationalUnit:""
        }
    }

    componentDidMount(){
        console.log('I am in Add Employee Form' + this.props.user.employed_by)
    }

//edit this
    handleAddEmployeeInput= (e)=> {
    let name = e.target.name;
    let value = e.target.value;
    this.setState({[name]: value})}

    handleRadioRoles = e =>{
        this.setState({
            [e.target.name]: e.target.value
        });
    };
    

    submitFormToAddEmployee= (event) =>{
        event.preventDefault();
        axios.post("/company/addCompanyEmployee", {
            // companyName: this.state.companyName,
            fullName: this.state.fullName,
            username: this.state.username,
            employed_by:this.props.user.employed_by,
            user_type: this.state.prefRole,
            activated_user: this.state.activated_user
            // employed_by: this.props.user.employed_by
            // password: this.state.password
          })
          .then((res)=>{
            console.log(res.data)
            this.props.setUser(res.data)
            this.setState({
              // companyName: "",
              // fullName: "",
              // companyEmail: "",
              // password: "",
              message: window.alert("You have successfully added an employee email sent")
            })
          })
          // saveUser(user)
          .then(()=>
          // <Redirect to='/company/login'/>
            // this.props.history.push('/admins/login')
            this.setState({
                fullName: "",
                username: ""
            })
          )
          .catch((err)=>{
              console.log(err)
              this.setState({
                companyName: "",
                message: "Something went wrong"
              })   
          })
      }


render (){
    console.log(this.state.username);
    console.log(this.state.prefRole);
    const {companyID}= this.props

   
    return (
        <div>
          <label>Full Name: </label> {''} <br />
        <div >
        <input 
        type="text"
        required
        placeholder = "John Doe"
        name="fullName"
        onChange = {this.handleAddEmployeeInput}
        value = {this.state.fullName}
         />
         </div>

{/* 
        <input type='hidden' id="employed_by" name="employed_by" value="companyName" /> */}

        <label> Email address </label> {''} <br />
        <div>
        <input 
        type="email"
        required
        placeholder = "name@example.com"
        name = "username"
        onChange= {this.handleAddEmployeeInput} 
        value= {this.state.username}
        />

        <p>Available Roles</p>
        {this.roles.map(role => (
            <div>

            {role}
            <input
                type= "radio"
                name="prefRole"
                value={role}
                checked={this.state.prefRole === role}
                onChange={this.handleRadioRoles}
        />
        </div>
        ))}
       


        <button onClick={this.submitFormToAddEmployee} type="submit" > Add </button> 
        </div>

        </div>
    )
}

}
export default AddEmployeeForm;


// function sendNotification(message) {
//     console.log(`Send email to employee here: ${message}`);
// }

// function loop () {
//     if (activated_user === false) { 
    
//     if (!providedNotification){ 
    
//     sendNotification(`The ISS will pass over in ${minutesFromNow} minutes`); 
    
//     providedNotification = true; 
    
//     } else { 
//     providedNotification = false;
    
//      } 

//     // }).catch(error => {
//     // console.log(error.response.body);
//     // });
    
    
    
    
    
//     }

