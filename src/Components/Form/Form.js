import React, { Component } from 'react'
import axios from 'axios'
import {updateUser} from '../../ducks/reducer'
import {connect} from 'react-redux'

class Form extends Component {
    constructor(props){
        super(props)
        this.state = {
            title: '',
            img: '',
            content: '',

        }
    }

    handleChange(e, key) {
        this.setState({
          [key]: e.target.value,
        })
      }

    addPost = () => {
        if(this.props.id){
            const {title, img, content} =this.state
            const send = {title, img, content} 
            axios.post(`/api/post/new/${this.props.id}`, send)
            .then(() => {
                this.props.history.push('/dashboard')
            }).catch((err) => {
                console.log(err)
            })
        }
    }


    render() {
        console.log(this.state)
        return (
            <div>
                Form 
                <input
                    onChange = {e => this.handleChange(e, 'title')}
                    type= "text"
                    placeholder = "Title"  
                />  

                <input
                    onChange = {e => this.handleChange(e, 'img')}
                    type= "text"
                    placeholder = "Image"  
                /> 

                <input
                    onChange = {e => this.handleChange(e, 'content')}
                    type= "text"
                    placeholder = "Content"  
                /> 

                <div>
                    <img src={this.state.img} alt="content"/>  
                </div>
                <button onClick={() => this.addPost()} >Post</button>
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

export default connect(mapStateToProps, {updateUser})(Form)
