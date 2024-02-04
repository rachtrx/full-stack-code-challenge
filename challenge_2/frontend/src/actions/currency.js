import { ADD_CURRENCY, UPDATE_CURRENCY, DELETE_CURRENCY, INITIALIZE_STATE, SET_MESSAGE, LOGOUT } from './types'
import CurrencyService from '../api/currency.api';

export const addCurrency = (currency) => async (dispatch) => {
    try {
      const newCurrency = await CurrencyService.addCurrencyToDB(currency);
    //   console.log(newCurrency);
      dispatch({
        type: ADD_CURRENCY,
        payload: newCurrency,
      });
      // Optionally dispatch a success message
      dispatch({
        type: SET_MESSAGE,
        payload: {
            title: 'Currency added successfully',
            status: "success"
        },
      });
    } catch (error) {
        if (error.response?.status === 401) {
            dispatch({
                type: LOGOUT
            })
        } else {
            dispatch({
                type: SET_MESSAGE,
                payload: error.message,
            });
        }
    }
  };
  
export const updateCurrency = (currency) => async (dispatch) => {
    try {
        await CurrencyService.updateCurrencyInDB(currency);
        dispatch({
            type: UPDATE_CURRENCY,
            payload: currency,
        });
        dispatch({
            type: SET_MESSAGE,
            payload: {
                title: 'Currency updated successfully',
                status: "success"
            },
        });
    } catch (error) {
        if (error.response?.status === 401) {
            dispatch({
                type: LOGOUT
            })
        } else {
            dispatch({
                type: SET_MESSAGE,
                payload: error.message,
            });
        }
    }
};
  
export const deleteCurrency = (id) => async (dispatch) => {
    try {
        await CurrencyService.deleteCurrencyFromDB(id);
        dispatch({
            type: DELETE_CURRENCY,
            payload: id,
        });
        dispatch({
            type: SET_MESSAGE,
            payload: {
                title: 'Currency deleted successfully',
                status: "success"
            },
        });
    } catch (error) {
        if (error.response?.status === 401) {
            dispatch({
                type: LOGOUT
            })
        } else {
            dispatch({
                type: SET_MESSAGE,
                payload: error.message,
            });
        }
    }
};
  
export const initializeState = () => async (dispatch) => {
    try {
        // Assuming fetchCurrencies() fetches your initial state from an API
        console.log("Init currencies");
        const currencies = await CurrencyService.fetchCurrencies();
        dispatch({
            type: INITIALIZE_STATE,
            payload: currencies,
        });
    } catch (error) {
        if (error.response?.status === 401) {
            dispatch({
                type: LOGOUT
            })
        } else {
            dispatch({
                type: SET_MESSAGE,
                payload: error.message,
            });
        }
    }
};