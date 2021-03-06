import { GET_ALL_COLORS, ADD_COLOR } from '../actions/types';

const initialState = {
    loading: true,
    error: null,
    success: false,
    data: null
}

export default function colors(state=initialState,action){
    const { data } = state;
    const { type, payload } = action;
    switch(type){
        case GET_ALL_COLORS:
            return {
                ...state,
                error: payload.err && !payload.data ? payload.err : null,
                success: payload.data && !payload.err ? true : false,
                data: payload.data && !payload.err ? payload.data : [],
                loading: false
            }
            break;
        case ADD_COLOR:
            if(payload.data && payload.data.data){
                if(data ){
                    if(!data.data){
                        data.data = [];
                        data.data.push({ ...payload.data.data })
                    } else {
                        data.data.push({ ...payload.data.data })
                    }
                } 
            }
            return {
                ...state,
                error: payload.err && !payload.data ? payload.err : null,
                success: payload.data && !payload.err ? true : false,
                data,
                loading: false
            }
            break;
        default:
            return state;
    }
}
