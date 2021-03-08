import React from "react";
import {FilterValuesType, TodolistTaskType} from "./App";

type TodolistPropsType = {
    title: string
    tasks: Array<TodolistTaskType>
    changeTodoListFilter: (newFilterValue: FilterValuesType) => void
    removeTask: (taskID: number) => void
};


export function Todolist(props: TodolistPropsType) {

    const tasks = props.tasks.map(t => {
        const removeTask = ()=>props.removeTask(t.id)
        return (
            <li key={t.id}>
                <input type="checkbox" checked={t.isDone}/>
                <span>{t.title}</span>
                <button onClick={removeTask}>X</button>
            </li>
        );
    })

    const setAllFilterValue = ()=>props.changeTodoListFilter("all")
    const setActiveFilterValue = ()=>{props.changeTodoListFilter("active")}
    const setCompletedFilterValue = ()=>{props.changeTodoListFilter("completed")}

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input/>
                <button>+</button>
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