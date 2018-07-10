import React from 'react'; 
import Select from './Select'
import AddEmployeeForm from './AddEmployeeForm';

class AdminConsole extends React.Component{
  constructor(props){
    super(props);

    this.features = ['All Employees', 'Add Employee', 'Contracts', 'Add Contract' ]
    //select options 

    this.state = {
    toDoCurrentFeature: ''
    }
  }

  componentDidMount(){
    console.log("hey " + this.props.user.employed_by)
  }

  handleFeaturesSelect = e => {
    this.setState({
      toDoCurrentFeature: e.target.value
    })
  }

    render(){
      const {toDoCurrentFeature} = this.state;
      console.log(toDoCurrentFeature);

      return(
        <div>
          <p>
            <Select
            values={this.features}
            selectedValue={toDoCurrentFeature}
            handleSelect={this.handleFeaturesSelect}
            />
          </p>
          {toDoCurrentFeature === "Add Employee" ? <AddEmployeeForm user={this.props.user} /> : <span></span>}
    
        </div>
      )
    }
  
}

export default AdminConsole;



