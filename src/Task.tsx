import React, {ChangeEvent, useState} from "react";
import {Checkbox, IconButton, TextField} from "@material-ui/core";
import {EditableSpan} from "./EditableSpan";
import {Delete} from "@material-ui/icons";
import {TodolistTaskType} from "./AppWithRedux";

type TaskPropsType = {
    task: TodolistTaskType
    removeTask: (taskID: string) => void
    changeTaskStatus: (taskID: string, newIsDone: boolean) => void
    changeTaskTitle: (taskID: string, newTitle: string) => void
}

export const Task = React.memo((props: TaskPropsType) => {

    const {
        task,
        changeTaskStatus,
        changeTaskTitle,
        removeTask
    } = props

    const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
        changeTaskStatus(task.id, e.currentTarget.checked)
    }
    const changeTitleHandler = (newTitle: string) => {
        changeTaskTitle(task.id, newTitle)
    }
    const removeTaskHandler = () => {
        removeTask(task.id)
    }

    return (
        <li key={task.id} className={task.isDone ? 'done_task' : ''}>
            {/*<input*/}
            {/*    onChange={changeTaskStatus}*/}
            {/*    type="checkbox" checked={t.isDone}/>*/}

            <Checkbox checked={task.isDone} onChange={changeTaskStatusHandler}/>

            <EditableSpan title={task.title} changeTitle={changeTitleHandler}/>
            <IconButton onClick={removeTaskHandler}>
                <Delete/>
            </IconButton>
        </li>
    )
})
