import React,{ Component } from 'react';
import axios from '../../../axios';
import { Route } from 'react-router-dom';
import Post from '../../../components/Post/Post';
import FullPost from '../FullPost/FullPost';
import './Posts.css';
class Posts extends Component {
    state = {
        posts:[],
        // selectedPostId:null,
        // error:false
    }

    selectPostHandler = (id) =>{
        this.props.history.push({pathname: '/posts/' + id})
        //this.props.history.push('/' + id)
    }

    componentDidMount(){
        console.log(this.props)
        axios.get('/posts')
        .then((Response) =>{
            const posts = Response.data.slice(0,4);
            const updatedPosts = posts.map(post => {
                return {
                    ...post,
                    author : 'Max'
                }
            })
            this.setState({posts:updatedPosts});
           //console.log(Response);
        }).catch(error => {
          //this.setState({error:true})
        })
      }

    render (){
        let posts = <p>something went wrong</p>
        if (!this.state.error) {
            posts = this.state.posts.map(post =>{
                return (//<Link to={'/' + post.id} key={post.id}> {/* Here we used Link instead of NavLink because we dont want to style the links 
               // We wrapped Post component in Link component because to get the dynamic argument passed to the Link/Route */}
                            <Post
                            key={post.id}                                                          
                            title={post.title} 
                            author={post.author}
                            clicked={() => this.selectPostHandler(post.id)}/>
                        //</Link>
                        ) // Here we used curly braces () because we can split the code to read easily.
            })
        }

       return (
           <div>
                <section className="Posts">
                    {posts}
                </section>
               <Route path={this.props.match.url + "/:id"} exact component={FullPost} />
           </div>
        
       ); 
    }
}

export default Posts;