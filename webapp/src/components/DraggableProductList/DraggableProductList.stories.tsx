import { ComponentStory, ComponentMeta } from "@storybook/react";

import { DragDropContext } from "react-beautiful-dnd";

import DraggableProductList from "./DraggableProductList";

import { ProductStatus } from "../../enum/product-status";

import { IProduct } from "../../interface/product";


export default {
  title: "Draggable List",
  component: DraggableProductList,
} as ComponentMeta<typeof DraggableProductList>;

const Template: ComponentStory<typeof DraggableProductList> = (args) => (
  <DragDropContext onDragEnd={() => { }}>
    <DraggableProductList {...args} />
  </DragDropContext>
);

const getArgs = (productStatus: ProductStatus) => ({
  ID: "12345",
  listTitle: "Test List",
  onDragEnd: (item: IProduct) => { },
  items: [
    {
      ProductID: 1,
      ProductName: "Hat",
      ProductPhotoURL: "https://www.cira.ca/uploads/gallery/cira-stock-images/CIRAstock-190-scaled.jpg",
      ProductStatus: productStatus
    },
    {
      ProductID: 2,
      ProductName: "Shoes",
      ProductPhotoURL: "https://www.cira.ca/uploads/gallery/cira-stock-images/CIRAstock-199-scaled.jpg",
      ProductStatus: productStatus
    },
    {
      ProductID: 3,
      ProductName: "Pants",
      ProductPhotoURL: "https://www.cira.ca/uploads/gallery/cira-stock-images/CIRAstock-283-scaled.jpg",
      ProductStatus: productStatus
    }
  ],
});

export const activeProducts = Template.bind({});
activeProducts.args = getArgs(ProductStatus.Active);

export const inactiveProducts = Template.bind({});
inactiveProducts.args = getArgs(ProductStatus.Inactive);
