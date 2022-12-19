import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from './App';
import {Button} from "./components/Button/Button";

type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string) => void
    changeFilter: (value: FilterValuesType) => void
    addTask: (inputValue: string) => void
}

export function Todolist(props: PropsType) {
    let [inputValue, setInputValue] = useState('')
    const addTaskHandler = () => {
        props.addTask(inputValue)
        setInputValue('')
    }
    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.currentTarget.value)
    }
    const onKeyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            addTaskHandler()
        }
    }
    const removeTaskHandler = (tId: string) => {
        props.removeTask(tId)
    }
    const changFilterHandler = (val: FilterValuesType) => {
        props.changeFilter(val)
    }
    return <div>
        <h3>{props.title}</h3>
        <div>
            <input value={inputValue} onChange={onChangeHandler} onKeyDown={onKeyPressHandler}/>
            {/*<button onClick={addTaskHandler}>+</button>*/}
            <Button name={'+'} callBack={addTaskHandler}/>
        </div>
        <ul>
            {
                props.tasks.map(t => {
                        return (<li key={t.id}>
                            <input type="checkbox" checked={t.isDone}/>
                            <span>{t.title}</span>
                            <Button name={'x'} callBack={()=>removeTaskHandler(t.id)}/>
                        </li>)
                    }
                )
            }
        </ul>
        <div>
            <Button name={'All'} callBack={()=>changFilterHandler("all")}/>
            <Button name={'Active'} callBack={()=>changFilterHandler("active")}/>
            <Button name={'Completed'} callBack={()=>changFilterHandler("completed")}/>
        </div>
    </div>
}
