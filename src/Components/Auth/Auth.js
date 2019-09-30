import React, { Component } from 'react'
import axios from 'axios'
import swal from 'sweetalert2'
import {Link} from 'react-router-dom'

class Auth extends Component {
    constructor(){
        super()
        this.state = {
            username: '',
            password: ''
        }
    }

    handleChange(e, key) {
        this.setState({
          [key]: e.target.value
        })
      }
    
      async register() {
        const { username, password } = this.state
        const res = await axios.post('/auth/register', {username, password})
        if(res){
        this.props.updateUser(res.data.user)
        this.props.history.push('/dashboard');
        swal.fire({type: 'success', text: res.data.message})}
        else{
            swal.fire({type: 'error', text: 'Error please try again'})
        }
    
        // axios POST to /auth/register here
      }


    render() {
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
                <Link to= '/dashboard'><button onClick={()=> this.register()}>Register</button></Link>
                <button>Login</button>
            </div>
        )
    }
}

export default Auth
