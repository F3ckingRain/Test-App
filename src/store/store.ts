import {combineReducers, configureStore} from '@reduxjs/toolkit'
import {userAPI} from '../services/UserService'
import  reducer  from './reducers/AuthSlice'

const rootReducer = combineReducers({
    [userAPI.reducerPath]: userAPI.reducer,
    reducer
})

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(userAPI.middleware)}
        )
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']