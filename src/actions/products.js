import { GET_AVAILABLE_PRODUCTS } from './types';
import api from '../utils/api';

export const getAvailableProducts = () => async dispatch => {
    try{
        const res = await api.get('/product');

        dispatch({
            type: GET_AVAILABLE_PRODUCTS,
            payload: {
                data: res && res.data
            }
        })
    } catch(err) {
        dispatch({
            type: GET_AVAILABLE_PRODUCTS,
            payload: { err }
        })
    }
}
