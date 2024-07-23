import { DraggableProvided } from "react-beautiful-dnd";
import { create, ReactTestRenderer } from "react-test-renderer";

import DraggableProduct from "./DraggableProduct";

import { ProductStatus } from "../../enum/product-status";


describe("DraggableProduct", () => {

  let tree: ReactTestRenderer;
  const ID = 1234;

  beforeEach(() => {

    const draggableProvided: DraggableProvided = ({
      innerRef: () => { },
      draggableProps: {
        "data-rbd-draggable-context-id": "1",
        "data-rbd-draggable-id": "1",
      },
      dragHandleProps: null,
    });

    const props = {
      ProductID: ID,
      ProductName: "Test",
      ProductPhotoURL: "https://www.cira.ca/uploads/gallery/cira-stock-images/CIRAstock-190-scaled.jpg",
      ProductStatus: ProductStatus.Active,
      draggableProvided,
      onDragEnd: () => { },
    };

    tree = create(<DraggableProduct {...props} />);
  });

  afterEach(() => {
    tree.unmount();
  });

  it("rendersDraggableProduct", async () => {

    const testInstance = tree.root;

    await testInstance.findByProps({ "data-testid": `draggable-container-${ID}` });
    await testInstance.findByProps({ "data-testid": `draggable-productPhotoUrl-${ID}` });
    await testInstance.findByProps({ "data-testid": `draggable-productName-${ID}` });
    await testInstance.findByProps({ "data-testid": `draggable-btn-${ID}` });
  });
});
