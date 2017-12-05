const uuidV1 = require('uuid/v1');

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

export const post_a_post = (new_post) => {
    console.log(new_post)
    const parameters = {
        id:uuidV1(),
        timestamp:Date.now(),
        title:new_post.title,
        body:new_post.body,
        author:new_post.author,
        category:new_post.category,
        voteScore:1,
        deleted:false
    };
    // let data = new FormData();
    // data.append( "json", JSON.stringify( parameters ) );

    return fetch(`http://localhost:3001/posts`,{
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

export const postVote_by_id = (id,voteScore) => {
    //upVote downVote
    console.log('vote posting,', id, voteScore)
    const option = voteScore;



    return fetch(`http://localhost:3001/posts/${id}`, {
        method: 'post',
        headers: {
            'Authorization': 'cake',
            // 'Content-Type': 'application/x-www-form-urlencoded'
            'Content-Type': 'application/json'
        },
        body:JSON.stringify({option})
        })
        // .then((res) => res.json())
    //Can clean up the return data by perhaps fetching the key[categories] in the return
    // .then(({ hits }) => hits.map(({ recipe }) => recipe))
}

export const edit_post_by_id = (id,edit_post) => {
    edit_post.timestamp = Date.now();

    return fetch(`http://localhost:3001/posts/${id}`,{
        method: 'put',
        headers: {
            'Authorization': 'cake',
            'Content-Type': 'application/json'
        },
        body:JSON.stringify(edit_post)
        })

        .then((res) => res.json())
    //Can clean up the return data by perhaps fetching the key[categories] in the return
    // .then(({ hits }) => hits.map(({ recipe }) => recipe))
}

export const delete_all_posts_comments_by_id = (id) => {
    //not a true delete
    //turns the deleted flag on, thus excluding the comment from the filter view

    return fetch(`http://localhost:3001/posts/${id}`,{
        method: 'delete',
        headers: {
            'Authorization': 'cake'
        }})
        .then((res) => res.json())
    //Can clean up the return data by perhaps fetching the key[categories] in the return
    // .then(({ hits }) => hits.map(({ recipe }) => recipe))
}
