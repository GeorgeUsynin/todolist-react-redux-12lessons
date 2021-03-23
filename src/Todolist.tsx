import React, {ChangeEvent, useState, KeyboardEvent} from "react";
import {FilterValuesType, TodolistTaskType} from "./App";

type TodolistPropsType = {
    title: string
    tasks: Array<TodolistTaskType>
    changeTodoListFilter: (newFilterValue: FilterValuesType) => void
    removeTask: (taskID: string) => void
    addTask: (title: string) => void
    filter: FilterValuesType
    changeTaskStatus: (taskID: string, newIsDone: boolean) => void
};


export function Todolist(props: TodolistPropsType) {

    const [title, setTitle] = useState<string>("")
    const [error, setError] = useState<string | null>(null)

    const tasks = props.tasks.map(t => {
        const removeTask = () => props.removeTask(t.id)
        const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => props.changeTaskStatus(t.id, e.currentTarget.checked)
        return (
            <li key={t.id}>
                <input
                    onChange={changeTaskStatus}
                    type="checkbox" checked={t.isDone}/>
                <span>{t.title}</span>
                <button className="btn-remove" onClick={removeTask}>X</button>
            </li>
        );
    })
    const setAllFilterValue = () => props.changeTodoListFilter("all")
    const setActiveFilterValue = () => {
        props.changeTodoListFilter("active")
    }
    const setCompletedFilterValue = () => {
        props.changeTodoListFilter("completed")
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
            props.addTask(trimmedTitle)
        }else{
            setError('Title is required !')
        }
        setTitle("")
    }

    const active_filter_all = props.filter === 'all' ? 'active_filter' : ''
    const active_filter_active = props.filter === 'active' ? 'active_filter' : ''
    const active_filter_completed = props.filter === 'completed' ? 'active_filter' : ''
    const errorMessage = error && <div className={'error'}>{error}</div>

    return (
        <div>
            <h3>{props.title}</h3>
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