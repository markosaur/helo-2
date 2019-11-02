import React, {Component} from 'react';
import './App.css';
// import Auth from './Components/Auth/Auth'
// import Dashboard from './Components/Dashboard/Dashboard'
// import Form from './Components/Form/Form'
// import Post from './Components/Post/Post'
import Nav from './Components/Nav/Nav'
import routes from './routes'
import {withRouter} from 'react-router-dom'

// look at button ternary in sim 2, if this.props.location is '/' then null not <Nav/> if not then render <Nav/>

class App extends Component { 
  constructor(props){
    super(props)
  }
  // console.log(props)
  render(){

    const navigation = this.props.location.pathname
    let comp;

    if(navigation==='/'){
      comp = null
    } else {
      comp = <Nav/>
    }

    // if(this.props.location.pathname==='/'){
    //   navigation = null
    // } else{
    //   navigation
    // }
    

  return (
    <div className="App">
      {comp}
      {routes}
    </div>
  );
}
}
export default withRouter(App);
