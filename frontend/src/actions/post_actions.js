import * as PostsAPIUtil from '../utils/posts_utils';

export const CREATE_POST = 'CREATE_POST';
export const GET_POSTS = 'GET_POSTS';

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
    console.log('post loads action fired',posts)
    return {
        type: GET_POSTS,
        posts
    }
}

export const fetchPostsByID = ({id}) => dispatch => {
    return function action(dispatch) {
        return PostsAPIUtil
            .fetch_posts(id)
            .then(posts => {console.log("baby posts",posts);dispatch(postsLoad(posts))});
    }
}

export const fetchPosts = () => dispatch => {
    return function action(dispatch) {
        return PostsAPIUtil
            .fetch_posts()
            .then(posts => {console.log("baby posts",posts);dispatch(postsLoad(posts))});
    }
}
