import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";

export type TodolistTaskType = {
    id: number;
    title: string;
    isDone: boolean;
}

export type FilterValuesType = "all" | "active" | "completed"

function App() {

    const tasks: Array<TodolistTaskType> = [
        {id: 1, title: "HTML&CSS", isDone: true},
        {id: 2, title: "JS", isDone: true},
        {id: 3, title: "ReactJS", isDone: false}
    ];


    //const todoListFilter: FilterValuesType = "all";

    const [todoListFilter, setTodoListFilter] = useState<FilterValuesType>("all")


    function changeTodoListFilter (newFilterValue: FilterValuesType){
        setTodoListFilter(newFilterValue)
    }



    function getTasksForTodoList() {
        switch (todoListFilter) {
            case "active":
                return tasks.filter(t => t.isDone === false)
            case "completed":
                return tasks.filter(t => t.isDone === true)
            default:
                return tasks
        }
    }


    return (
        <div className="App">
            <Todolist title={"What to learn"}
                      tasks={getTasksForTodoList()}
                      changeTodoListFilter = {changeTodoListFilter}
            />

        </div>
    );
}


export default App;
