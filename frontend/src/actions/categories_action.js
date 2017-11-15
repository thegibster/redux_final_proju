import * as CategoryAPIUtil from '../utils/';

export const LOAD_CATEGORIES = 'LOAD_CATEGORIES';

export const categoryLoad = categories => {
console.log('honey load',categories)
    return {
        type: LOAD_CATEGORIES,
        categories
    }
}



// export const fetchCategories = () => dispatch => (
//     CategoryAPIUtil
//         .fetchCategories()
//         .then(categories => {console.log("baby cheiknes",categories.categories);dispatch(categoryLoad (categories.categories))})
// );






export const fetchCategories = () => dispatch => {
    return function action(dispatch) {
        // dispatch({ type: LOAD_CATEGORIES })
        // const request = axios({
        //     method: 'GET',
        //     url: `${BASE_URL}/offers`,
        //     headers: []
        // });
        //
        // return request.then(
        //     response => dispatch(fetchOffersSuccess(response)),
        //     err => dispatch(fetchOffersError(err))
        // );


        return CategoryAPIUtil
            .fetchCategories()
            .then(categories => {console.log("baby cheiknes",categories.categories);dispatch(categoryLoad(categories.categories))})
        ;

    }
}


// Sample below




// export function fetchOffers() {
//     return function action(dispatch) {
//         dispatch({ type: FETCH_OFFERS })
//
//         const request = axios({
//             method: 'GET',
//             url: `${BASE_URL}/offers`,
//             headers: []
//         });
//
//         return request.then(
//             response => dispatch(fetchOffersSuccess(response)),
//             err => dispatch(fetchOffersError(err))
//         );
//     }
// }
