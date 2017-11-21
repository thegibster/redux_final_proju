import { combineReducers } from 'redux';
import CategoryReducer from './categoryReducer';
import PostReducer from './postReducer';
import CommentsReducer from './commentsReducer';



const allReducers = combineReducers({
    categories: CategoryReducer,
    posts: PostReducer,
    comments: CommentsReducer
});

export default allReducers;
