import { CREATE_COMMENT } from '../actions/comments_actions';

const initialState = {
    comments:[]
};

export default function (state=initialState,action) {

    const { comments } = action;
    // const  deepcategories = action.categories;
    // console.log("why not", action)
    // const {categories} = action;

    switch(action.type){

        case "DELETE_COMMENT":
            return state.filter(category => category.name !== action.name);
        case CREATE_COMMENT:
            console.log("CREATE_COMMENT was called",action.comments, state);

            // return Object.assign({}, state, {
            //     categories: action.categories
            // })
            console.log('this is how it look', state.comments)
            return {
                ...state,
               comments: [...action.comments]
            }


        default:
            return state;
    }}
