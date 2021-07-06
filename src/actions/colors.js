import api from "../utils/api";
import { GET_ALL_COLORS, ADD_COLOR } from './types';

export const getAllColors = () => async dispatch => {
    try{
        const res = await api.get('/color');

        dispatch({
            type: GET_ALL_COLORS,
            payload: {
                data: res && res.data
            }
        })
    } catch(err){
        dispatch({
            type: GET_ALL_COLORS,
            payload: {
                err
            }
        })
    }
}


export const addColor = (color) => async dispatch => {
    try{
        const res = await api.post('/color', color);

        dispatch({
            type: ADD_COLOR,
            payload: {
                data: res && res.data
            }
        })
    } catch(err){
        dispatch({
            type: ADD_COLOR,
            payload: {
                err
            }
        })
    }
}
