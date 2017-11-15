export const CREATE_POST = 'CREATE_POST';

export const postCreator = ({id,parentId,title,body,author}) => {
    return {
        type: CREATE_POST,
        id,
        parentId,
        title,
        body,
        author

    }
}
