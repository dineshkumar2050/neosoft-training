import { ADD_NEW_ADDRESS, UPDATE_ADDRESS, LIST_ADDRESS, DELETE_ADDRESS } from '../actions/types';

const initialState = {
    loading: true,
    error: null,
    success: false,
    addresses: null,
    addNewAddressData: null,
    listAddressData: null
}

export default function addresses(state=initialState,action){
    const { type, payload } = action;
    let { addresses, addNewAddressData, listAddressData } = state;
    switch(type){
        case ADD_NEW_ADDRESS:
            return {
                ...state,
                error: payload.err && !payload.data ? payload.err : null,
                success: payload.data && !payload.err ? true : false,
                addresses: payload.data && payload.data.data && payload.data.data.address && !payload.err ? payload.data.data.address : null,
                loading: false,
                addNewAddressData: payload.data && payload.data.data && !payload.err ? payload.data.data : null
            }
            break;
        case UPDATE_ADDRESS:            
            if(payload.data && payload.data.data){
                const { addressId, newAddress } = payload.data.data;
                if(addresses && addresses.length > 0){
                    addresses.map((address,idx,arr) => {
                        if(arr[idx]._id === addressId){
                            let id = arr[idx]._id;
                            arr[idx] = { id,...newAddress }                   
                        }
                    })
                }
                if(addNewAddressData && Object.keys(addNewAddressData).length  > 0){
                    addNewAddressData.map((address,idx,arr) => {
                        if(arr[idx]._id === addressId){
                            let id = arr[idx]._id;
                            arr[idx] = { id,...newAddress }                   
                        }
                    })
                }
                if(listAddressData && Object.keys(listAddressData).length  > 0){
                    listAddressData.map((address,idx,arr) => {
                        if(arr[idx]._id === addressId){
                            let id = arr[idx]._id;
                            arr[idx] = { id,...newAddress }                   
                        }
                    })
                }
            }
            return {
                ...state,
                error: payload.err && !payload.data ? payload.err : null,
                success: payload.data && !payload.err ? true : false,
                addresses,
                loading: false,
                listAddressData,
                addNewAddressData
            }
            break;
        case LIST_ADDRESS:
            return {
                ...state,
                error: payload.err && !payload.data ? payload.err : null,
                success: payload.data && !payload.err ? true : false,
                addresses: payload.data && payload.data.data && payload.data.data.address && !payload.err ? payload.data.data.address : null,
                loading: false,
                listAddressData: payload.data && payload.data.data && !payload.err ? payload.data.data : null
            }
            break;
        case DELETE_ADDRESS:
            if(payload.data && payload.data.data){
                const { addressId } = payload.data.data;
                if(addresses && addresses.length > 0){
                    addresses.filter(address => address._id !== addressId);
                }
                if(addNewAddressData && Object.keys(addNewAddressData).length  > 0){
                    addNewAddressData.filter(address => address._id !== addressId);
                }
                if(listAddressData && Object.keys(listAddressData).length  > 0){
                    listAddressData.filter(address => address._id !== addressId);
                }
            }
            return {
                ...state,
                error: payload.err && !payload.data ? payload.err : null,
                success: payload.data && !payload.err ? true : false,
                addresses,
                listAddressData,
                addNewAddressData,
                loading: false
            }
            break;
        default:
            return state;
    }
}
