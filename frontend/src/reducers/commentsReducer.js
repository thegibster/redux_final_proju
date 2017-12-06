import { CREATE_COMMENT,GET_COMMENTS,GET_COMMENT,DELETE_COMMENT } from '../actions/comments_actions';

const initialState = {
    comments:[]
};

export default function (state=initialState,action) {

    const { id,timestamp,parentId,body,author,voteScore,parentDeleted } = action;
    // const  deepcategories = action.categories;
    // console.log("why not", action)
    // const {categories} = action;

    switch(action.type){

        case DELETE_COMMENT:
            return state.filter(category => category.name !== action.name);
        case CREATE_COMMENT:
            console.log("CREATE_COMMENT was called",action, state);

            // return Object.assign({}, state, {
            //     categories: action.categories
            // })
            console.log('this is how it look', state.comments)
            return {
                ...state,
                comments: [...state.comments,  {
                    id,
                    timestamp,
                    body,
                    author,
                    voteScore,
                    parentId,
                    parentDeleted
                }
                ]
            }

        case GET_COMMENTS:
            return {
                ...state,
                comments: [...action.comments]
            };
        case GET_COMMENT:
            return {
                ...state,
                comments: [...action.comments]
            };
        default:
            return state;
    }
}
