import React from 'react';
import {Meta, Story} from '@storybook/react';
import AppWithRedux from "./AppWithRedux";
import {ReduxStoreProviderDecorator} from "./state/ReduxStoreProviderDecorator";

export default {
    title: 'Example/AppWithRedux',
    component: AppWithRedux,
    decorators: [ReduxStoreProviderDecorator]

} as Meta;

const Template: Story = () => <AppWithRedux/>;

export const AppWithReduxExample = Template.bind({});

