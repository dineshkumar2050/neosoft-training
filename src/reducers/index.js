import { combineReducers } from 'redux';
import login from './login';
import register from './register';
import categories from './categories';
import products from './products';
import colors from './colors';
import orders from './orders';
import cart from './cart';

export default combineReducers({
    login,
    register,
    categories,
    products,
    colors,
    orders,
    cart
});
