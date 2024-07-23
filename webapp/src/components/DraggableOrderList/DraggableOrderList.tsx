import React from 'react';
import { DraggableProvided, Droppable, Draggable } from 'react-beautiful-dnd';
import DraggableOrder from '../DraggableOrder/DraggableOrder';
import { DraggableOrderListProps } from '../../interface/draggable';

const DraggableOrderList = (props: DraggableOrderListProps) => (
    <Droppable droppableId={props.ID}>
        {(provided) => (
            <div
                ref={provided.innerRef}
                className='bg-neutral-500 p-4 w-full'
                data-testid={`droppable-container-${props.ID}`}
            >
                <h5
                    className='font-bold text-white'
                    data-testid={`droppable-title-${props.ID}`}
                >
                    {props.listTitle}
                </h5>
                {
                    props.items.length > 0 && props.items.map((item, index) => (
                        <Draggable
                            key={item.OrderID}
                            draggableId={`${item.OrderID}`}
                            index={index}
                        >
                            {(provided: DraggableProvided) => (
                                <DraggableOrder
                                    OrderID={item.OrderID}
                                    CustomerID={item.CustomerID}
                                    ProductID={item.ProductID}
                                    OrderStatus={item.OrderStatus}
                                    draggableProvided={provided}
                                    onDragEnd={props.onDragEnd}
                                />
                            )}
                        </Draggable>
                    ))
                }
                {provided.placeholder}
            </div>
        )}
    </Droppable>
);

export default DraggableOrderList;