import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {v1} from "uuid";
import {isBoolean} from "util";

export type TodolistTaskType = {
    id: string;
    title: string;
    isDone: boolean;
}

export type FilterValuesType = "all" | "active" | "completed"

function App() {

    const [tasks, setTasks] = useState<Array<TodolistTaskType>>([
        {id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "ReactJS", isDone: false}
    ])

    function removeTask(taskID: string) {
        setTasks(tasks.filter(t => t.id !== taskID))
    }

    function addTask(title: string) {
        const task: TodolistTaskType = {
            id: v1(),
            title,
            // title: title
            isDone: false
        }
        const newTasks = [task, ...tasks]
        setTasks(newTasks)

    }

    function changeTaskStatus (taskID: string, newIsDone: boolean) {
        const updatedTasks = tasks.map(t => {
            if (t.id === taskID) {
                return {...t, isDone: newIsDone}
            }
            return t
        })
        setTasks(updatedTasks)

    }

    //const todoListFilter: FilterValuesType = "all";

    const [todoListFilter, setTodoListFilter] = useState<FilterValuesType>("all")


    function changeTodoListFilter(newFilterValue: FilterValuesType) {
        setTodoListFilter(newFilterValue)
    }

    function getTasksForTodoList() {
        switch (todoListFilter) {
            case "active":
                return tasks.filter(t => !t.isDone)
            case "completed":
                return tasks.filter(t => t.isDone)
            default:
                return tasks
        }
    }


    return (
        <div className="App">
            <Todolist title={"What to learn"}
                      tasks={getTasksForTodoList()}
                      changeTodoListFilter={changeTodoListFilter}
                      removeTask={removeTask}
                      addTask={addTask}
                      filter={todoListFilter}
                      changeTaskStatus={changeTaskStatus}
            />

        </div>
    );
}


export default App;
