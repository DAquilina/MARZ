import { DraggableProvided } from "react-beautiful-dnd";
import { create, ReactTestRenderer} from 'react-test-renderer';

import DraggableOrder from './DraggableOrder';


describe('DraggableOrder', () => {
  let tree: ReactTestRenderer;
  const ID = '1234';
  beforeEach(() => {
    const draggableProvided: DraggableProvided = ({
        innerRef: () => {},
        draggableProps: {
            'data-rbd-draggable-context-id': '1',
            'data-rbd-draggable-id': '1',
        },
        dragHandleProps: null,
    }); 
    const props = {
      OrderID: 1234,
      CustomerID: 2345,
      ProductID: 3456,
      OrderStatus: 'QA', 
      draggableProvided,
      onDragEnd: () => {},
  };
    tree = create(<DraggableOrder {...props} />);
  });
  afterEach(() => {
    tree.unmount();
  });
  it('rendersDraggableOrder', async () => {
    const testInstance = tree.root;
    await testInstance.findByProps({ 'data-testid': `draggable-container-${ID}`});
    await testInstance.findByProps({ 'data-testid': `draggable-customerID-${ID}`});
    await testInstance.findByProps({ 'data-testid': `draggable-productID-${ID}`});
    await testInstance.findByProps({ 'data-testid': `draggable-btn-${ID}`});
  });
});