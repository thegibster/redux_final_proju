import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Link , Switch , withRouter} from 'react-router-dom';
import Categories from './components/Categories';
import CategoryView from './components/CategoryView';
import Posts from './components/Posts';
import Post from './components/Post';
import New_Post from './components/New_Post';
import EditPost from './components/EditPost';
import EditComment from './components/EditComment';
import NoMatch from './components/NoMatch';
import Home from './components/Home';
import './App.css';
import { fetchPosts }  from './actions/post_actions';
import { fetchCategories }  from './actions/categories_action';
import PropTypes from 'prop-types';

class App extends Component {

    componentDidMount() {
        this.props.dispatch(fetchPosts()());
        this.props.dispatch(fetchCategories()());
    }

    render() {
        return (
            <div className="App">
                <div>
                    <nav className="navbar navbar-toggleable-md navbar-light bg-faded">

                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav mr-auto">
                                <li className="nav-item active">
                                    <Link className="nav-item" to="/">Home</Link>
                                </li>

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
                                            this.props.categories.categories.map((item) => <Link key={item.name} className="dropdown-item" to={`/${item.name}/`}>{item.name}</Link>)
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
                    <Route  path='/categories' exact component={Categories}/>
                    <Route  path='/posts' exact component={Posts}/>
                    <Route  path="/posts/new" exact component={New_Post} />
                    <Route  path='/:category([a-z]{5})' exact component={CategoryView}/>
                    <Route  path="/:category/:id"  exact component={Post} />
                    <Route  path="/:category([a-z]{5})/:id/edit"  exact component={EditPost} />
                    <Route  path="/posts/:id/edit"  exact component={EditPost} />
                    <Route  path="/comments/:id/edit"  exact component={EditComment} />
                    <Route component={NoMatch}/>
                </Switch>

            </div>
        );
    }
}


App.propTypes = {
    location: PropTypes.object,
    dispatch: PropTypes.func,
    categories: PropTypes.objectOf(PropTypes.array),
    comments: PropTypes.objectOf(PropTypes.array),
    posts: PropTypes.objectOf(PropTypes.array)
};

function mapStateToProps(state) {
    return state;
}
export default withRouter(connect(mapStateToProps)(App));
