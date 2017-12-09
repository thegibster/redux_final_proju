import  {
    GET_POST,
    GET_POSTS,
    CREATE_POST,
    SORT_POSTS,
    EDIT_POST,
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
        case EDIT_POST:
            console.log('EDIT POST LOG message',state.posts.filter((post) => post.id !== action.posts.id));
            return {
                ...state,
                posts: [
                    ...state.posts.filter((post) => post.id !== action.posts.id),
                    {...action.posts}
                ]
            };
        case GET_POST:
            console.log(action.posts,'mokey power')

            return {
                ...state,
                posts: [...state.posts,  {
                    id:action.posts.id,
                    timestamp:action.posts.timestamp,
                    title:action.posts.title,
                    body:action.posts.body,
                    author:action.posts.author,
                    category:action.posts.ca,
                    voteScore:action.posts.voteScore,
                    deleted:action.posts.deleted
                }
                ]
            };
        case SORT_POSTS:
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
