import { GET_ORDERS, PLACE_ORDER } from '../actions/types';

const initialState = {
    loading: true,
    error: null,
    success: false,
    orders: null,
    orderPlacedData: null
}

export default function orders(state=initialState,action){
    const { type, payload } = action;
    switch(type){
        case GET_ORDERS:
            return {
                ...state,
                error: payload.err && !payload.data ? payload.err : null,
                success: payload.data && !payload.err ? true : false,
                orders: payload.data && payload.data.data && payload.data.data.orders && !payload.err ? payload.data.data.orders : null,
                loading: false
            }
            break;
        case PLACE_ORDER:
            return {
                ...state,
                error: payload.err && !payload.data ? payload.err : null,
                success: payload.data && !payload.err ? true : false,
                orderPlacedData: payload.data && payload.data.data && !payload.err ? payload.data.data : null,
                loading: false
            }
            break;
        default:
            return state;
    }
}
