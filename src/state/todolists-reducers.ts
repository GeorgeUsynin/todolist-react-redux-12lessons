import {FilterValuesType, TodoListType} from "../App";
import {v1} from "uuid";

type RemoveTodoListActionType = {
    type: 'REMOVE_TODOLIST'
    todoListID: string
}

type AddTodoListActionType = {
    type: 'ADD_TODOLIST'
    title: string
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

type ActionsType = RemoveTodoListActionType | AddTodoListActionType | ChangeTodoListFilterActionType | ChangeTodoListTitleActionType

export const todoListsReducer = (todoLists: Array<TodoListType>, action: ActionsType): Array<TodoListType> => {
    switch (action.type){
        case "REMOVE_TODOLIST":
            return todoLists.filter(tl => tl.id !== action.todoListID)
        case "ADD_TODOLIST":
            const newTodoListID = v1()
            const newTodoList: TodoListType = {
                id: newTodoListID,
                title: action.title,
                filterValue: 'all'
            }
            return [...todoLists, newTodoList]
        case "CHANGE_TODOLIST_FILTER":
            return todoLists.map(tl => tl.id === action.todoListID ? {...tl, filterValue: action.newFilterValue} : tl)
        case "CHANGE_TODOLIST_TITLE":
            return todoLists.map(tl => tl.id === action.todoListID ? {...tl, title: action.newTitle} : tl)
        default:
            return todoLists
    }
}

export const RemoveTodoListAC = (id: string) : RemoveTodoListActionType  => {
    return {
        type: 'REMOVE_TODOLIST',
        todoListID: id
    }
}