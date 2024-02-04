// reducers/currencyReducer.js

import { ADD_CURRENCY, UPDATE_CURRENCY, DELETE_CURRENCY, INITIALIZE_STATE } from '../actions/types';

const initialState = [];

const currencyReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_CURRENCY:
        console.log(action.payload);
      return [...state, action.payload];
    case UPDATE_CURRENCY:
      return state.map((currency) =>
        currency.id === action.payload.id ? { ...currency, ...action.payload } : currency
      );
    case DELETE_CURRENCY:
      return state.filter((currency) => currency.id !== action.payload);
    case INITIALIZE_STATE:
      return action.payload;
    default:
      return state;
  }
};

export default currencyReducer;
