// store.js

import { configureStore } from '@reduxjs/toolkit';
import { msgReducer } from './reducers/message';
import { authReducer } from './reducers/auth';
import currencyReducer from './reducers/currency';
// Import other reducers if available

export const store = configureStore({
  reducer: {
    auth: authReducer,
    msg: msgReducer,
    currencies: currencyReducer
    // Add other reducers here
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  devTools: process.env.NODE_ENV !== 'production', // Automatically enable Redux DevTools in development
});
