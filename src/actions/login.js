import { LOGIN, LOGOUT } from './types';
import api from '../utils/api';
import setAuthToken from '../utils/setAuthToken';

export const login = (data) => async dispatch => {
    try{
        const res = await api.post('/auth/login',data);

        if(res && res.data && res.data.data && res.data.data.token){
            setAuthToken(res.data.data.token);
        }

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

export const logout = () => dispatch => {
    try{
        setAuthToken('');
        dispatch({
            type: LOGOUT,
        })
    } catch(err){
        console.log(`logout error ${err}`);
    }
}
