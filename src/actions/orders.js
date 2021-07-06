import { GET_ORDERS, PLACE_ORDER } from './types';
import api from '../utils/api';

export const getOrders = () => async dispatch => {
    try{
        const res = await api.get('/order');

        dispatch({
            type: GET_ORDERS,
            payload: {
                data: res && res.data
            }
        })
    } catch(err) {
        dispatch({
            type: GET_ORDERS,
            payload: { err }
        })
    }
}

export const placeOrder = (address) => async dispatch => {
    try{
        const res = await api.post('/order/place',address);

        dispatch({
            type: PLACE_ORDER,
            payload: {
                data: res && res.data
            }
        })
    } catch(err) {
        dispatch({
            type: PLACE_ORDER,
            payload: { err }
        })
    }
}
