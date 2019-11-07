import React, { Component } from 'react'
import axios from 'axios'
import {updateUser} from '../../ducks/reducer'
import {connect} from 'react-redux'

class Dashboard extends Component {
    constructor(props){
        super(props)
        this.state = {
            search: '',
            posts: [],
            myPosts: true,
            isSearch: false
        }
        this.getPosts = this.getPosts.bind(this)
    }

componentDidMount(){
    console.log('attempting to mount')
    this.getPosts()
}

getPosts(){
    if(this.state.myPosts === true && this.state.isSearch === false){
        axios.get(`/api/myposts/${this.props.id}`).then((response)=>{
            console.log(response)
            this.setState({
                posts: response.data
            })
        })
        //need some logic and backend to get all my individual posts need to do a get for one person based on their id
    }
    //if myposts === true and is search === true{ do a get with a search according to all these words}
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
                <div>
                    <img src={post.profile_pic} alt="profile pic"/>
                    <p>{post.username}</p>
                    <p>{post.title}</p>
                    <img src={post.img} alt="post pic"/>
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
                    />
                    <input
                    type = "checkbox"
                    checked = {this.state.myPosts}
                    onClick = {() => this.toggle()}
                    />
                </div>

                <button>Search</button>
                <button>Reset</button>

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
