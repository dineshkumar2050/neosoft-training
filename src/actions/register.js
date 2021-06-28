import { REGISTER } from './types';
import api from '../utils/api';

export const register = data => async dispatch => {
    try{
        const apiData = {
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            gender: data.gender,
            password: data.password,
            confirm_password: data.confirmPassword,
            mobile: data.mobileNumber
        }
        const res = await api.post('/auth/register',apiData);

        dispatch({
            type: REGISTER,
            payload: {
                data: res && res.data
            }
        })
    } catch(err){
        dispatch({
            type: REGISTER,
            payload: {
                err
            }
        })
    }
}
