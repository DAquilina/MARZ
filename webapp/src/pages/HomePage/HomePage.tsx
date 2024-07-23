import { useEffect, useState } from "react";

import { DragDropContext } from "react-beautiful-dnd";

import PageWrapper from "../PageWrapper";

import DraggableOrderList from "../../components/DraggableOrderList/DraggableOrderList";
import Spinner from "../../components/Spinner/Spinner";

import { DataState } from "../../enum/data-state";

import { Order, OrderData } from "../../interface/order";

import { getInPipelineData, updateOrderStatus } from "../../services/order.service";


interface IdList {
  "0": string;
  "1": string;
  "2": string;
}

const ID_LIST_MAP: IdList = {
  "0": "Queued",
  "1": "InProgress",
  "2": "QA"
};

const HomePage = () => {
  const [loadingState, setLoadingState] = useState(DataState.Waiting);
  const [data, setData] = useState({Queued: [], InProgress: [], QA: []} as OrderData);

  const getOrders = async () => {
    setLoadingState(DataState.Waiting);
    const { orderData, errorOccurred } = await getInPipelineData();
    setData(orderData);
    setLoadingState(errorOccurred ? DataState.Error : DataState.Loaded);
  };

  const updateOrder = async (order: Order) => {
    setLoadingState(DataState.Waiting);
    const newOrderStatus = order.OrderStatus === "QA" ? "Complete" : "Cancelled";
    const orderStatusUpdated = await updateOrderStatus(order, newOrderStatus);
    if (orderStatusUpdated) {
      const columnKey = order.OrderStatus as keyof OrderData
      setData({
        ...data,
        [columnKey]: data[columnKey].filter(
          (otherOrder: Order) => otherOrder.OrderID !== order.OrderID
        ),
      });
    }
    setLoadingState(DataState.Loaded);
  };

  const handleDragEnd = (result: any) => {
    const { source, destination } = result;
    if (!destination) return;
    const sourceKey = ID_LIST_MAP[source.droppableId as keyof IdList] as keyof OrderData;
    const sourceIndex = source.index;

    const destKey = ID_LIST_MAP[destination.droppableId as keyof IdList] as keyof OrderData;
    const destIndex = destination.index;

    if (sourceKey === destKey) {
      const sourceClone = Array.from(data[sourceKey]);
      const [removed] = sourceClone.splice(sourceIndex, 1);
      sourceClone.splice(destIndex, 0, removed);
      setData({ ...data, [sourceKey]: sourceClone });
    }
    else {
        const sourceClone = Array.from(data[sourceKey]);
        const destClone = Array.from(data[destKey]);
        const [removed] = sourceClone.splice(sourceIndex, 1);
        destClone.splice(destIndex, 0, removed);
        destClone[destIndex].OrderStatus = destKey;
        setData({
          ...data,
          [sourceKey]: sourceClone,
          [destKey]: destClone,
        });
    }
  };

  useEffect(() => {
    getOrders();
  }, []);

  let content;
  if (loadingState === DataState.Waiting)
    content = (
      <div
        className="flex flex-row justify-center w-full pt-4"
        data-testid="loading-spinner-container"
      >
        <Spinner />
      </div>
    );
  else if (loadingState === DataState.Loaded) 
    content = (
      <div
        className="flex flex-row justify-center w-full pt-4"
        data-testid="pipeline-container"
      >
        <DragDropContext onDragEnd={handleDragEnd}>
          <DraggableOrderList
            ID="0"
            listTitle="Queued"
            onDragEnd={(order: Order) => updateOrder(order)}
            items={data.Queued}
          />
          <DraggableOrderList
            ID="1"
            listTitle="In Progress"
            onDragEnd={(order: Order) => updateOrder(order)}
            items={data.InProgress}
          />
          <DraggableOrderList
            ID="2"
            listTitle="QA"
            onDragEnd={(order: Order) => updateOrder(order)}
            items={data.QA}
          />
        </DragDropContext>
      </div>
    );
  else
    content = (
      <div
        className="flex flex-row justify-center w-full pt-4 text-3xl font-bold text-white"
        data-testid="error-container"
      >
        An error Occurred fetching the data!
      </div>
    );

  return (
    <PageWrapper>
      { content }
    </PageWrapper>
  );
}

export default HomePage;