import { GET_ALL_CATEGORIES } from '../actions/types';

const initialState = {
    loading: true,
    error: null,
    success: false,
    data: null
}

export default function categories(state=initialState,action){
    const { type, payload } = action;
    switch(type){
        case GET_ALL_CATEGORIES:
            return {
                ...state,
                error: payload.err && !payload.data ? payload.err : null,
                success: payload.data && !payload.err ? true : false,
                data: payload.data && !payload.err ? payload.data : null,
                loading: false
            }
            break;
        default:
            return state;
    }
}