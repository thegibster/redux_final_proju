import machine_backend_ip from './ip_address_util';

export const fetch_posts_comments = (post_id) => {


    return fetch(`${machine_backend_ip}/posts/${post_id}/comments`,{
        method: 'get',
        headers: {
            'Authorization': 'cake'
        }})
        .then((res) => res.json())
    //Can clean up the return data by perhaps fetching the key[categories] in the return
    // .then(({ hits }) => hits.map(({ recipe }) => recipe))
}

export const post_a_comment = (new_comment) => {
    console.log(new_comment,"this is utils new comment")
    const parameters = {
        id:new_comment.id,
        parentId:new_comment.parentId,
        timestamp:Date.now(),
        body:new_comment.body,
        author:new_comment.author,
        voteScore:1,
        deleted:false,
        parentDeleted:false
    };
    console.log(parameters)
    return fetch(`${machine_backend_ip}/comments`,{
        method: 'post',
        headers: {
            'Authorization': 'cake',
            // 'Content-Type': 'application/x-www-form-urlencoded'
            'Content-Type': 'application/json'
        },
        body:JSON.stringify(parameters)
    })
        .then((res) => res.json())
    //Can clean up the return data by perhaps fetching the key[categories] in the return
    // .then(({ hits }) => hits.map(({ recipe }) => recipe))
}

export const fetch_comment_by_id = (id) => {


    return fetch(`${machine_backend_ip}/comments/${id}`,{
        method: 'get',
        headers: {
            'Authorization': 'cake'
        }})
        .then((res) => res.json())
    //Can clean up the return data by perhaps fetching the key[categories] in the return
    // .then(({ hits }) => hits.map(({ recipe }) => recipe))
}

export const post_vote_comments_by_id = (id,voteScore) => {

    const option = voteScore;

    return fetch(`${machine_backend_ip}/comments/${id}`,{
        method: 'post',
        headers: {
            'Authorization': 'cake',
            // 'Content-Type': 'application/x-www-form-urlencoded'
            'Content-Type': 'application/json'
        },
        body:JSON.stringify({option})
    })
        .then((res) => res.json())
    //Can clean up the return data by perhaps fetching the key[categories] in the return
    // .then(({ hits }) => hits.map(({ recipe }) => recipe))
}

export const edit_comment_by_id = (id,edit_comment) => {
    edit_comment.timestamp = Date.now();

    return fetch(`${machine_backend_ip}/comments/${id}`,{
        method: 'put',
        headers: {
            'Authorization': 'cake',
            'Content-Type': 'application/json'
        },
        body:JSON.stringify(edit_comment)
    })
        .then((res) => res.json())
    //Can clean up the return data by perhaps fetching the key[categories] in the return
    // .then(({ hits }) => hits.map(({ recipe }) => recipe))
}

export const delete_comment_by_id = (id) => {
    //not a true delete
    //turns the deleted flag on, thus excluding the comment from the filter view

    return fetch(`${machine_backend_ip}/comments/${id}`,{
        method: 'delete',
        headers: {
            'Authorization': 'cake'
        }})
        .then((res) => res.json())
    //Can clean up the return data by perhaps fetching the key[categories] in the return
    // .then(({ hits }) => hits.map(({ recipe }) => recipe))
}
