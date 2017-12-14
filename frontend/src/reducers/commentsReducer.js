import { CREATE_COMMENT,
    GET_COMMENTS,
    GET_COMMENT,
    EDIT_COMMENT,
    DELETE_COMMENT,
    INCREMENT_COMMENT_VOTE_SCORE,
    DECREMENT_COMMENT_VOTE_SCORE} from '../constants';

const initialState = {
    comments:[]
};

export default function (state=initialState,action) {

    const { id,timestamp,parentId,body,author,voteScore,parentDeleted } = action;

    switch(action.type){

        case DELETE_COMMENT:
            return {
                ...state,
                comments: [
                    ...state.comments.filter((comment) => comment.id !== action.comments.id)
                ]
            };
        case CREATE_COMMENT:
            return {
                ...state,
                // posts : [...state.posts.map(newerState)],
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
            };
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
        case EDIT_COMMENT:
            const comments = state.comments.filter(comment => comment.id !== action.comments.id).concat(action.comments);
            return {
                comments
            };

        case INCREMENT_COMMENT_VOTE_SCORE :
            const newerVUState = (comment) => {
                if(comment.id === action.comments.id) {
                    return {...comment, voteScore: comment.voteScore + 1};
                }else{
                    return comment;
                }
            }
            return{
                ...state,
                comments : [...state.comments.map(newerVUState)],
            };
        case DECREMENT_COMMENT_VOTE_SCORE:
            const newerVDState = (comment) => {
                if(comment.id === action.comments.id) {
                    return {...comment, voteScore: comment.voteScore - 1};
                }else{
                    return comment;
                }
            }
            return{
                ...state,
                comments : [...state.comments.map(newerVDState)],
            };
        default:
            return state;
    }
}
