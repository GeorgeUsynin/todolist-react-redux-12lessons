import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, IconButton, Typography, Toolbar, Container, Grid, Paper,} from "@material-ui/core";
import {Menu} from '@material-ui/icons';

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

function App() {

    //BLL:

    const todoList_ID_1 = v1()
    const todoList_ID_2 = v1()

    const [todoLists, setTodoLists] = useState<TodoListType[]>([
        {id: todoList_ID_1, title: 'What to learn', filterValue: 'all'},
        {id: todoList_ID_2, title: 'What to buy', filterValue: 'all'}
    ])

    const [tasks, setTasks] = useState<TasksStateType>({
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

        const filteredTasks = tasks[todoListID].filter(t => t.id !== taskID)
        setTasks({...tasks, [todoListID]: filteredTasks})
    }

    function addTask(title: string, todoListID: string) {
        const newTask: TodolistTaskType = {
            id: v1(),
            title,
            // title: title
            isDone: false
        }
        const updatedTasks = [newTask, ...tasks[todoListID]]

        setTasks({...tasks, [todoListID]: updatedTasks})
    }

    function changeTaskStatus(taskID: string, newIsDone: boolean, todoListID: string) {
        const updatedTasks = tasks[todoListID].map(t => {
            if (t.id === taskID) {
                return {...t, isDone: newIsDone}
            }
            return t
        })
        setTasks({...tasks, [todoListID]: updatedTasks})

    }

    function changeTaskTitle(taskID: string, newTitle: string, todoListID: string) {
        const updatedTasks = tasks[todoListID].map(t => {
            if (t.id === taskID) {
                return {...t, title: newTitle}
            }
            return t
        })

        setTasks({...tasks, [todoListID]: updatedTasks})

    }

    function changeTodListTile(newTitle: string, todoListID: string) {
        const updatedTodoLists = todoLists.map(tl => tl.id === todoListID ? {...tl, title: newTitle} : tl)
        setTodoLists(updatedTodoLists)
    }

    function changeTodoListFilter(newFilterValue: FilterValuesType, todoListID: string) {
        const updatedTodoLists = todoLists.map(tl => tl.id === todoListID ? {...tl, filterValue: newFilterValue} : tl)
        setTodoLists(updatedTodoLists)
    }

    const removeTodolist = (todoListID: string) => {
        const updatedTodoLists = todoLists.filter(tl => tl.id !== todoListID)
        setTodoLists(updatedTodoLists)
        delete tasks[todoListID]
    }

    function addTodoList(title: string) {
        const newTodoListID = v1()
        const newTodoList: TodoListType = {
            id: newTodoListID,
            title,
            filterValue: 'all'
        }
        setTodoLists([...todoLists, newTodoList])
        setTasks({...tasks, [newTodoListID]: []})
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
            <Grid item>
                <Paper elevation={6} style={{padding: '10px'}}>
                    <Todolist title={tl.title}
                              key={tl.id}
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

export default App;
