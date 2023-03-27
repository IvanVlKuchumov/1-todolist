const initialState = {
    status: 'idle' as RequestStatusType,
    error: null as null | string
}

export const appReducer = (state: InitialStateType = initialState, action: AppStatusType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.payload.status}
        case 'APP/SET-ERROR':
            return {...state, error: action.payload.error}
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

// Types

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

type InitialStateType = typeof initialState

export type AppStatusType =
    ReturnType<typeof setAppStatusAC>
    | ReturnType<typeof setAppErrorAC>


