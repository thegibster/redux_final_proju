import { LOAD_CATEGORIES } from '../actions/categories_action';

const initialState = {
    categories:[{name:'bacon'},{name:'cheese'},{name:'samich'}]
};

export default function (state=initialState,action) {
    switch(action.type){
        case LOAD_CATEGORIES:
            return {
                ...state,
                categories: [...action.categories]
            }
        default:
            return state;
    }
}
