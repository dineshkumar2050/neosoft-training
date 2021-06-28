import api from "../utils/api";
import { GET_ALL_CATEGORIES } from './types';

export const getAllCategories = () => async dispatch => {
    try{
        const res = await api.get('/category');

        dispatch({
            type: GET_ALL_CATEGORIES,
            payload: {
                data: res && res.data
            }
        })
    } catch(err) {
        dispatch({
            type: GET_ALL_CATEGORIES,
            payload: { err }
        })
    }
}

