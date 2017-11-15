import  { CREATE_POST }  from '../actions/post_actions';


const initialState = {
    posts:[]
};

export default function (state=initialState,action) {

    // const { } = action;
    const { id,parentId,title,body,author } = action;
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
            posts: [...state.posts,  {id,
            parentId,
            title,
            author,
            body}]

            };

        default:
            return state;
    }}
