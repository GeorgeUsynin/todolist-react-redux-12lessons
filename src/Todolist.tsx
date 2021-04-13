import React, {ChangeEvent} from "react";
import {FilterValuesType, TodolistTaskType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, Checkbox, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";

type TodolistPropsType = {
    title: string
    tasks: Array<TodolistTaskType>
    changeTodoListFilter: (newFilterValue: FilterValuesType, todoListID: string) => void
    removeTask: (taskID: string, todoListID: string) => void
    removeTodolist: (todoListID: string) => void
    addTask: (title: string, todoListID: string) => void
    filter: FilterValuesType
    changeTaskStatus: (taskID: string, newIsDone: boolean, todoListID: string) => void
    changeTaskTitle: (taskID: string, newTitle: string, todoListID: string) => void
    changeTodListTile: (newTitle: string, todoListID: string) => void
    id: string
};


export function Todolist(props: TodolistPropsType) {


    const tasks = props.tasks.map(t => {
        const removeTask = () => props.removeTask(t.id, props.id)
        const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => props.changeTaskStatus(t.id, e.currentTarget.checked, props.id)
        const changeTaskTitle = (title: string) => props.changeTaskTitle(t.id, title, props.id)
        return (
            <li key={t.id} className={t.isDone ? 'done_task' : ''}>
                {/*<input*/}
                {/*    onChange={changeTaskStatus}*/}
                {/*    type="checkbox" checked={t.isDone}/>*/}

                <Checkbox checked={t.isDone} onChange={changeTaskStatus}/>

                <EditableSpan title={t.title} changeTitle={changeTaskTitle}/>
                <IconButton onClick={removeTask}>
                    <Delete/>
                </IconButton>
            </li>
        );
    })

    const changeTodListTile = (newTitle: string) => {
        props.changeTodListTile(newTitle, props.id)
    }

    const setAllFilterValue = () => {
        props.changeTodoListFilter("all", props.id)
    }
    const setActiveFilterValue = () => {
        props.changeTodoListFilter("active", props.id)
    }
    const setCompletedFilterValue = () => {
        props.changeTodoListFilter("completed", props.id)
    }

    const removeTodolist = () => props.removeTodolist(props.id)

    const addTask = (title: string) => {
        props.addTask(title, props.id)
    }

    const allButtonColor = props.filter === 'all' ? 'secondary' : 'default'
    const activeButtonColor = props.filter === 'active' ? 'secondary' : 'default'
    const completedButtonColor = props.filter === 'completed' ? 'secondary' : 'default'

    return (
        <div>
            <h3>
                <EditableSpan title={props.title} changeTitle={changeTodListTile}/>
                <IconButton onClick={removeTodolist}>
                    <Delete/>
                </IconButton>
            </h3>

            <AddItemForm addItem={addTask}/>
            <ul>
                {tasks}
            </ul>
            <div>
                <Button size={'small'} color={allButtonColor} variant={'contained'}
                        onClick={setAllFilterValue}>All</Button>
                <Button style={{margin: '10px'}} size={'small'} color={activeButtonColor} variant={'contained'}
                        onClick={setActiveFilterValue}>Active</Button>
                <Button size={'small'} color={completedButtonColor}
                        variant={'contained'}
                        onClick={setCompletedFilterValue}>Completed</Button>
            </div>
        </div>
    );
}