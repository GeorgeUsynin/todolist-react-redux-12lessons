import {AppRootStateType} from "./redux-store";

interface IRootState extends AppRootStateType {}

export const selectTasks = (state: IRootState) => state.tasks
export const selectTodoLists = (state: IRootState) => state.todoLists

