import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGrip } from "@fortawesome/free-solid-svg-icons";

import { DraggableProductProps } from "../../interface/draggable";


const DraggableProduct = (props: DraggableProductProps) => (
  <div
    ref={props.draggableProvided.innerRef}
    {...props.draggableProvided.draggableProps}
    {...props.draggableProvided.dragHandleProps}
    className="bg-neutral-300 flex flex-col items-center justify-between mt-1 p-3 rounded w-full shadow-lg"
    data-testid={`draggable-container-${props.ProductID}`}
  >
    <img
      data-testid={`draggable-productPhotoUrl-${props.ProductID}`}
      className="product-image mx-auto max-h-56 max-w-fit w-full"
      src={props.ProductPhotoURL}
      alt={`Product showcase for {props.ProductName}`}
    ></img>
    <span
      data-testid={`draggable-productName-${props.ProductID}`}
      className="font-semibold text-xl"
    >
      {props.ProductName}
    </span>
    {(() => {
      const { ProductID, ProductName, ProductPhotoURL, ProductStatus, onDragEnd } = props;
      return (
        <button onClick={() => onDragEnd({ ProductID, ProductName, ProductPhotoURL, ProductStatus })}>
          <FontAwesomeIcon
            icon={faGrip}
            className={`${props.ProductStatus === "Active" ? "text-green-600" : "text-red-600"} fa-lg`}
            data-testid={`draggable-btn-${props.ProductID}`}
          />
        </button>
      );
    })()}
  </div>
);

export default DraggableProduct;