import React, { Component } from 'react'
import axios from 'axios'
import {updateUser} from '../../ducks/reducer'
import {connect} from 'react-redux'

import swal from 'sweetalert2'

class Auth extends Component {
    constructor(props){
        super(props)
        this.state = {
            username: '',
            password: '',
        }
    }

    handleChange(e, key) {
        this.setState({
          [key]: e.target.value
        })
      }
    
      async register() {
        const { username, password} = this.state
        console.log(username, password)
        if(username==='' || password === ''){
            return swal.fire({type: 'error', text: 'Please complete registration form'})
        }
        const res = await axios.post('/auth/register', {username, password})
        if(res.data.user){
        const {id, username, profile_pic} = res.data.user
        this.props.updateUser(id, username, profile_pic)
        console.log(id, username, profile_pic)
        // console.log(res.data.user)
        this.props.history.push('/dashboard');
        swal.fire({type: 'success', text: res.data.message})}
        else{
            swal.fire({type: 'error', text: res.data.message})
        }
      }

      async login() {
          const {username, password} = this.state
          if(username==='' || password === ''){
            return swal.fire({type: 'error', text: 'Please input username and password'})
        }
          const res = await axios.post('/auth/login', {username, password})
          if(res.data.user){
              this.props.updateUser(res.data.user)
              this.props.history.push('/dashboard')
              console.log(this.props.history)
          }else{
              swal.fire({type: 'error', text: res.data.message})
          }

      }


    render() {
        console.log(this.state)
        return (
            <div>
                Auth
                <input 
                    onChange = {e => this.handleChange(e, 'username')}
                    type= "text"
                    placeholder = "username"
                />
                <input
                    onChange = {e => this.handleChange(e, 'password')}
                    type = "password"
                    placeholder = "Password"
                />
                <button onClick={()=> this.register()}>Register</button>
                <button onClick={()=> this.login()}>Login</button>
            </div>
        )
    }
}

export default connect(null, {updateUser})(Auth)

