import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import axios from 'axios'
import swal from 'sweetalert2';
import {updateUser} from '../../ducks/reducer'
import {connect} from 'react-redux'


class Nav extends Component {
    constructor(){
        super()
        this.state = {
            id: null,
            username: '',
            profile_pic: ''
        }
    }

    async logout() {
        const res = await axios.delete('/auth/logout')
        const {id, username, profile_pic} = this.state
        this.props.updateUser(id, username, profile_pic)
        console.log(username)
        // this.props.history.push('/')        
        swal.fire({type: 'success', text: res.data.message})

    }

    render() {

        return (
            <div>
                Nav
                <Link to='/dashboard'><button>Home</button></Link>
                <Link to='/post/:postid'><button>New Post</button></Link>
                <Link to='/'>
                    <button onClick={() => this.logout()}>Logout</button>
                </Link>
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

export default connect(mapStateToProps, {updateUser})(Nav)