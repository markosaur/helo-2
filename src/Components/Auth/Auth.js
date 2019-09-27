import React, { Component } from 'react'

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
                <button>Register</button>
                <button>Login</button>
            </div>
        )
    }
}

export default Auth
