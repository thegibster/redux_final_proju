//Returns all the categories from the server
// only 3 categories exists  for this project but for scaling, this is probably cleaner in the long run
import machine_backend_ip from './ip_address_util';

export const fetchCategories = () => {


    return fetch(`${machine_backend_ip}/categories`,{
        method: 'get',
        headers: {
            'Authorization': 'cake'
        }})
        .then((res) => res.json())
    //Can clean up the return data by perhaps fetching the key[categories] in the return
    // .then(({ hits }) => hits.map(({ recipe }) => recipe))
}

export const fetchPosts = () => {


    return fetch(`${machine_backend_ip}/posts`,{
        method: 'get',
        headers: {
            'Authorization': 'cake'
        }})
        .then((res) => res.json())
    //Can clean up the return data by perhaps fetching the key[categories] in the return
    // .then(({ hits }) => hits.map(({ recipe }) => recipe))
}

export const fetchComments = () => {


    return fetch(`${machine_backend_ip}/comments`,{
        method: 'get',
        headers: {
            'Authorization': 'cake'
        }})
        .then((res) => res.json())
    //Can clean up the return data by perhaps fetching the key[categories] in the return
    // .then(({ hits }) => hits.map(({ recipe }) => recipe))
}
