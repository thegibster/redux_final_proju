import * as CategoryAPIUtil from '../utils/';

import { LOAD_CATEGORIES } from '../constants';

export const categoryLoad = categories => {
console.log('honey load',categories)
    return {
        type: LOAD_CATEGORIES,
        categories
    }
}


export const fetchCategories = () => dispatch => {
    return function action(dispatch) {
        return CategoryAPIUtil
            .fetchCategories()
            .then(categories => {console.log("baby cheiknes",categories.categories);dispatch(categoryLoad(categories.categories))});
    }
}
