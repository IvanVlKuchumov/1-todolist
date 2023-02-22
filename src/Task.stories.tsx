import {Task} from './Task';
import {ComponentMeta, ComponentStory} from '@storybook/react';
import React from 'react';

import {ReduxStoreProviderDecorate} from './state/ReduxStoreProviderDecorate';
import {useSelector} from 'react-redux';
import {AppRootStateType} from './state/store';
import {TaskType} from './Todolist';


export default {
    title: 'TODOLISTS/Task',
    component: Task,
    decorators: [ReduxStoreProviderDecorate]

} as ComponentMeta<typeof Task>;

const TaskCopy = () => {
    const task = useSelector<AppRootStateType, TaskType>(state => state.tasks['todolistId1'][0])
    return <Task task={task} todolistId={'todolistId1'}/>
}

const Template: ComponentStory<typeof Task> = (args) => <TaskCopy />

export const TaskIsNotDoneStory = Template.bind({});

TaskIsNotDoneStory.args = {
    task: {
        id: '1',
        title: 'Task is not done',
        isDone: false
    },
}

// const Template1: ComponentStory<typeof Task> = (args) => {
//     const [task, setTask] = useState({
//         id: '1',
//         title: 'Task is not done',
//         isDone: false
//     })
//
//     return (
//         <Task task={task} todolistId={args.todolistId}/>
//     );
// }
