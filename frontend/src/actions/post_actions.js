import * as PostsAPIUtil from '../utils/posts_utils';

export const CREATE_POST = 'CREATE_POST';
export const GET_POSTS = 'GET_POSTS';
export const GET_POST = 'GET_POST';
export const EDIT_POST = 'EDIT_POST';
export const DELETE_POST = 'DELETE_POST';
export  const INCREMENT_VOTE_SCORE = 'INCREMENT_VOTE_SCORE';
export  const DECREMENT_VOTE_SCORE = 'DECREMENT_VOTE_SCORE';
export const SORT_POSTS = 'SORT_POSTS';
export const EDIT_POST_COMMENT = 'EDIT_POST_COMMENT';
export const INCREASE_POSTS_COMMENT_COUNT = 'INCREASE_POSTS_COMMENT_COUNT';
export const DECREASE_POSTS_COMMENT_COUNT = 'DECREASE_POSTS_COMMENT_COUNT';

export const postCreator = ({new_post}) => {
    return {
        type: CREATE_POST,
        id:new_post.id,
        timestamp:new_post.timestamp,
        title:new_post.title,
        body:new_post.body,
        author:new_post.author,
        category:new_post.category,
        voteScore:new_post.voteScore,
        deleted:new_post.deleted

    }
}

export const postUpscore = posts => {
    return {
        type: INCREMENT_VOTE_SCORE,
        posts
    };
}
export const postDownscore = posts => {
    return {
        type: DECREMENT_VOTE_SCORE,
        posts
    };
}

export const postsLoad = posts => {
    console.log('posts loads action fired',posts)
    return {
        type: GET_POSTS,
        posts
    }
}

export const postLoad = posts => {
    console.log('post loads action fired',posts)
    return {
        type: GET_POST,
        posts
    }
}

export const editedPostLoad = posts => {
    console.log('post loads action fired',posts)
    return {
        type: EDIT_POST,
        posts
    }
}

export const increasePostCommentCount = posts => {
    return {
        type: INCREASE_POSTS_COMMENT_COUNT,
        posts
    }
}

export const decreasePostCommentCount = posts => {
    return {
        type: DECREASE_POSTS_COMMENT_COUNT,
        posts
    }
}

// export const editedPostComment = posts => {
//     console.log('post edit comment loads action fired',posts)
//     return {
//         type: EDIT_POST_COMMENT,
//         posts
//     }
// }

export const sortPosts = posts => {
    console.log('sort post loads action fired',posts)
    return {
        type: SORT_POSTS,
        posts
    }
}

export const fetchPostByID = ({id}) => dispatch => {
    return function action(dispatch) {
        return PostsAPIUtil
            .fetch_posts_byID(id)
            .then(post => {console.log("single post",post);dispatch(postLoad(post))});
    }
}

export const fetchPosts = () => dispatch => {
    return function action(dispatch) {
        return PostsAPIUtil
            .fetch_posts()
            .then(posts => {console.log("baby posts",posts);dispatch(postsLoad(posts))});
            // .then((posts) => (postsLoad(posts)))

    }
}

export const postNewPost = new_post => {
    console.log(new_post, 'postnew port from aciton file');

        return PostsAPIUtil
            .post_a_post(new_post)
            // .then(() => fetchPosts())
            .then((posts) => (posts))

}

// export const postNewPost = (new_post) => dispatch => {
//     console.log(new_post, 'postnew port from aciton file');
//
//     return PostsAPIUtil
//         .post_a_post(new_post)
//         .then(() => fetchPosts())
//         .then((posts) => dispatch(postsLoad(posts)))
//
// }

// export const incrementPost = ({id}) => dispatch => {
//
//
//     return PostsAPIUtil
//         .post_a_post(new_post)
//     // .then(posts => {console.log("post new post action",posts);dispatch(postsLoad(posts))});
//
// }
// export const decrementPost = ({id}) => dispatch => {
//
//
//     return PostsAPIUtil
//         .post_a_post(new_post)
//     // .then(posts => {console.log("post new post action",posts);dispatch(postsLoad(posts))});
//
// }

