import { LOAD_CATEGORIES } from '../actions/categories_action';

const initialState = {
    categories:[{name:'bacon'},{name:'cheese'},{name:'samich'}]
};

export default function (state=initialState,action) {

    const { categories } = action;
    // const  deepcategories = action.categories;
    // console.log("why not", action)
    // const {categories} = action;

    switch(action.type){

        case "DELETE_POST":
            return state.filter(category => category.name !== action.name);
        case LOAD_CATEGORIES:
            console.log("LOAD_CATEGORIES was called",action.categories, state);

            // return Object.assign({}, state, {
            //     categories: action.categories
            // })
            console.log('this is how it look', state.categories)
            return {
                ...state,
               categories: [...action.categories]
            }


        default:
            return state;
    }}
