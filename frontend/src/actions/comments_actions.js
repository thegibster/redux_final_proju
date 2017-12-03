import * as CommentsAPIUtil from '../utils/comments_utils';

export const CREATE_COMMENT = 'CREATE_COMMENT';
export const GET_COMMENTS = 'GET_COMMENTS';
export const GET_COMMENT = 'GET_COMMENT';
export const EDIT_COMMENT = 'EDIT_COMMENT';
export const DELETE_COMMENT = 'DELETE_COMMENT';

export const commentCreator = ({id,body,author,parentId,timestamp}) => {
    return {
        type: CREATE_COMMENT,
        id,
        timestamp,
        parentId,
        body,
        author,
        voteScore:0,
        parentDeleted:false

    }
}

export const commentsLoad = comments => {
    console.log('commentss loads action fired',comments)
    return {
        type: GET_COMMENTS,
        comments
    }
}

export const fetchCommentsByParentID = ({id}) => dispatch => {
    return function action(dispatch) {
        return CommentsAPIUtil
            .fetch_posts_comments(id)
            // .then(comments => {console.log("comments for post", comments);dispatch(commentsLoad(comments))});
            .then(comments => dispatch(commentsLoad(comments)));

    }
}
