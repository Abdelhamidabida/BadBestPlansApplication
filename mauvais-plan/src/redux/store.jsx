import { configureStore } from '@reduxjs/toolkit'
import authReducer from "../features/AuthSlice";
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'
import thunk from 'redux-thunk';

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
}
const persistedReducer = persistReducer(persistConfig, authReducer)
const store = configureStore({
  reducer: {
    auth: authReducer,
    auth: persistedReducer,
  },
  middleware: [thunk]
})
export default store