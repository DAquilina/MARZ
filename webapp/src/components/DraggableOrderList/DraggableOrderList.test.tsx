import { render, screen } from '@testing-library/react'
import { DragDropContext } from 'react-beautiful-dnd';
import DraggableOrderList from './DraggableOrderList';
import { Order } from '../../interface/order';

describe('DraggableOrderList', () => {
    it('DraggableOrderList', async () => {
        const ID = '1234';
        const props = {
            ID,
            listTitle: 'Test List',
            onDragEnd: (order: Order) => {},
            items: [
                { OrderID: 1234, CustomerID: 1234, ProductID: 123456, OrderStatus: 'InProgress' },
                { OrderID: 1235, CustomerID: 1235, ProductID: 123456, OrderStatus: 'InProgress' },
                { OrderID: 1236, CustomerID: 1236, ProductID: 123456, OrderStatus: 'InProgress' },
            ],
        };
        render(
            <DragDropContext onDragEnd={() => {}}>
                <DraggableOrderList {...props} />
            </DragDropContext>
        );
        expect(screen.getByTestId(`droppable-container-${ID}`)).toBeInTheDocument();
        expect(screen.getByTestId(`droppable-title-${ID}`)).toBeInTheDocument();
        expect(screen.getByText(`1234`)).toBeInTheDocument();
        expect(screen.getByText(`1235`)).toBeInTheDocument();
        expect(screen.getByText(`1236`)).toBeInTheDocument();
    });
  });