export const CREATE_COMMENT = 'CREATE_POST';

export const commentCreator = ({id,timestamp,title,body,author,parentId,voteScore,parentDeleted}) => {
    return {
        type: CREATE_COMMENT,
        id,
        timestamp,
        title,
        body,
        author,
        parentId,
        voteScore,
        parentDeleted

    }
}
