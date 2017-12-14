import * as PostsAPIUtil from '../utils/posts_utils';

import {
    CREATE_POST,
    GET_POSTS,
    GET_POST,
    EDIT_POST,
    DELETE_POST,
    INCREMENT_VOTE_SCORE,
    DECREMENT_VOTE_SCORE,
    SORT_POSTS,
    EDIT_POST_COMMENT ,
    INCREASE_POSTS_COMMENT_COUNT,
    DECREASE_POSTS_COMMENT_COUNT
} from '../constants'

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

export const deletePost = posts => {
    return {
        type: DELETE_POST,
        posts
    };
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
            .create_post(new_post)
            // .then(() => fetchPosts())
            .then((posts) => (posts))

}


