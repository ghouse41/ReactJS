import React, { Component } from 'react';
import axios from 'axios';
import './FullPost.css';

class FullPost extends Component {

    state = {
        lodedPost: null
    }

    componentDidMount(){
        // we changed this function name from componentDidUpdate to componentDidMount because now we are not updating,
        // the FullPost component any more. so now FullPost component will be added or removed from dom only because we
        // calling the FullPost component from the Link/Route.
        console.log("[FullPost.js] - ",this.props);
        this.loadPost();
    }

    componentDidUpdate(){
        this.loadPost();
    }

    loadPost(){
        if(this.props.match.params.id){
            if(!this.state.lodedPost || (this.state.lodedPost && this.state.lodedPost.id !== +this.props.match.params.id)){
                axios.get('/posts/'+ this.props.match.params.id)
                .then(response => {
                    console.log(response)
                    this.setState({lodedPost:response.data})
                });
            }
        }
    }

    deletePostHandler = () => {
        axios.delete('/posts/' + this.props.match.params.id)
        .then(response => {
            console.log(response);
        })
    }

    render () {
        let post = <p style={{textAlign:"center"}}>Please select the post!</p>;
        if(this.props.match.params.id){
            post = <p style={{textAlign:"center"}}>Loading..!</p>;
            if(this.state.lodedPost){
                post = (
                    <div className="FullPost">
                        <h1>{this.state.lodedPost.title}</h1>
                        <p>{this.state.lodedPost.body}</p>
                        <div className="Edit">
                            <button className="Delete">Delete</button>
                        </div>
                    </div>
        
                );
            }
        }
        
        
        return post;
    }
}

export default FullPost;