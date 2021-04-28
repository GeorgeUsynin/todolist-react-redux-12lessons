import {TasksStateType, TodolistTaskType} from "../App";
import {v1} from "uuid";
import {AddTodoListActionType, RemoveTodoListActionType} from "./todolists-reducer";

type RemoveTaskActionType = {
    type: 'REMOVE_TASK'
    taskID: string
    todoListID: string
}

type AddTasksActionType = {
    type: 'ADD_TASK'
    newTitle: string
    todoListID: string
}

type ChangeTaskStatusActionType = {
    type: 'CHANGE_TASK_STATUS'
    taskID: string
    newIsDone: boolean
    todoListID: string
}

type ChangeTaskTitleActionType = {
    type: 'CHANGE_TASK_TITLE'
    taskID: string
    newTitle: string
    todoListID: string
}

type ActionsType = RemoveTaskActionType | AddTasksActionType | ChangeTaskStatusActionType | ChangeTaskTitleActionType | AddTodoListActionType | RemoveTodoListActionType


export const tasksReducer = (tasks: TasksStateType, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE_TASK':
            const filteredTasks = tasks[action.todoListID].filter(t => t.id !== action.taskID)
            return {...tasks, [action.todoListID]: filteredTasks}
        case 'ADD_TASK':{
            const newTask: TodolistTaskType = {
                id: v1(),
                title: action.newTitle,
                isDone: false
            }
            const updatedTasks = [newTask, ...tasks[action.todoListID]]
            return {...tasks, [action.todoListID]: updatedTasks}
        }
        case "CHANGE_TASK_STATUS": {
            const updatedTasks = tasks[action.todoListID].map(t => {
                if (t.id === action.taskID) {
                    return {...t, isDone: action.newIsDone}
                }
                return t
            })
            return {...tasks, [action.todoListID]: updatedTasks}
        }
        case "CHANGE_TASK_TITLE": {
            const updatedTasks = tasks[action.todoListID].map(t => {
                if (t.id === action.taskID) {
                    return {...t, title: action.newTitle}
                }
                return t
            })
            return {...tasks, [action.todoListID]: updatedTasks}
        }
        case "ADD_TODOLIST":{
            return {...tasks, [action.newTodoListID]: []}
        }
        case "REMOVE_TODOLIST":{
            const copyState = {...tasks}
            delete copyState[action.todoListID]
            return copyState
        }
        default:
            return tasks
    }
}

export const removeTasksAC = (taskID: string, todoListID: string): RemoveTaskActionType => {
    return {
        type: 'REMOVE_TASK',
        taskID,
        todoListID
    }
}

export const addTaskAC = (newTitle: string, todoListID: string): AddTasksActionType => {
    return {
        type: 'ADD_TASK',
        newTitle,
        todoListID
    }
}

export const changeTaskStatusAC = (taskID: string, newIsDone: boolean, todoListID: string): ChangeTaskStatusActionType => {
    return {
        type: 'CHANGE_TASK_STATUS',
        taskID,
        newIsDone,
        todoListID
    }
}

export const changeTaskTitleAC = (taskID: string, newTitle: string, todoListID: string): ChangeTaskTitleActionType => {
    return {
        type: 'CHANGE_TASK_TITLE',
        taskID,
        newTitle,
        todoListID
    }
}

