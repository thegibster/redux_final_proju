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
    console.log('comments loads action fired',comments)
    return {
        type: GET_COMMENTS,
        comments
    }
}

export const commentLoad = comment => {
    console.log('comment loads action fired',comment)
    return {
        type: GET_COMMENT,
        comments: [comment]
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

export const fetchCommentByID = ({id}) => dispatch => {
    return function action(dispatch) {
        return CommentsAPIUtil
            .fetch_comment_by_id(id)
            .then(comment => {console.log("single comment fetch",comment);dispatch(commentLoad(comment))});
    }
}
