//How to use React Context
//Setting Up Context Provider & define the data I want to store
//2. use a context consumer where ever you need the data from the store
//The newly created AppContext will be used to build a context provider component. This provider will store, in its state, the data we need and it will wrap all of the content of the component:
import react from 'React'
const AppContext= React.createContext();

class AppProvider extends React.Component {
  state= {
    user: ''
    
  }
  render(){
    return <AppContext.Provider value={this.state} >
         {this.props.children}
      </AppContext.Provider>
   
  }
}

