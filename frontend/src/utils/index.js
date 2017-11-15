//Returns all the categories from the server
// only 3 categories exists  for this project but for scaling, this is probably cleaner in the long run
export const fetchCategories = () => {


    return fetch(`http://localhost:3001/categories`,{
        method: 'get',
        headers: {
            'Authorization': 'cake'
        }})
        .then((res) => res.json())
        //Can clean up the return data by perhaps fetching the key[categories] in the return
        // .then(({ hits }) => hits.map(({ recipe }) => recipe))
}

export const fetchPosts = () => {


    return fetch(`http://localhost:3001/posts`,{
        method: 'get',
        headers: {
            'Authorization': 'cake'
        }})
        .then((res) => res.json())
    //Can clean up the return data by perhaps fetching the key[categories] in the return
    // .then(({ hits }) => hits.map(({ recipe }) => recipe))
}

export const fetchComments = () => {


    return fetch(`http://localhost:3001/comments`,{
        method: 'get',
        headers: {
            'Authorization': 'cake'
        }})
        .then((res) => res.json())
    //Can clean up the return data by perhaps fetching the key[categories] in the return
    // .then(({ hits }) => hits.map(({ recipe }) => recipe))
}
