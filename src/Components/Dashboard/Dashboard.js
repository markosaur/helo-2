import React, { Component } from 'react'
import axios from 'axios'
import {updateUser} from '../../ducks/reducer'
import {connect} from 'react-redux'

class Dashboard extends Component {
    constructor(props){
        super(props)
        this.state = {
            search: ''

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
                Dashboard
                <div>
                    <input
                    onChange = {e => this.handleChange(e, 'search')}
                    type= "text"
                    placeholder = "search"
                    />
                </div>
                <button>Search</button>
                <button>Reset</button>
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

export default connect(mapStateToProps, {updateUser})(Dashboard)
