import React, {ChangeEvent, useState} from 'react';

type EditableSpanProps = {
    oldTitle: string
    callBack: (newTitle: string) => void
}

export const EditableSpan: React.FC<EditableSpanProps> = (props) => {
    const [edit, setEdit] = useState(false)
    const [newTitle, setNewTitle] = useState(props.oldTitle)
    const onEditHandler = () => {
        setEdit(!edit)
        addTask()
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(e.currentTarget.value)
    }

    const addTask = () => {
        props.callBack(newTitle);
    }

    return (
        edit
            ? <input value={newTitle} onBlur={onEditHandler} autoFocus onChange={onChangeHandler}/>
            : <span onDoubleClick={onEditHandler}>{props.oldTitle}</span>
    );
};