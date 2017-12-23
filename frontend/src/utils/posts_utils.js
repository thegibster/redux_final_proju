import machine_backend_ip from './ip_address_util';
const uuidV1 = require('uuid/v1');

export const fetch_posts = () => {

    return fetch(`${machine_backend_ip}/posts/`, {
        method: 'get',
        headers: {
            'Authorization': 'cake'
        }
    })
        .then((res) => res.json())
};


export const create_post = (new_post) => {
    console.log(new_post)
    const parameters = {
        id: uuidV1(),
        timestamp: Date.now(),
        title: new_post.title,
        body: new_post.body,
        author: new_post.author,
        category: new_post.category,
        voteScore: 1,
        deleted: false
    };

    return fetch(`${machine_backend_ip}/posts`, {
        method: 'post',
        headers: {
            'Authorization': 'cake',
            // 'Content-Type': 'application/x-www-form-urlencoded'
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(parameters)
    })
        .then((res) => res.json())
};


export const postVote_by_id = (id, voteScore) => {
    console.log('vote posting,', id, voteScore)
    const option = voteScore;
    return fetch(`${machine_backend_ip}/posts/${id}`, {
        method: 'post',
        headers: {
            'Authorization': 'cake',
            // 'Content-Type': 'application/x-www-form-urlencoded'
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({option})
    })
        .then((res) => res.json())
};

export const edit_post_by_id = (id, edit_post) => {
    edit_post.timestamp = Date.now();

    return fetch(`${machine_backend_ip}/posts/${id}`, {
        method: 'put',
        headers: {
            'Authorization': 'cake',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(edit_post)
    })

        .then((res) => res.json())
};

export const delete_all_posts_comments_by_id = (id) => {
    //not a true delete
    //turns the deleted flag on, thus excluding the comment from the filter view

    return fetch(`${machine_backend_ip}/posts/${id}`, {
        method: 'delete',
        headers: {
            'Authorization': 'cake'
        }
    })
        .then((res) => res.json())
    //Can clean up the return data by perhaps fetching the key[categories] in the return
    // .then(({ hits }) => hits.map(({ recipe }) => recipe))
};
