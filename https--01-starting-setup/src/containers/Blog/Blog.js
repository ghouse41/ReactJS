import React, { Component } from 'react';
import Posts from './Posts/Posts';
import { Route,NavLink,Switch,Redirect } from 'react-router-dom';

// import NewPost from './NewPost/NewPost';
//import FullPost from './FullPost/FullPost';
import './Blog.css';
import asyncComponent from '../../hoc/asyncComponent';

const AsyncNewPost = asyncComponent(() => {
    return import('./NewPost/NewPost');
} );

class Blog extends Component {
    state ={
        auth:true
    }

    render () {
        return (
            <div className="Blog">
                <header>
                    <nav>
                        <ul>
                            <li><NavLink 
                            to="/posts" 
                            exact
                            activeClassName="my-active"//we can mention our active class name also apply styles
                            activeStyle={{
                                color:  '#fa923f',
                                textDecoration:'underline'
                            }}
                            >Posts</NavLink></li>
                            <li><NavLink to={{
                                pathname:'/new-post',
                                hash:'#submit',
                                search:'?quick-submit=true'
                            }}>New Post</NavLink></li>
                        </ul>

                    </nav>
                </header>
                
                {/*<Route path="/" render={() => <h1>Home</h1>}/>*/}
                <Switch> {/* Switch is used to route only one at a time if exact route matches,so it won't analyze remainig routes if it founds route match*/}
                    {this.state.auth ? <Route path="/new-post"  component={AsyncNewPost} /> :null } 
                    <Route path="/posts"  component={Posts} /> 
                    <Route render={()=> <h1> Not Found</h1>}/>
                    {/* <Redirect from="/" to="/posts" />                    */}
                    
                    
                </Switch>

                {/* 
                Without switch also we can fix the problem by adding a uniqe stirng to route.
                path = "/posts/:id"
                    <Route path="/" exact component={Posts} />                                  
                    <Route path="/new-post/"  component={NewPost} />
                    <Route path="/posts/:id" exact component={FullPost} />

                and in Posts.js file Link also be changed <Link to="/posts/" + post.id></Link>
                */}
                
            </div>
        );
    }
}

export default Blog;