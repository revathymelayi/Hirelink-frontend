import { configureStore, combineReducers } from "@reduxjs/toolkit"
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web

import userSlice from "./slices/userSlice"
import jobSlice from "./slices/jobSlice"
import employerSlice from "./slices/employerSlice"
import signupSlice from "./slices/signupSlice"

const persistConfig = {
    key: 'root',
    storage,
}
const rootReducer = combineReducers({
    loggedUser: userSlice,
    jobDetails: jobSlice,
    employerDetails:employerSlice,
    signupUserDetails:signupSlice

});
const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
    reducer: persistedReducer,
})

const persistor = persistStore(store);

export { store, persistor };