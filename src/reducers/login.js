import { LOGIN, LOGOUT } from '../actions/types';

const initialState = {
    error: null,
    success: null,
    data: null,
    loading: true,
    isAuthenticated: false,
    user: {
        firstName: null,
        lastName: null,
        email: null,
        mobile: null,
        profilePicUrl: null,
        gender: null,
        address: null
    },
    token: localStorage.getItem('token'),
    resetPassToken: null
}

export default function login(state=initialState,action){
    const { type, payload } = action;
    switch(type){
        case LOGIN:
            if(payload && payload.data && payload.data.success){
                var { data,success } = payload.data;
                var { address, email, firstName, gender, lastName, mobile, profilePicUrl, token, resetPassToken } = data;
            }
            return {
                ...state,
                error: payload.err && !payload.data ? payload.err : null,
                success: payload.data && !payload.err ? true : false,
                data: payload.data && !payload.err ? payload.data : null,
                loading: false,
                isAuthenticated: success ? true : false,
                user: {
                    firstName,
                    lastName,
                    email,
                    mobile,
                    profilePicUrl,
                    gender,
                    address
                },
                resetPassToken,
                token: localStorage.getItem('token') ? localStorage.getItem('token') : token
            }
        case LOGOUT:
            return {
                ...state,
                error: null,
                success: true,
                data: null,
                loading: false,
                isAuthenticated: false,
                user: {
                    firstName: null,
                    lastName: null,
                    email: null,
                    mobile: null,
                    profilePicUrl: null,
                    gender: null,
                    address
                },
                token: null,
                resetPassToken: null
            }
        default:
            return state;
    }
};
