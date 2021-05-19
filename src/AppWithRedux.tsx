import React, {useCallback} from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography,} from "@material-ui/core";
import {Menu} from '@material-ui/icons';
import {
    addTodoListAC,
    changeTodoListFilterAC,
    changeTodoListTitleAC,
    removeTodoListAC
} from "./state/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTasksAC} from "./state/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {selectTasks, selectTodoLists} from "./state/selectors";

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

export function AppWithRedux() {

    //BLL:

    // method 1 to use useSelector
    // let todoLists = useSelector<AppRootStateType, TodoListType[]>(state => state.todoLists)
    // let tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)

    // method 2 to use useSelector
    const todoLists = useSelector(selectTodoLists)
    const tasks = useSelector(selectTasks)

    const dispatch = useDispatch()

    const removeTask = useCallback((taskID: string, todoListID: string)=> {
        dispatch(removeTasksAC(taskID, todoListID))
    },[dispatch])

    const addTask = useCallback((title: string, todoListID: string)=> {
        dispatch(addTaskAC(title, todoListID))
    },[dispatch])

    const changeTaskStatus = useCallback((taskID: string, newIsDone: boolean, todoListID: string)=> {
        dispatch(changeTaskStatusAC(taskID, newIsDone, todoListID))

    },[dispatch])

    const changeTaskTitle = useCallback((taskID: string, newTitle: string, todoListID: string)=> {
        dispatch(changeTaskTitleAC(taskID, newTitle, todoListID))

    },[dispatch])

    const changeTodListTile = useCallback((newTitle: string, todoListID: string)=> {
        dispatch(changeTodoListTitleAC(newTitle, todoListID))
    },[dispatch])

    const changeTodoListFilter = useCallback((newFilterValue: FilterValuesType, todoListID: string)=> {
        dispatch(changeTodoListFilterAC(newFilterValue, todoListID))
    },[dispatch])

    const removeTodolist = useCallback((todoListID: string) => {
        dispatch(removeTodoListAC(todoListID))
    },[dispatch])

    const addTodoList = useCallback((title: string) => {

        //так как мы диспатчим экшн в оба редюсера, чтобы наш экшн был с одинаковой todolistID
        //для обоих редюсеров, то мы сначала создадим экшн, а потом отдами его диспатчу
        // const action = addTodoListAC(title)
        // dispatchToTasks(action)

        dispatch(addTodoListAC(title))
    }, [dispatch])

    //UI:

    const mappedTodoLists = todoLists.map(tl => {
        return (
            <Grid item key={tl.id}>
                <Paper elevation={6} style={{padding: '10px'}}>
                    <Todolist title={tl.title}
                              id={tl.id}
                              filter={tl.filterValue}
                              tasks={tasks[tl.id]}
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
