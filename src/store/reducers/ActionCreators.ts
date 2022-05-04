import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { IUser } from "../../models/IUser";
import { AppDispatch } from "../store";
import { authSlice } from "./AuthSlice";
import { userSlice } from "./UserSlice";

/*
export const fetchUsers = () => async (dispatch: AppDispatch) => {
    try {
        dispatch(userSlice.actions.usersFetching())
        const response = await axios.get<IUser[]>('https://jsonplaceholder.typicode.com/users')
        dispatch(userSlice.actions.usersFetchingSuccess(response.data))
    } catch (e) {
        dispatch(userSlice.actions.usersFetchingError((e as AxiosError).message))
    }
}
*/
export const fetchUser = createAsyncThunk('user/fetchAll', async(_void, thunkAPI) => {
    try {
        const response  = await axios.get<IUser[]>('http://localhost:5000') 
        return response.data
    } catch(e) {
        return thunkAPI.rejectWithValue('Не удалось загрузить пользователей')
    }
})

export const userLogin = (dispatch: AppDispatch) => {
    dispatch(authSlice.actions.authSuccess(true))
}

export const userQuit = (dispatch: AppDispatch) => {
    dispatch(authSlice.actions.authSuccess(false))
}

export const usersFilter = (dispatch: AppDispatch, obj: string) => {
    dispatch(userSlice.actions.usersFilter(obj))
}