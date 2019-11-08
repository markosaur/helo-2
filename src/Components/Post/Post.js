import React, { Component } from 'react'
import axios from 'axios'



export default class Post extends Component {
    constructor(){
        super()
        this.state = {
            title: '',
            img: '',
            content: '',
            username: '',
            profile_pic: ''
        }
    }

    componentDidMount(){
        const { postid } = this.props.match.params
        axios.get(`/api/post/${postid}`)
            .then((res) => {
                const { title, img, content, username, profile_pic } = res.data[0]
                this.setState({
                    title,
                    img,
                    content,
                    username,
                    profile_pic
                })
            }).catch(err => {
                console.log(err)
            })
    }



    render() {
        const {title, img, content, username, profile_pic} = this.state
        return (
            <div>
                Post
                <p>{title}</p>
                <p>{content}</p>
                <img src = {img} alt = "content picture"/>
                <p>{username}</p>
                <img src = {profile_pic} alt ="picture of user"/>
            </div>
        )
    }
}
