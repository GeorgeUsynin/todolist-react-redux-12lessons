import React, {ChangeEvent, useState, KeyboardEvent} from "react";
import {FilterValuesType, TodolistTaskType} from "./App";

type TodolistPropsType = {
    title: string
    tasks: Array<TodolistTaskType>
    changeTodoListFilter: (newFilterValue: FilterValuesType) => void
    removeTask: (taskID: string) => void
    addTask: (title: string) => void
};


export function Todolist(props: TodolistPropsType) {

    const [title, setTitle] = useState<string>("")


    const tasks = props.tasks.map(t => {
        const removeTask = () => props.removeTask(t.id)
        return (
            <li key={t.id}>
                <input type="checkbox" checked={t.isDone}/>
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
    const changeTitle = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value)
    const onKeyPressAddTask = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            onAddTask()
        }
    }
    const onAddTask = () => {
        props.addTask(title)
        setTitle("")
    }

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input
                    value={title}
                    onChange={changeTitle}
                    onKeyPress={onKeyPressAddTask}
                />
                <button onClick={onAddTask}>+</button>
            </div>
            <ul>
                {tasks}
            </ul>
            <div>
                <button onClick={setAllFilterValue}>All</button>
                <button onClick={setActiveFilterValue}>Active</button>
                <button onClick={setCompletedFilterValue}>Completed</button>
            </div>
        </div>
    );
}