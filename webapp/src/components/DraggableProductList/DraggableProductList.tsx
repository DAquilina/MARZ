import { DraggableProvided, Droppable, Draggable } from "react-beautiful-dnd";

import DraggableProduct from "../DraggableProduct/DraggableProduct";

import { DraggableProductListProps } from "../../interface/draggable";


const DraggableProductList = (props: DraggableProductListProps) => (
  <Droppable droppableId={props.ID}>
    {(provided) => (
      <div
        ref={provided.innerRef}
        className="bg-neutral-500 p-4 w-full"
        data-testid={`droppable-container-${props.ID}`}
      >
        <h5
          className="font-bold text-white"
          data-testid={`droppable-title-${props.ID}`}
        >
          {props.listTitle}
        </h5>
        {
          props.items.length > 0 && props.items.map((item, index) => (
            <Draggable
              key={item.ProductID}
              draggableId={`${item.ProductID}`}
              index={index}
            >
              {(provided: DraggableProvided) => (
                <DraggableProduct
                  ProductID={item.ProductID}
                  ProductName={item.ProductName}
                  ProductPhotoURL={item.ProductPhotoURL}
                  ProductStatus={item.ProductStatus}
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

export default DraggableProductList;