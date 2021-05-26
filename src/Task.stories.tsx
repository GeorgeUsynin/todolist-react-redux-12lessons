import React from 'react';
import {Meta, Story} from '@storybook/react';
import {action} from "@storybook/addon-actions";
import {Task, TaskPropsType} from "./Task";

export default {
    title: 'Example/Task',
    component: Task
} as Meta;

const Template: Story<TaskPropsType> = (args) => <Task {...args} />;

let actionArgs = {
    changeTaskStatus: action('Status changed inside task'),
    changeTaskTitle: action('Title changed inside task'),
    removeTask: action('Task was removed')
}

export const TaskIsDoneExample = Template.bind({});
TaskIsDoneExample.args = {
    task: {id: '1', title: 'JS', isDone: true},
    ...actionArgs
};
export const TaskNotIsDoneExample = Template.bind({});
TaskNotIsDoneExample.args = {
    task: {id: '1', title: 'JS', isDone: false},
    ...actionArgs
};
