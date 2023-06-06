import {Dispatch} from 'redux';
import {authAPI} from '../api/todolists-api';
import {setIsSignInAC} from '../features/Login/auth-reducer';
import {handleServerAppError, handleServerNetworkError} from '../utils/error-utils';

const initialState = {
    status: 'idle' as RequestStatusType,
    error: null as null | string,
    isInitialized: false
}

export const appReducer = (state: InitialStateType = initialState, action: AppStatusType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.payload.status}
        case 'APP/SET-ERROR':
            return {...state, error: action.payload.error}
        case 'APP/SET-INITIALIZE':
            return {...state, isInitialized: action.isInitialized}
        default:
            return state
    }
}

// Action Creators

export const setAppStatusAC = (status: RequestStatusType) => {
    return {type: 'APP/SET-STATUS', payload: {status}} as const
}
export const setAppErrorAC = (error: null | string) => {
    return {type: 'APP/SET-ERROR', payload: {error}} as const
}
export const setAppInitialize = (isInitialized: boolean) => {
    return {type: 'APP/SET-INITIALIZE', isInitialized} as const
}

// TC

export const initializeAppTC = () => async (dispatch: Dispatch) => {
    try {
        const res = await authAPI.me()
        dispatch(setAppInitialize(true))
        if (res.data.resultCode === 0) {
            dispatch(setIsSignInAC(true))
        } else {
            dispatch(setAppInitialize(true))
            handleServerAppError(res.data, dispatch)
        }
    } catch (e: any) {
        handleServerNetworkError(e, dispatch)
    }
}

// Types

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

type InitialStateType = typeof initialState

export type AppStatusType =
    ReturnType<typeof setAppStatusAC>
    | ReturnType<typeof setAppErrorAC>
    | ReturnType<typeof setAppInitialize>


