import { GET_CART_PRODUCTS, ADD_PRODUCT_TO_CART, UPDATE_PRODUCT_QUANTITY_IN_CART, DELETE_PRODUCT_FROM_CART } from './types';
import api from '../utils/api';

export const getCartProducts = () => async dispatch => {
    try{
        const res = await api.get('/cart');

        dispatch({
            type: GET_CART_PRODUCTS,
            payload: {
                data: res && res.data
            }
        })
    } catch(err) {
        dispatch({
            type: GET_CART_PRODUCTS,
            payload: { err }
        })
    }
}

export const addProductToCart = (data) => async dispatch => {
    try{
        const res = await api.post('/cart', data);

        dispatch({
            type: ADD_PRODUCT_TO_CART,
            payload: {
                data: res && res.data
            }
        })
    } catch(err) {
        dispatch({
            type: ADD_PRODUCT_TO_CART,
            payload: { err }
        })
    }
}

export const updateProductQuanityInCart = (data,productId) => async dispatch => {
    try{
        const res = await api.put(`/cart/${productId}`, data);

        let newData;
        if(res && res.data){
            newData = { 
                ...res.data,
                quantityInfo: data,
                productId
            }
        } else {
            newData = {
                quantityInfo: data,
                productId
            }
        }

        dispatch({
            type: UPDATE_PRODUCT_QUANTITY_IN_CART,
            payload: {
                data: newData
            }
        })
    } catch(err) {
        dispatch({
            type: UPDATE_PRODUCT_QUANTITY_IN_CART,
            payload: { err }
        })
    }
}

export const deleteProductFromCart = (productId) => async dispatch => {
    try{
        const res = await api.delete(`/cart/${productId}`);

        let newData;
        if(res && res.data){
            newData = {
                ...res.data,
                productId
            }
        } else {
            newData = {
                productId
            }
        }

        dispatch({
            type: DELETE_PRODUCT_FROM_CART,
            payload: {
                data: newData
            }
        })
    } catch(err) {
        dispatch({
            type: DELETE_PRODUCT_FROM_CART,
            payload: { err }
        })
    }
}
