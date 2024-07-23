import { render, screen } from "@testing-library/react"

import { DragDropContext } from "react-beautiful-dnd";

import DraggableProductList from "./DraggableProductList";

import { ProductStatus } from "../../enum/product-status";

import { IProduct } from "../../interface/product";


describe("DraggableProductList", () => {
  it("DraggableProductList", async () => {
    const ID = ProductStatus.Active;
    const props = {
      ID,
      listTitle: "Test List",
      onDragEnd: (item: IProduct) => { },
      items: [
        {
          ProductID: 1,
          ProductName: "Hat",
          ProductPhotoURL: "https://www.cira.ca/uploads/gallery/cira-stock-images/CIRAstock-190-scaled.jpg",
          ProductStatus: ProductStatus.Active
        },
        {
          ProductID: 2,
          ProductName: "Shoes",
          ProductPhotoURL: "https://www.cira.ca/uploads/gallery/cira-stock-images/CIRAstock-199-scaled.jpg",
          ProductStatus: ProductStatus.Active
        },
        {
          ProductID: 3,
          ProductName: "Pants",
          ProductPhotoURL: "https://www.cira.ca/uploads/gallery/cira-stock-images/CIRAstock-283-scaled.jpg",
          ProductStatus: ProductStatus.Active
        }
      ],
    };
    render(
      <DragDropContext onDragEnd={() => { }}>
        <DraggableProductList {...props} />
      </DragDropContext>
    );
    expect(screen.getByTestId(`droppable-container-${ID}`)).toBeInTheDocument();
    expect(screen.getByTestId(`droppable-title-${ID}`)).toBeInTheDocument();
    expect(screen.getByText(`Hat`)).toBeInTheDocument();
    expect(screen.getByText(`Shoes`)).toBeInTheDocument();
    expect(screen.getByText(`Pants`)).toBeInTheDocument();
  });
});