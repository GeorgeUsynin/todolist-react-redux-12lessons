import React from 'react';
import {Meta, Story} from '@storybook/react';
import {AddItemForm, AddItemFormPropsType} from "../AddItemForm";
import {action} from "@storybook/addon-actions";

export default {
    title: 'Example/AddItemForm',
    component: AddItemForm,

} as Meta;

const Template: Story<AddItemFormPropsType> = (args: AddItemFormPropsType) => <AddItemForm {...args} />;

export const AddItemFormExample = Template.bind({});
AddItemFormExample.args = {
    addItem: action('Button inside clicked')
};
