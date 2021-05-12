import React, {ChangeEvent, useCallback} from "react";
import {FilterValuesType, TodolistTaskType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, Checkbox, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {Task} from "./Task";

type TodolistPropsType = {
    title: string
    tasks: Array<TodolistTaskType>
    changeTodoListFilter: (newFilterValue: FilterValuesType, todoListID: string) => void
    removeTask: (taskID: string, todoListID: string) => void
    removeTodolist: (todoListID: string) => void
    addTask: (title: string, todoListID: string) => void
    filter: FilterValuesType
    changeTaskStatus: (taskID: string, newIsDone: boolean, todoListID: string) => void
    changeTaskTitle: (taskID: string, newTitle: string, todoListID: string) => void
    changeTodListTile: (newTitle: string, todoListID: string) => void
    id: string
};


export const Todolist = React.memo((props: TodolistPropsType) => {

    const removeTask = useCallback((taskId: string) => props.removeTask(taskId, props.id), [props.removeTask, props.id])
    const changeTaskStatus = useCallback((taskId: string, newIsDone: boolean) => props.changeTaskStatus(taskId, newIsDone, props.id), [props.changeTaskStatus, props.id])
    const changeTaskTitle = useCallback((taskId: string, newTitle: string) => props.changeTaskTitle(taskId, newTitle, props.id), [props.changeTaskTitle, props.id])

    const tasks = getTasksForTodoList().map(t => {
        return <Task
            key={t.id}
            task={t}
            removeTask={removeTask}
            changeTaskStatus={changeTaskStatus}
            changeTaskTitle={changeTaskTitle}
        />
    })

    const changeTodListTile = useCallback((newTitle: string) => {
        props.changeTodListTile(newTitle, props.id)
    }, [])

    const setAllFilterValue = useCallback(() => {
        props.changeTodoListFilter("all", props.id)
    }, [props.changeTodoListFilter, props.id])

    const setActiveFilterValue = useCallback(() => {
        props.changeTodoListFilter("active", props.id)
    }, [props.changeTodoListFilter, props.id])

    const setCompletedFilterValue = useCallback(() => {
        props.changeTodoListFilter("completed", props.id)
    }, [props.changeTodoListFilter, props.id])

    const removeTodolist = () => props.removeTodolist(props.id)

    const addTask = useCallback((title: string) => {
        props.addTask(title, props.id)
    }, [props.addTask, props.id])

    const allButtonColor = props.filter === 'all' ? 'secondary' : 'default'
    const activeButtonColor = props.filter === 'active' ? 'secondary' : 'default'
    const completedButtonColor = props.filter === 'completed' ? 'secondary' : 'default'

    function getTasksForTodoList(): TodolistTaskType[] {
        switch (props.filter) {
            case "active":
                return props.tasks.filter(t => !t.isDone)
            case "completed":
                return props.tasks.filter(t => t.isDone)
            default:
                return props.tasks
        }
    }

    return (
        <div>
            <h3>
                <EditableSpan title={props.title} changeTitle={changeTodListTile}/>
                <IconButton onClick={removeTodolist}>
                    <Delete/>
                </IconButton>
            </h3>

            <AddItemForm addItem={addTask}/>
            <ul>
                {tasks}
            </ul>
            <div>
                <Button size={'small'} color={allButtonColor} variant={'contained'}
                        onClick={setAllFilterValue}>All</Button>
                <Button style={{margin: '10px'}} size={'small'} color={activeButtonColor} variant={'contained'}
                        onClick={setActiveFilterValue}>Active</Button>
                <Button size={'small'} color={completedButtonColor}
                        variant={'contained'}
                        onClick={setCompletedFilterValue}>Completed</Button>
            </div>
        </div>
    );
})