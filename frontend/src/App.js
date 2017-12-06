import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Link , Switch , withRouter} from 'react-router-dom';
import Categories from './components/Categories';
import Category_View from './components/Category_View';
import Posts from './components/Posts';
import Post from './components/Post';
import New_Post from './components/New_Post';
import Edit_Post from './components/Edit_Post';
import Edit_Comment from './components/Edit_Comment';
import NoMatch from './components/NoMatch';
import Home from './components/Home';
// import { Categories, Posts, Post, Category_Posts, NoMatch} from './components/';
import Category_Posts from './components/Category_Posts';
// import * as fetchCategories from './utils/index';
import  allReducers from './reducers/';
import logo from './logo.svg';
import './App.css';
import { fetchPosts,fetchPostByID }  from './actions/post_actions';
import { fetchCategories }  from './actions/categories_action';

class App extends Component {
    // state = {
    //     categories:[],
    // }
    componentDidMount() {
        this.props.dispatch(fetchPosts()());
        this.props.dispatch(fetchCategories()());
    }


    // state = {
    //     categories : this.props.categories
    // }

    // componentDidMount() {
    //     fetchCategories.fetchCategories().then((categories) => {
    //         console.log(categories)
    //         this.setState({
    //            categories: categories.categories
    //         });
    //
    //         // console.log(allReducers(this.state.categories,{ type: 'DELETE_POST', name: 'react' }))
    //     });
    // }
  render() {
    console.log("connected app",this.props)

    return (
      <div className="App">
          <div>
              <nav className="navbar navbar-toggleable-md navbar-light bg-faded">

                  <div className="collapse navbar-collapse" id="navbarSupportedContent">
                      <ul className="navbar-nav mr-auto">
                          <li className="nav-item active">
                              {/*<a className="nav-link" href="#">Home <span class="sr-only">(current)</span></a>*/}
                              <Link className="nav-item" to="/">Home</Link>
                          </li>
                          {/*<li className="nav-item">*/}
                              {/*<Link className="nav-item" to="/categories">Categories</Link>*/}
                          {/*</li>*/}
                          <li className="nav-item">
                              <Link className="nav-item" to="/posts">Posts</Link>
                          </li>
                          <li className="nav-item dropdown">
                              <a className="nav-link dropdown-toggle" href="" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                  Categories
                              </a>
                              <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                                  <Link className="dropdown-item" to="/categories">All Categories</Link>
                                  {
                                      this.props.categories.categories.map((item) => <Link key={item.name} className="dropdown-item" to={`/category/${item.name}`}>{item.name}</Link>)
                                  }

                              </div>
                          </li>
                          <li className="nav-item">
                              <Link className="nav-item" to="/posts/new">+ Add New Post</Link>
                          </li>

                      </ul>

                  </div>
              </nav>
          </div>
          <Switch>
              <Route  path='/' exact component={Home}/>
              <Route  path='/category/:id' exact component={Category_View}/>
              <Route  path='/categories' exact component={Categories}/>
              <Route  path='/posts' exact component={Posts}/>
              <Route  path="/posts/new" exact component={New_Post} />
              <Route  path="/posts/:id"  exact component={Post} />
              <Route  path="/posts/:id/edit"  exact component={Edit_Post} />
              <Route  path="/comments/:id/edit"  exact component={Edit_Comment} />
              <Route component={NoMatch}/>
          </Switch>

      </div>
    );
  }
}

// function mapStateToProps(categories) {
//     return categories;
// }

function mapStateToProps(state) {
    return state;
}
export default withRouter(connect(mapStateToProps)(App));


// export default App;
