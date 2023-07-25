import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // Defaults to localStorage
import AuditSlice from './Reducers/createSlice';

const persistConfig = {
  key: 'root', // The key to store the data in localStorage (or sessionStorage)
  storage, // The storage engine to use (e.g., localStorage, sessionStorage)
};

const persistedReducer = persistReducer(persistConfig, AuditSlice);

export const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);
