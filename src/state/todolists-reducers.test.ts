import {RemoveTodoListAC, todoListsReducer} from './todolists-reducers';
import {v1} from 'uuid';
import {FilterValuesType, TodoListType} from '../App';

let todolistId1: string
let todolistId2: string
let startState: Array<TodoListType>


beforeEach(() => {
    todolistId1 = v1();
    todolistId2 = v1();

    startState = [
        {id: todolistId1, title: "What to learn", filterValue: 'all'},
        {id: todolistId2, title: "What to buy", filterValue: 'all'}
    ]
})

test('correct todolist should be removed', () => {

    const endState = todoListsReducer(startState, RemoveTodoListAC(todolistId1))

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todolistId2);
});

test('correct todolist should be added', () => {

    let newTodolistTitle = "New Todolist";

    const endState = todoListsReducer(startState, {type: 'ADD_TODOLIST', title: newTodolistTitle})

    expect(endState.length).toBe(3);
    expect(endState[2].title).toBe(newTodolistTitle);
});

test('correct todolist should change its name', () => {

    let newTodolistTitle = "New Todolist";

    const action = {
        type: 'CHANGE_TODOLIST_TITLE' as const,
        newTitle: newTodolistTitle,
        todoListID: todolistId2
    };

    const endState = todoListsReducer(startState, action);

    expect(endState[0].title).toBe("What to learn");
    expect(endState[1].title).toBe(newTodolistTitle);
});

test('correct filter of todolist should be changed', () => {

    let newFilter: FilterValuesType = "completed";

    const action = {
        type: 'CHANGE_TODOLIST_FILTER' as const,
        todoListID: todolistId2,
        newFilterValue: newFilter
    };

    const endState = todoListsReducer(startState, action);

    expect(endState[0].filterValue).toBe("all");
    expect(endState[1].filterValue).toBe(newFilter);
});

