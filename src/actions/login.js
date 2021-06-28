import { LOGIN } from './types';
import api from '../utils/api';

export const login = (data) => async dispatch => {
    try{
        const res = await api.post('/auth/login',data);
        dispatch({
            type: LOGIN,
            payload: {
                data: res && res.data
            }
        })
    } catch(err){
        dispatch({
            type: LOGIN,
            payload: {
                err
            }
        })
    }
};

