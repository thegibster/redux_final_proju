
export const fetch_posts = () => {


    return fetch(`http://localhost:3001/posts/`,{
        method: 'get',
        headers: {
            'Authorization': 'cake'
        }})
        .then((res) => res.json())
    //Can clean up the return data by perhaps fetching the key[categories] in the return
    // .then(({ hits }) => hits.map(({ recipe }) => recipe))
}

export const fetch_posts_byID = (post_id) => {


    return fetch(`http://localhost:3001/posts/${post_id}/`,{
        method: 'get',
        headers: {
            'Authorization': 'cake'
        }})
        .then((res) => res.json())
    //Can clean up the return data by perhaps fetching the key[categories] in the return
    // .then(({ hits }) => hits.map(({ recipe }) => recipe))
}

export const post_a_comment = () => {


    return fetch(`http://localhost:3001/comments`,{
        method: 'get',
        headers: {
            'Authorization': 'cake'
        }})
        .then((res) => res.json())
    //Can clean up the return data by perhaps fetching the key[categories] in the return
    // .then(({ hits }) => hits.map(({ recipe }) => recipe))
}

export const fetch_comments_by_id = (id) => {


    return fetch(`http://localhost:3001/comments/${id}`,{
        method: 'get',
        headers: {
            'Authorization': 'cake'
        }})
        .then((res) => res.json())
    //Can clean up the return data by perhaps fetching the key[categories] in the return
    // .then(({ hits }) => hits.map(({ recipe }) => recipe))
}

export const post_vote_comments_by_id = (id) => {


    return fetch(`http://localhost:3001/comments/${id}`,{
        method: 'post',
        headers: {
            'Authorization': 'cake'
        }})
        .then((res) => res.json())
    //Can clean up the return data by perhaps fetching the key[categories] in the return
    // .then(({ hits }) => hits.map(({ recipe }) => recipe))
}

export const edit_comment_by_id = (id) => {


    return fetch(`http://localhost:3001/comments/${id}`,{
        method: 'put',
        headers: {
            'Authorization': 'cake'
        }})
        .then((res) => res.json())
    //Can clean up the return data by perhaps fetching the key[categories] in the return
    // .then(({ hits }) => hits.map(({ recipe }) => recipe))
}

export const delete_comment_by_id = (id) => {
    //not a true delete
    //turns the deleted flag on, thus excluding the comment from the filter view

    return fetch(`http://localhost:3001/comments/${id}`,{
        method: 'put',
        headers: {
            'Authorization': 'cake'
        }})
        .then((res) => res.json())
    //Can clean up the return data by perhaps fetching the key[categories] in the return
    // .then(({ hits }) => hits.map(({ recipe }) => recipe))
}
