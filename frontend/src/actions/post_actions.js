import * as PostsAPIUtil from '../utils/posts_utils';

import {
    GET_POSTS,
    GET_POST,
    EDIT_POST,
    DELETE_POST,
    INCREMENT_VOTE_SCORE,
    DECREMENT_VOTE_SCORE,
    INCREASE_POSTS_COMMENT_COUNT,
    DECREASE_POSTS_COMMENT_COUNT
} from '../constants'


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
};

export const postsLoad = posts => {
    return {
        type: GET_POSTS,
        posts
    }
};

export const postLoad = posts => {
    return {
        type: GET_POST,
        posts
    }
};

export const editedPostLoad = posts => {
    return {
        type: EDIT_POST,
        posts
    }
};

export const increasePostCommentCount = posts => {
    return {
        type: INCREASE_POSTS_COMMENT_COUNT,
        posts
    }
};

export const decreasePostCommentCount = posts => {
    return {
        type: DECREASE_POSTS_COMMENT_COUNT,
        posts
    }
};

export const fetchPosts = () => dispatch => {
    return function action(dispatch) {
        return PostsAPIUtil
            .fetch_posts()
            .then(posts => {dispatch(postsLoad(posts))});

    }
};

export const postNewPost = new_post => {
        return PostsAPIUtil
            .create_post(new_post)
            .then((posts) => (posts))
};


