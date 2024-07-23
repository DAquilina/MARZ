import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { DragDropContext } from 'react-beautiful-dnd';
import DraggableOrderList from './DraggableOrderList';
import { Order } from '../../interface/order';

export default {
    title: 'Draggable List',
    component: DraggableOrderList,
} as ComponentMeta<typeof DraggableOrderList>;

const Template: ComponentStory<typeof DraggableOrderList> = (args) => (
    <DragDropContext onDragEnd={() => {}}>
        <DraggableOrderList {...args} />
    </DragDropContext>
);

const getArgs = (OrderStatus: string) => ({
    ID: '12345',
    listTitle: 'Test List',
    onDragEnd: (order: Order) => {},
    items: [
        { OrderID: 1234, CustomerID: 1234, ProductID: 123456, OrderStatus },
        { OrderID: 1235, CustomerID: 1235, ProductID: 123456, OrderStatus },
        { OrderID: 1236, CustomerID: 1236, ProductID: 123456, OrderStatus },
    ],
});

export const NotInQA = Template.bind({});
NotInQA.args = getArgs('InProgress');

export const InQA = Template.bind({});
InQA.args = getArgs('QA');