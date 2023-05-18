import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from "redux";
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER, } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import userReducer from './user-reducer'

const persistConfig = {
    key: `redux-store-storage`,
    storage,
};

const combinedReducers = combineReducers({
    user: userReducer
})

const persistedReducer = persistReducer(persistConfig, combinedReducers)

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
})

export const persistor = persistStore(store);
