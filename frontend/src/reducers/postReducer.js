import  { CREATE_POST }  from '../actions/post_actions';
import  { GET_POSTS }  from '../actions/post_actions';


const initialState = {
    posts:[]
};

export default function (state=initialState,action) {

    // const { } = action;
    const { id,timestamp,title,body,author,category,voteScore,deleted } = action;
    switch(action.type){


        case CREATE_POST:
            // return state.filter(category => category.name !== action.name);
            return {
                // ...state,

                    // ...state.posts,
                    // {id,
                    //     parentId,
                    //     title,
                    //     author,
                    //     body}

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

        default:
            return state;
    }}
