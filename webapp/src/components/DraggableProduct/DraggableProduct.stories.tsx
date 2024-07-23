import { ComponentStory, ComponentMeta } from "@storybook/react";
import type { DraggableProvided } from "react-beautiful-dnd";

import DraggableProduct from "./DraggableProduct";

import { IProduct } from "../../interface/product";

import { ProductStatus } from "../../enum/product-status";


export default {
    title: "Draggable Products",
    component: DraggableProduct,
} as ComponentMeta<typeof DraggableProduct>;

const Template: ComponentStory<typeof DraggableProduct> = (args) => <DraggableProduct {...args} />;

const ID = 1234;

const draggableProvided: DraggableProvided = ({
    innerRef: () => {},
    draggableProps: {
        "data-rbd-draggable-context-id": "1",
        "data-rbd-draggable-id": "1",
    },
    dragHandleProps: null,
}); 

const getArgs = (status: ProductStatus) => ({
    ProductID: ID,
    ProductName: "Test",
    ProductPhotoURL: "https://www.cira.ca/uploads/gallery/cira-stock-images/CIRAstock-190-scaled.jpg",
    ProductStatus: status,
    draggableProvided,
    onDragEnd: (item: IProduct) => {},
});

export const activeProducts = Template.bind({});
activeProducts.args = getArgs(ProductStatus.Active);

export const inactiveProducts = Template.bind({});
inactiveProducts.args = getArgs(ProductStatus.Inactive);
