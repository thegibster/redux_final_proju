import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Link  } from 'react-router-dom';
import Categories from './components/Categories';
import Posts from './components/Posts';
import Post from './components/Post';
import Category_Posts from './components/Category_Posts';
import * as fetchCategories from './utils/index';
import  allReducers from './reducers/';
import logo from './logo.svg';
import './App.css';

class App extends Component {
    // state = {
    //     categories:[],
    // }



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
            <header className="App-header">
              <img src={logo} className="App-logo" alt="logo" />
              <h1 className="App-title">Welcome to React</h1>
            </header>
            <p className="App-intro">
              To get started first, edit <code>src/App.js</code> and save to reload.
            </p>
          </div>
          <Route exact path="/" render={() => (
              <div className="categories">
                 <Categories />

              </div>
          )}></Route>
          <Route exact path="/posts" render={() => (
              <div className="categories">
                  <Posts />

              </div>
          )}></Route>
          {/*<Route exact path="/posts/:id" render={() => (*/}
              {/*<div className="post">*/}
                  {/*<Post />*/}

              {/*</div>*/}
          {/*)}></Route>*/}
          {/*<Route exact path="/posts/" component={Post} />*/}
          <Route exact path="/posts/:id" component={Post} />
      </div>
    );
  }
}

// function mapStateToProps(categories) {
//     return categories;
// }
//
// export default connect(mapStateToProps)(App);


export default App;
