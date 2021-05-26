import React from 'react';
import {Meta, Story} from '@storybook/react';
import {action} from "@storybook/addon-actions";
import {Task} from "./Task";
import {EditableSpan, EditableSpanPropsType} from "./EditableSpan";

export default {
    title: 'Example/EditableSpan',
    component: EditableSpan,
    argTypes:{
        onChange: {
            description: 'Value EditableSpan changed'
        },
        title: {
            defaultValue: 'HTML', // подкинет нам дефолтное value
            description: 'Start'
        }
    }
} as Meta;

const Template: Story<EditableSpanPropsType> = (args) => <EditableSpan {...args} />;


export const EditableSpanExample = Template.bind({});
EditableSpanExample.args = {
    changeTitle: action('Title was changed')
};
