import {FilterValuesType, TodoListType} from "../App";
import {v1} from "uuid";

export type RemoveTodoListActionType = {
    type: 'REMOVE_TODOLIST'
    todoListID: string
}

export type AddTodoListActionType = {
    type: 'ADD_TODOLIST'
    title: string
    newTodoListID: string
}

type ChangeTodoListFilterActionType = {
    type: 'CHANGE_TODOLIST_FILTER'
    newFilterValue: FilterValuesType
    todoListID: string
}

type ChangeTodoListTitleActionType = {
    type: 'CHANGE_TODOLIST_TITLE'
    newTitle: string
    todoListID: string
}

type ActionsType =
    RemoveTodoListActionType
    | AddTodoListActionType
    | ChangeTodoListFilterActionType
    | ChangeTodoListTitleActionType

const initialState: Array<TodoListType> = []


export const todoListsReducer = (state: Array<TodoListType> = initialState, action: ActionsType): Array<TodoListType> => {
    switch (action.type) {
        case "REMOVE_TODOLIST":
            return state.filter(tl => tl.id !== action.todoListID)
        case "ADD_TODOLIST":
            const newTodoList: TodoListType = {
                id: action.newTodoListID,
                title: action.title,
                filterValue: 'all'
            }
            return [...state, newTodoList]
        case "CHANGE_TODOLIST_FILTER":
            return state.map(tl => tl.id === action.todoListID ? {...tl, filterValue: action.newFilterValue} : tl)
        case "CHANGE_TODOLIST_TITLE":
            return state.map(tl => tl.id === action.todoListID ? {...tl, title: action.newTitle} : tl)
        default:
            return state
    }
}

export const removeTodoListAC = (id: string): RemoveTodoListActionType => {
    return {
        type: 'REMOVE_TODOLIST',
        todoListID: id
    }
}

export const addTodoListAC = (title: string): AddTodoListActionType => {
    return {
        type: "ADD_TODOLIST",
        title: title,
        newTodoListID: v1()
    }
}

export const changeTodoListFilterAC = (newFilterValue: FilterValuesType, todoListID: string): ChangeTodoListFilterActionType => {
    return {
        type: "CHANGE_TODOLIST_FILTER",
        newFilterValue: newFilterValue,
        todoListID: todoListID
    }
}

export const changeTodoListTitleAC = (newTitle: string, todoListID: string): ChangeTodoListTitleActionType => {
    return {
        type: "CHANGE_TODOLIST_TITLE",
        newTitle: newTitle,
        todoListID: todoListID
    }
}
