export const CREATE_POST = 'CREATE_POST';

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
