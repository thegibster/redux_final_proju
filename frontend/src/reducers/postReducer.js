import  {
    GET_POST,
    GET_POSTS,
    CREATE_POST,
    INCREMENT_VOTE_SCORE,
    DECREMENT_VOTE_SCORE
}  from '../actions/post_actions';


const initialState = {
    posts:[]
};

export default function (state=initialState,action) {


    const { id,timestamp,title,body,author,category,voteScore,deleted } = action;
    switch(action.type){


        case CREATE_POST:
            // return state.filter(category => category.name !== action.name);
            return {

            ...state,
            posts: [...state.posts,  {
                    id,
                    timestamp,
                    title,
                    body,
                    author,
                    category,
                    voteScore,
                    deleted
                }
            ]

            };
        case GET_POSTS:
            return {
                ...state,
                posts: [...action.posts]
            };

        case GET_POST:
            return {
                ...state,
                posts: [...action.posts]
            };

        case INCREMENT_VOTE_SCORE:
            return {

            };

        case DECREMENT_VOTE_SCORE:
            return {

            };

        default:
            return state;
    }}
