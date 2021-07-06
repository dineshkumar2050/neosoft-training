import { GET_CART_PRODUCTS, ADD_PRODUCT_TO_CART, UPDATE_PRODUCT_QUANTITY_IN_CART, DELETE_PRODUCT_FROM_CART } from '../actions/types';

const initialState = {
    loading: true,
    error: null,
    success: false,
    products: null,
    grandTotal: null,
    allProductsQuantity: null 
}

export default function cart(state=initialState,action){
    const { type, payload } = action;
    let { products, grandTotal, allProductsQuantity } = state;
    switch(type){
        case GET_CART_PRODUCTS:
            let productsCount = 0;
            if(payload.data && payload.data.data && payload.data.data.products){
                const { products } = payload.data.data
                if(products.length  === 0){
                    productsCount = 0
                } else {
                    products.forEach(element => {
                        productsCount += element.quantity 
                    });
                }
            }
            return {
                ...state,
                error: payload.err && !payload.data ? payload.err : null,
                success: payload.data && !payload.err ? true : false,
                products: payload.data && payload.data.data && payload.data.data.products && !payload.err ? payload.data.data.products : null,
                grandTotal: payload.data && payload.data.data && payload.data.data.grandTotal && !payload.err ? payload.data.data.grandTotal : null,
                allProductsQuantity: productsCount,
                loading: false
            }
            break;
        case ADD_PRODUCT_TO_CART:
            let newProductsCount = 0;
            if(payload.data && payload.data.data && payload.data.data.products){
                const { products } = payload.data.data
                if(products.length  === 0){
                    newProductsCount = 0
                } else {
                    products.forEach(element => {
                        newProductsCount += element.quantity 
                    });
                }
            }
            return {
                ...state,
                error: payload.err && !payload.data ? payload.err : null,
                success: payload.data && !payload.err ? true : false,
                products: payload.data && payload.data.data && payload.data.data.products && !payload.err ? payload.data.data.products : null,
                grandTotal: payload.data && payload.data.data && payload.data.data.grandTotal && !payload.err ? payload.data.data.grandTotal : null,
                allProductsQuantity: newProductsCount,
                loading: false
            }
        case UPDATE_PRODUCT_QUANTITY_IN_CART:
            if(payload.data && payload.data.data ){
                const { quantityInfo, productId } = payload.data.data;
                const { quantity } = quantityInfo;
                products.map((product,idx,arr) => {
                    if(arr[idx]._id === productId){
                        let quantityDiff = arr[idx].quantity > quantity ? arr[idx].quantity - quantity : quantity - arr[idx].quantity;
                        let costOfOneProduct = (arr[idx].totalAmount)/(arr[idx].quantity);
                        arr[idx].quantity = quantity;
                        grandTotal -= arr[idx].totalAmount; 
                        arr[idx].totalAmount += quantityDiff*costOfOneProduct;
                        grandTotal += arr[idx].totalAmount;
                    }
                })
                allProductsQuantity = quantity;
            }
            return {
                ...state,
                products,
                grandTotal,
                allProductsQuantity,
                error: payload.err && !payload.data ? payload.err : null,
                success: payload.data && !payload.err ? true : false,
                loading: false
            }
            break;
        case DELETE_PRODUCT_FROM_CART:
            if(payload.data && payload.data.data ){
                const { productId } = payload.data.data;               
                products.map((product,idx,arr) => {
                    if(arr[idx]._id === productId){
                        grandTotal -= arr[idx].totalAmount;
                        allProductsQuantity -= arr[idx].quantity; 
                    }
                })
                products.filter(product => product._id !== productId);
            }
            return {
                ...state,
                error: payload.err && !payload.data ? payload.err : null,
                success: payload.data && !payload.err ? true : false,
                loading: false,
                products,
                grandTotal,
                allProductsQuantity
            }
            break;
        default:
            return state;
    }
}
