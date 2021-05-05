import React, {useReducer, useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, IconButton, Typography, Toolbar, Container, Grid, Paper,} from "@material-ui/core";
import {Menu} from '@material-ui/icons';
import {
    addTodoListAC,
    changeTodoListFilterAC,
    changeTodoListTitleAC,
    removeTodoListAC,
    todoListsReducer
} from "./state/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTasksAC, tasksReducer} from "./state/tasks-reducer";

export type TodolistTaskType = {
    id: string;
    title: string;
    isDone: boolean;
}

export type FilterValuesType = "all" | "active" | "completed"

export type TodoListType = {
    id: string
    title: string
    filterValue: FilterValuesType
}

export type TasksStateType = {
    [key: string]: TodolistTaskType[]
}

function AppWithReducer() {

    //BLL:

    const todoList_ID_1 = v1()
    const todoList_ID_2 = v1()


    const [todoLists, dispatchToTodoLists] = useReducer(todoListsReducer, [
        {id: todoList_ID_1, title: 'What to learn', filterValue: 'all'},
        {id: todoList_ID_2, title: 'What to buy', filterValue: 'all'}
    ])


    const [tasks, dispatchToTasks] = useReducer(tasksReducer,{
        [todoList_ID_1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false}
        ],
        [todoList_ID_2]: [
            {id: v1(), title: "Milk", isDone: true},
            {id: v1(), title: "Bread", isDone: false},
            {id: v1(), title: "Cheese", isDone: false}
        ]
    })

    function removeTask(taskID: string, todoListID: string) {
        dispatchToTasks(removeTasksAC(taskID,todoListID))
    }

    function addTask(title: string, todoListID: string) {
        dispatchToTasks(addTaskAC(title,todoListID))
    }

    function changeTaskStatus(taskID: string, newIsDone: boolean, todoListID: string) {
        dispatchToTasks(changeTaskStatusAC(taskID,newIsDone,todoListID))

    }

    function changeTaskTitle(taskID: string, newTitle: string, todoListID: string) {
        dispatchToTasks(changeTaskTitleAC(taskID,newTitle,todoListID))

    }

    function changeTodListTile(newTitle: string, todoListID: string) {
        dispatchToTodoLists(changeTodoListTitleAC(newTitle,todoListID))
    }

    function changeTodoListFilter(newFilterValue: FilterValuesType, todoListID: string) {
        dispatchToTodoLists(changeTodoListFilterAC(newFilterValue,todoListID))
    }

    const removeTodolist = (todoListID: string) => {
        dispatchToTodoLists(removeTodoListAC(todoListID))
        dispatchToTasks(removeTodoListAC(todoListID))
    }

    function addTodoList(title: string) {

        //так как мы диспатчим экшн в оба редюсера, чтобы наш экшн был с одинаковой todolistID
        //для обоих редюсеров, то мы сначала создадим экшн, а потом отдами его диспатчу
        const action = addTodoListAC(title)

        dispatchToTasks(action)
        dispatchToTodoLists(action)
    }

     //UI:

    function getTasksForTodoList(todoList: TodoListType): TodolistTaskType[] {
        switch (todoList.filterValue) {
            case "active":
                return tasks[todoList.id].filter(t => !t.isDone)
            case "completed":
                return tasks[todoList.id].filter(t => t.isDone)
            default:
                return tasks[todoList.id]
        }
    }

    const mappedTodoLists = todoLists.map(tl => {
        return (
            <Grid item key={tl.id}>
                <Paper elevation={6} style={{padding: '10px'}}>
                    <Todolist title={tl.title}
                              id={tl.id}
                              filter={tl.filterValue}
                              tasks={getTasksForTodoList(tl)}
                              addTask={addTask}
                              removeTask={removeTask}
                              changeTaskStatus={changeTaskStatus}
                              changeTaskTitle={changeTaskTitle}
                              changeTodListTile={changeTodListTile}
                              changeTodoListFilter={changeTodoListFilter}
                              removeTodolist={removeTodolist}
                    />
                </Paper>
            </Grid>
        )
    })

    //UI:

    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar style={{justifyContent: 'space-between'}}>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        TodoLists
                    </Typography>
                    <Button style={{margin: '10px'}}
                            variant={'outlined'} color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding: '20px 0'}}>
                    <AddItemForm addItem={addTodoList}/>
                </Grid>
                <Grid container spacing={3}>
                    {mappedTodoLists}
                </Grid>
            </Container>
        </div>
    );
}

export default AppWithReducer;
