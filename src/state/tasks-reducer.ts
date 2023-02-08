import {TasksStateType} from "../App";
import {v1} from "uuid";
import {AddTodolistACType, removeTodolistACType} from "./todolists-reducer";


export type removeTaskACType = ReturnType<typeof removeTaskAC>
export type addTaskACType = ReturnType<typeof addTaskAC>
export type changeTaskStatusACType = ReturnType<typeof changeTaskStatusAC>
export type changeTaskTitleACType = ReturnType<typeof changeTaskTitleAC>


export type TaskReducerType = removeTaskACType
    | addTaskACType
    | changeTaskStatusACType
    | changeTaskTitleACType
    | AddTodolistACType
    | removeTodolistACType

const initialState: TasksStateType = {}

export const tasksReducer = (state = initialState, action: TaskReducerType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK':
            return {
                ...state,
                [action.todolistID]: state[action.todolistID].filter(t => t.id !== action.taskId)
            }
        case 'ADD-TASK':
            let task = {id: v1(), title: action.title, isDone: false};
            return {
                ...state,
                [action.todolistID]: [task, ...state[action.todolistID]]
            }
        case 'CHANGE-TASK-STATUS':
            return {
                ...state,
                [action.todolistID]: state[action.todolistID].map(t => t.id === action.taskId ? {
                    ...t,
                    isDone: action.isDone
                } : t)
            }
        case 'CHANGE-TASK-TITLE':
            return {
                ...state,
                [action.todolistID]: state[action.todolistID].map(t => t.id === action.taskId ? {
                    ...t,
                    title: action.newTitleString
                } : t)
            }
        case 'ADD-TODOLIST':
            return {
                ...state,
                [action.payload.id]: []
            }
        case 'REMOVE-TODOLIST':
            const newState = {...state}
            delete newState[action.payload.id]
            return newState
        default:
            return state
    }

}

export const removeTaskAC = (taskId: string, todolistID: string) => {
    return {
        type: 'REMOVE-TASK',
        taskId,
        todolistID

    } as const
}

export const addTaskAC = (title: string, todolistID: string) => {
    return {
        type: 'ADD-TASK',
        todolistID,
        title
    } as const
}

export const changeTaskStatusAC = (taskId: string, isDone: boolean, todolistID: string) => {
    return {
        type: 'CHANGE-TASK-STATUS',
        taskId,
        isDone,
        todolistID
    } as const
}

export const changeTaskTitleAC = (taskId: string, newTitleString: string, todolistID: string) => {
    return {
        type: 'CHANGE-TASK-TITLE',
        taskId,
        newTitleString,
        todolistID
    } as const
}


