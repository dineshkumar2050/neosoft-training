import { REGISTER } from '../actions/types';

const initialState = {
    error: null,
    success: null,
    data: null,
    loading: true
}

export default function register(state=initialState,action){
    const { type, payload } = action;
    switch(type){
        case REGISTER:
            return {
                ...state,
                error: payload && payload.err && !payload.data ? payload.err : null,
                success: payload && payload.data && !payload.err ? true : false,
                data: payload && payload.data && !payload.err ? payload.data : null,
                loading: false
            }
        default:
            return state;
    }
};
