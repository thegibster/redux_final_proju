import * as PostsAPIUtil from '../utils/posts_utils';

export const CREATE_POST = 'CREATE_POST';
export const GET_POSTS = 'GET_POSTS';
export const GET_POST = 'GET_POST';

export const postCreator = ({id,timestamp,title,body,author,category,voteScore,deleted}) => {
    return {
        type: CREATE_POST,
        id,
        timestamp,
        title,
        body,
        author,
        category,
        voteScore,
        deleted

    }
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
    }
}
