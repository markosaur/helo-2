import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import axios from 'axios'
import swal from 'sweetalert2';


class Nav extends Component {
    logout = async () =>{
        const res = await axios.delete('/auth/logout')
        this.props.updateUser(null)
        swal.fire(res.data.message)
    }



    render() {

        return (
            <div>
                Nav
                <Link to='/dashboard'><button>Home</button></Link>
                <Link to='/post/:postid'><button>New Post</button></Link>
                <Link to='/'><button>Logout</button></Link>
            </div>
        )
    }
}

export default Nav