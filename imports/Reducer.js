import { SET_CURRENT_PAGE } from './Actions';

const initialState = {
    currentPage:'projects'
}

export default function (state = initialState, action){
    const { type, data } = action;
    
    switch(type){
        case SET_CURRENT_PAGE:
            return {
                ...state,
                currentPage : data.page
            };
        default:
            return state;
    }
}