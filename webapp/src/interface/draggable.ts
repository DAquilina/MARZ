import type { DraggableProvided } from "react-beautiful-dnd";

import { IProduct } from "./product";
import { Order } from "./order";


export interface DraggableOrderProps extends Order {
    draggableProvided: DraggableProvided;
    onDragEnd: (item: Order) => void;
}

export interface DraggableProductProps extends IProduct {
    draggableProvided: DraggableProvided;
    onDragEnd: (item: IProduct) => void;
}

export interface DraggableOrderListProps {
    ID: string;
    listTitle: string;
    onDragEnd: (item: Order) => void;
    items: Order[];
};

export interface DraggableProductListProps {
    ID: string;
    listTitle: string;
    onDragEnd: (item: IProduct) => void;
    items: IProduct[];
};
