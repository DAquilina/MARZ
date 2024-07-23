import { ComponentStory, ComponentMeta } from "@storybook/react";
import type { DraggableProvided } from "react-beautiful-dnd";
import { Order } from "../../interface/order";
import DraggableOrder from "./DraggableOrder";

export default {
  title: "Draggable Order",
  component: DraggableOrder,
} as ComponentMeta<typeof DraggableOrder>;

const Template: ComponentStory<typeof DraggableOrder> = (args) => <DraggableOrder {...args} />;

const draggableProvided: DraggableProvided = ({
  innerRef: () => { },
  draggableProps: {
    "data-rbd-draggable-context-id": "1",
    "data-rbd-draggable-id": "1",
  },
  dragHandleProps: null,
});

const getArgs = (OrderStatus: string) => ({
  OrderID: 1234,
  CustomerID: 2345,
  ProductID: 3456,
  OrderStatus,
  draggableProvided,
  onDragEnd: (order: Order) => { },
});

export const NotInQA = Template.bind({});
NotInQA.args = getArgs("InProgress");

export const InQA = Template.bind({});
InQA.args = getArgs("QA");