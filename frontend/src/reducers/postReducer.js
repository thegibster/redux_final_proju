import  {
    GET_POST,
    GET_POSTS,
    CREATE_POST,
    SORT_POSTS,
    EDIT_POST,
    INCREMENT_VOTE_SCORE,
    DECREMENT_VOTE_SCORE,
    DELETE_POST,
    INCREASE_POSTS_COMMENT_COUNT,
    DECREASE_POSTS_COMMENT_COUNT
}  from '../constants';


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
            const posts = state.posts.filter(post => post.id !== action.posts.id).concat(action.posts);
            return {
                posts
            };
        case GET_POST:
            return {
                ...state,
                posts: [...state.posts,  {
                    id:action.posts.id,
                    timestamp:action.posts.timestamp,
                    title:action.posts.title,
                    body:action.posts.body,
                    author:action.posts.author,
                    category:action.posts.category,
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
            const newerVUState = (post) => {
                if(post.id === action.posts.id) {
                    return {...post, voteScore: post.voteScore + 1};
                }else{
                    return post;
                }
            }
            return{
                ...state,
                posts : [...state.posts.map(newerVUState)],
            };

        case DECREMENT_VOTE_SCORE:
            const newerVDState = (post) => {
                if(post.id === action.posts.id) {
                    return  {...post, voteScore: post.voteScore - 1};
                }else{
                    return post;
                }
            }
            return{
                ...state,
                posts : [...state.posts.map(newerVDState)],
            };

        case INCREASE_POSTS_COMMENT_COUNT:
            const newerState = (post) => {
                if(post.id === action.posts.parentId) {
                    return {...post, commentCount: post.commentCount + 1};
                }else{
                    return post;
                }
            }
            return{
                ...state,
                posts : [...state.posts.map(newerState)],
            };

        case DECREASE_POSTS_COMMENT_COUNT:
            const newerDState = (post) => {
                if(post.id === action.posts.parentId) {
                    return {...post, commentCount: post.commentCount - 1};
                }else{
                    return post;
                }
            }
            return{
                ...state,
                posts : [...state.posts.map(newerDState)],
            };

        case DELETE_POST:

            return{
                ...state,
                posts : [...state.posts.filter((post) => post.id !== action.posts.id)],
            };

        default:
            return state;
    }}
