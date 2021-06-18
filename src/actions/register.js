import { REGISTER } from './types';
import api from '../utils/api';

export const register = data => async dispatch => {
    try{
        const res = await api.post('/auth/register',data);

        dispatch({
            type: REGISTER,
            payload: {
                data: res && res.data
            }
        })
    } catch(err){
        console.log(err);
        dispatch({
            type: REGISTER,
            payload: {
                err
            }
        })
    }
}
