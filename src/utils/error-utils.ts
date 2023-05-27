import {ResponseType} from '../api/todolists-api';
import {Dispatch} from 'redux';
import {AppStatusType, setAppErrorAC, setAppStatusAC} from '../app/app-reducer';

export const handleServerAppError = <T>(data: ResponseType<T>, dispatch: ErrorUtilsDispatchType ) => {
    if (data.messages.length) {
        dispatch(setAppErrorAC(data.messages[0]))
    } else  {
        dispatch(setAppErrorAC('Some error occured'))
    }
    dispatch(setAppStatusAC('failed'))
}

export const handleServerNetworkError = (error: {messages: string}, dispatch: ErrorUtilsDispatchType) => {
    dispatch(setAppErrorAC(error.messages))
    dispatch(setAppStatusAC('failed'))
}


type ErrorUtilsDispatchType = Dispatch<AppStatusType>