import { LOGIN } from '../actions/types';

const initialState = {
    error: null,
    success: null,
    data: null,
    loading: true
}

export default function login(state=initialState,action){
    const { type, payload } = action;
    switch(type){
        case LOGIN:
            console.log('payload',payload);
            return {
                ...state,
                error: payload.err && !payload.data ? payload.err : null,
                success: payload.data && !payload.err ? true : false,
                data: payload.data && !payload.err ? payload.data : null,
                loading: false
            }
        default:
            return state;
    }
};
