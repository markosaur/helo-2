import React, { Component } from 'react'
import axios from 'axios'
import {updateUser} from '../../ducks/reducer'
import {connect} from 'react-redux'
import './dashboard.css'

class Dashboard extends Component {
    constructor(props){
        super(props)
        this.state = {
            search: '',
            posts: [],
            myPosts: true,
            isSearch: false
        }
        // this.getPosts = this.getPosts.bind(this)
    }

componentDidMount(){
    console.log('attempting to mounts')
    this.getPosts(this.props.id)
}

getPosts=(userId)=>{
    const {myPosts, search} =this.state
    axios.get(`/api/posts/${userId}?myPosts=${myPosts}&search=${search}`)
    .then((response) => {
        this.setState({
            posts: response.data
        })
    }).catch((err) => {
        console.log(err)
    })
    // if(this.state.myPosts === true && this.state.isSearch === false){
    //     axios.get(`/api/myposts/${this.props.id}`).then((response)=>{
    //         console.log(response)
    //         this.setState({
    //             posts: response.data
    //         })
    //     })

    // } else if(this.state.myPosts === true && this.state.isSearch === true){

    // }

}

resetSearch = (userId) =>{
    const {myPosts} = this.state
    axios.get(`/api/posts/${userId}?myPosts=${myPosts}`)
    .then((response) => {
        this.setState({
            posts: response.data,
            search: ''
        })
    }).catch((err)=>{
        console.log(err)
    })
}

    handleChange(e, key) {
        this.setState({
          [key]: e.target.value,
          isSearch: !this.state.isSearch
        })
      }

    toggle=()=>{
        this.setState({
            myPosts: !this.state.myPosts
        })
    }

    render() {
        const mappedPosts = this.state.posts.map((post, i)=>{
            return(
                <div className = "mapped">
                    <img src={post.profile_pic} alt="profile pic"/>
                    <p>{post.username}</p>
                    <p>{post.title}</p>
                    <img src={post.img} alt="post pic"/>
                    <p>{post.content}</p>
                </div>
            )
        })
        console.log(this.state)
        return (
            <div>
                Dashboard
                
                <div>
                    <input
                    onChange = {e => this.handleChange(e, 'search')}
                    type= "text"
                    placeholder = "search" 
                    value = {this.state.search} 
                    />
                    <input
                    type = "checkbox"
                    checked = {this.state.myPosts}
                    onClick = {() => this.toggle()}
                    />
                </div>

                <button onClick = {()=> this.getPosts(this.props.id)}>Search</button>
                <button onClick={() => this.resetSearch(this.props.id)}>Reset</button>

                {mappedPosts}

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
