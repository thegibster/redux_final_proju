//Returns all the categories from the server
// only 3 categories exists  for this project but for scaling, this is probably cleaner in the long run
const base = 'http://localhost:3001';

export const fetchCategories = () => {


    return fetch(`${base}/categories`,{
        method: 'get',
        headers: {
            'Authorization': 'cake'
        }})
        .then((res) => res.json())
    //Can clean up the return data by perhaps fetching the key[categories] in the return
    // .then(({ hits }) => hits.map(({ recipe }) => recipe))
}

export const fetchPosts = () => {


    return fetch(`${base}/posts`,{
        method: 'get',
        headers: {
            'Authorization': 'cake'
        }})
        .then((res) => res.json())
    //Can clean up the return data by perhaps fetching the key[categories] in the return
    // .then(({ hits }) => hits.map(({ recipe }) => recipe))
}

export const fetchComments = () => {


    return fetch(`${base}/comments`,{
        method: 'get',
        headers: {
            'Authorization': 'cake'
        }})
        .then((res) => res.json())
    //Can clean up the return data by perhaps fetching the key[categories] in the return
    // .then(({ hits }) => hits.map(({ recipe }) => recipe))
}
