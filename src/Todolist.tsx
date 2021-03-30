import React, {ChangeEvent, useState, KeyboardEvent} from "react";
import {FilterValuesType, TodolistTaskType} from "./App";

type TodolistPropsType = {
    title: string
    tasks: Array<TodolistTaskType>
    changeTodoListFilter: (newFilterValue: FilterValuesType, todoListID: string) => void
    removeTask: (taskID: string, todoListID: string) => void
    removeTodolist: (todoListID: string) => void
    addTask: (title: string, todoListID: string) => void
    filter: FilterValuesType
    changeTaskStatus: (taskID: string, newIsDone: boolean, todoListID: string) => void
    id: string
};


export function Todolist(props: TodolistPropsType) {

    const [title, setTitle] = useState<string>("")
    const [error, setError] = useState<string | null>(null)

    const tasks = props.tasks.map(t => {
        const removeTask = () => props.removeTask(t.id, props.id)
        const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => props.changeTaskStatus(t.id, e.currentTarget.checked, props.id)
        return (
            <li key={t.id}>
                <input
                    onChange={changeTaskStatus}
                    type="checkbox" checked={t.isDone}/>
                <span className={t.isDone ? 'done_task' : ''}>{t.title}</span>
                <button className="btn-remove" onClick={removeTask}>X</button>
            </li>
        );
    })
    const setAllFilterValue = () => {
        props.changeTodoListFilter("all", props.id)
    }
    const setActiveFilterValue = () => {
        props.changeTodoListFilter("active", props.id)
    }
    const setCompletedFilterValue = () => {
        props.changeTodoListFilter("completed", props.id)
    }
    const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setError(null)
        setTitle(e.currentTarget.value)
    }
    const onKeyPressAddTask = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            onAddTask()
        }
    }
    const onAddTask = () => {

        const trimmedTitle = title.trim()

        if (trimmedTitle) {
            props.addTask(trimmedTitle, props.id)
        }else{
            setError('Title is required !')
        }
        setTitle("")
    }

    const removeTodolist = ()=> props.removeTodolist(props.id)

    const active_filter_all = props.filter === 'all' ? 'active_filter' : ''
    const active_filter_active = props.filter === 'active' ? 'active_filter' : ''
    const active_filter_completed = props.filter === 'completed' ? 'active_filter' : ''
    const errorMessage = error && <div className={'error'}>{error}</div>

    return (
        <div>
            <h3>{props.title}<button onClick={removeTodolist}>x</button></h3>
            <div>
                <input
                    value={title}
                    onChange={changeTitle}
                    onKeyPress={onKeyPressAddTask}
                    className={error ? 'input_error' : ''}
                />
                <button onClick={onAddTask}>+</button>
                {errorMessage}
            </div>
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