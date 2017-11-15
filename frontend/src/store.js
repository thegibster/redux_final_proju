import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk';
import allReducers from './reducers';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const logger = store => next => action => {
    console.group(action.type)
    console.info('dispatching', action)
    let result = next(action)
    console.log('next state', store.getState())
    console.groupEnd(action.type)
    return result
}

const store = createStore(
    allReducers,
    // {categories:[]},
    composeEnhancers(
        applyMiddleware(logger),
        applyMiddleware(thunk)
    )
);


// const store = () => createStore(rootReducer, applyMiddleware(thunk));

export default store;
