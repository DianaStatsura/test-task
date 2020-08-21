import { combineReducers } from 'redux';

import { authentication } from './authenticationReducer';
//import { products } from './productsReducer';

const rootReducer = combineReducers({
  authentication
  //products
});

export default rootReducer;