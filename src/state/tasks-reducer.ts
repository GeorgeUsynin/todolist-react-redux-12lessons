import {TodolistTaskType} from "../App";
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

export type TasksStateType = {
    [key: string]: TodolistTaskType[]
}

type ActionsType =
    RemoveTaskActionType
    | AddTasksActionType
    | ChangeTaskStatusActionType
    | ChangeTaskTitleActionType
    | AddTodoListActionType
    | RemoveTodoListActionType

const initialState: TasksStateType = {}

export const tasksReducer = (state: TasksStateType = initialState, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE_TASK':
            const filteredTasks = state[action.todoListID].filter(t => t.id !== action.taskID)
            return {...state, [action.todoListID]: filteredTasks}
        case 'ADD_TASK': {
            const newTask: TodolistTaskType = {
                id: v1(),
                title: action.newTitle,
                isDone: false
            }
            const updatedTasks = [newTask, ...state[action.todoListID]]
            return {...state, [action.todoListID]: updatedTasks}
        }
        case "CHANGE_TASK_STATUS": {
            const updatedTasks = state[action.todoListID].map(t => {
                if (t.id === action.taskID) {
                    return {...t, isDone: action.newIsDone}
                }
                return t
            })
            return {...state, [action.todoListID]: updatedTasks}
        }
        case "CHANGE_TASK_TITLE": {
            const updatedTasks = state[action.todoListID].map(t => {
                if (t.id === action.taskID) {
                    return {...t, title: action.newTitle}
                }
                return t
            })
            return {...state, [action.todoListID]: updatedTasks}
        }
        case "ADD_TODOLIST": {
            return {...state, [action.newTodoListID]: []}
        }
        case "REMOVE_TODOLIST": {
            const copyState = {...state}
            delete copyState[action.todoListID]
            return copyState
        }
        default:
            return state
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

