import { ADD_NEW_ADDRESS, DELETE_ADDRESS, LIST_ADDRESS, UPDATE_ADDRESS } from "./types";
import api from "../utils/api";

export const addNewAddress = (data) => async dispatch => {
    try{
        const res = await api.post('/user/address',data);

        dispatch({
            type: ADD_NEW_ADDRESS,
            payload: {
                data: res && res.data
            }
        })
    } catch(err) {
        dispatch({
            type: ADD_NEW_ADDRESS,
            payload: { err }
        })
    }
}

export const listAddress = () => async dispatch => {
    try{
        const res = await api.get('/user/address');

        dispatch({
            type: LIST_ADDRESS,
            payload: {
                data: res && res.data
            }
        })
    } catch(err) {
        dispatch({
            type: LIST_ADDRESS,
            payload: { err }
        })
    }
}

export const updateAddress = (data,addressId) => async dispatch => {
    try{
        const res = await api.put(`/user/address/${addressId}`, data);

        let newData;
        if(res && res.data){
            newData = { 
                ...res.data,
                newAddress: data,
                addressId
            }
        } else {
            newData = {
                newAddress: data,
                addressId
            }
        }

        dispatch({
            type: UPDATE_ADDRESS,
            payload: {
                data: newData
            }
        })
    } catch(err) {
        dispatch({
            type: UPDATE_ADDRESS,
            payload: { err }
        })
    }
}

export const deleteAddress = (addressId) => async dispatch => {
    try{
        const res = await api.delete(`/user/address/${addressId}`);

        let newData;
        if(res && res.data){
            newData = {
                ...res.data,
                addressId
            }
        } else {
            newData = {
                addressId
            }
        }

        dispatch({
            type: DELETE_ADDRESS,
            payload: {
                data: newData
            }
        })
    } catch(err) {
        dispatch({
            type: DELETE_ADDRESS,
            payload: { err }
        })
    }
}
