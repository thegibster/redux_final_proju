import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
// import { createStore, applyMiddleware, compose } from 'redux'
// import { createStore } from 'redux';
import { postCreator }  from './actions/post_actions';
import { fetchCategories }  from './actions/categories_action';
import { fetchPosts,fetchPostByID }  from './actions/post_actions';
import store from './store';
import { Provider } from 'react-redux';
// import thunk from 'redux-thunk';
import registerServiceWorker from './registerServiceWorker';

// const logger = store => next => action => {
//     console.group(action.type)
//     console.info('dispatching', action)
//     let result = next(action)
//     console.log('next state', store.getState())
//     console.groupEnd(action.type)
//     return result
// }

// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;


// const store = createStore(
//     allReducers,
//     composeEnhancers(
//         applyMiddleware(logger)
//     )
// );

console.log(store);
console.log(store.getState());
// store.dispatch(postCreator({id:1,timestamp:Date.now(),title:'mars',body:'tasty treat',author:'miles davis',category:'react-redux',voteScore:0,deleted:false}));
store.dispatch(fetchCategories()());
console.log(store.getState());
store.dispatch(fetchPostByID({id:"8xf0y6ziyjabvozdd253nd"})());
store.dispatch(fetchPosts()());
console.log(store.getState());


ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
           <App />
     </BrowserRouter>
    </Provider>,
    document.getElementById('root'));

registerServiceWorker();
