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
        // console.log(this.props.user.userId)
        // console.log(res.data.user)
        this.props.history.push('/dashboard');
        swal.fire({type: 'success', text: res.data.message})}
        else{
            swal.fire({type: 'error', text: res.data.message})
        }
        console.log(this.props.username)
      }

      async login() {
          const {username, password} = this.state
          if(username==='' || password === ''){
            return swal.fire({type: 'error', text: 'Please input username and password'})
        }
          const res = await axios.post('/auth/login', {username, password})
          if(res.data.user){
              console.log(res.data.user)
            const {id, username, profile_pic} = res.data.user
            this.props.updateUser(id, username, profile_pic)
            this.props.history.push('/dashboard')
            console.log(this.props.profile_pic)
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

function mapStateToProps(state) {
    return {
        id: state.id,
        username: state.username,
        profile_pic: state.profile_pic
}
};

export default connect(mapStateToProps, {updateUser})(Auth)

