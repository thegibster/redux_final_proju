import { combineReducers } from 'redux';
import CategoryReducer from './categoryReducer';
import PostReducer from './postReducer';



const allReducers = combineReducers({
    categories:CategoryReducer,
    posts: PostReducer
});

export default allReducers;
