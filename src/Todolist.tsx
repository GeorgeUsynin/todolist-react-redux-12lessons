import React, {ChangeEvent, useState, KeyboardEvent} from "react";
import {FilterValuesType, TodolistTaskType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";

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
                <input
                    onChange={changeTaskStatus}
                    type="checkbox" checked={t.isDone}/>
                <EditableSpan title={t.title} changeTitle={changeTaskTitle}/>
                <button className="btn-remove" onClick={removeTask}>X</button>
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

    const active_filter_all = props.filter === 'all' ? 'active_filter' : ''
    const active_filter_active = props.filter === 'active' ? 'active_filter' : ''
    const active_filter_completed = props.filter === 'completed' ? 'active_filter' : ''

    return (
        <div>
            <h3>
                <EditableSpan title={props.title} changeTitle={changeTodListTile}/>
                <button onClick={removeTodolist}>x</button>
            </h3>

            <AddItemForm addItem={addTask}/>
            <ul>
                {tasks}
            </ul>
            <div>
                <button className={active_filter_all} onClick={setAllFilterValue}>All</button>
                <button className={active_filter_active} onClick={setActiveFilterValue}>Active</button>
                <button className={active_filter_completed} onClick={setCompletedFilterValue}>Completed</button>
            </div>
        </div>
    );
}