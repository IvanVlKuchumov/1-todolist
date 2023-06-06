import {AppStatusType, setAppStatusAC} from '../../app/app-reducer';
import {Dispatch} from 'redux';
import {authAPI} from '../../api/todolists-api';
import {FormDataType} from './Login';
import {handleServerAppError, handleServerNetworkError} from '../../utils/error-utils';
import {clearDataAC, ClearDataActionType} from '../TodolistsList/todolists-reducer';

const initialState = {
    isLoggedIn: false
}


export const authReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'SIGN-IN':
            return {...state, isLoggedIn: action.isLogged}
        default:
            return state
    }
}

export const setIsSignInAC = (isLogged: boolean) => ({type: 'SIGN-IN', isLogged} as const)

export const signInTC = (data: FormDataType) => async (dispatch: Dispatch<ActionsType>) => {
    dispatch(setAppStatusAC('loading'))
    try {
        const res = await authAPI.login(data)
        if (res.data.resultCode === 0) {
            dispatch(setIsSignInAC(true))
            dispatch(setAppStatusAC('succeeded'))
        } else {
            handleServerAppError(res.data, dispatch)
        }
    } catch (e: any) {
        handleServerNetworkError(e, dispatch)
    }
}

export const logoutTC = () => async (dispatch: Dispatch<ActionsType>) => {
    dispatch(setAppStatusAC('loading'))
    try {
        const res = await authAPI.logout()
        if (res.data.resultCode === 0) {
            dispatch(setIsSignInAC(false))
            dispatch(setAppStatusAC('succeeded'))
            dispatch(clearDataAC())
        } else {
            handleServerAppError(res.data, dispatch)
        }
    } catch (e: any) {
        handleServerNetworkError(e, dispatch)
    }
}

type InitialStateType = typeof initialState

type ActionsType = ReturnType<typeof setIsSignInAC> | AppStatusType | ClearDataActionType