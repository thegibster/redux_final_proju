export const fetchCategories = () => {


    return fetch(`http://localhost:3001/categories`,{
        method: 'get',
        headers: {
            'Authorization': 'cake'
        }})
        .then((res) => res.json())
        // .then(({ hits }) => hits.map(({ recipe }) => recipe))
}
