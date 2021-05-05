import React, {Dispatch, useReducer, useState} from 'react';
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
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/redux-store";

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




function AppWithRedux() {

    //BLL:

    let todoLists = useSelector<AppRootStateType, TodoListType[]>(state => state.todoLists)
    let tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)

    const dispatch = useDispatch()


    function removeTask(taskID: string, todoListID: string) {
        dispatch(removeTasksAC(taskID,todoListID))
    }

    function addTask(title: string, todoListID: string) {
        dispatch(addTaskAC(title,todoListID))
    }

    function changeTaskStatus(taskID: string, newIsDone: boolean, todoListID: string) {
        dispatch(changeTaskStatusAC(taskID,newIsDone,todoListID))

    }

    function changeTaskTitle(taskID: string, newTitle: string, todoListID: string) {
        dispatch(changeTaskTitleAC(taskID,newTitle,todoListID))

    }

    function changeTodListTile(newTitle: string, todoListID: string) {
        dispatch(changeTodoListTitleAC(newTitle,todoListID))
    }

    function changeTodoListFilter(newFilterValue: FilterValuesType, todoListID: string) {
        dispatch(changeTodoListFilterAC(newFilterValue,todoListID))
    }

    const removeTodolist = (todoListID: string) => {
        dispatch(removeTodoListAC(todoListID))
    }

    function addTodoList(title: string) {

        //так как мы диспатчим экшн в оба редюсера, чтобы наш экшн был с одинаковой todolistID
        //для обоих редюсеров, то мы сначала создадим экшн, а потом отдами его диспатчу
        // const action = addTodoListAC(title)
        // dispatchToTasks(action)

        dispatch(addTodoListAC(title))
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

export default AppWithRedux;
