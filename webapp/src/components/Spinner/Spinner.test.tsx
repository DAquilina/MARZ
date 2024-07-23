import { create, ReactTestRenderer} from 'react-test-renderer';
import Spinner from './Spinner';

describe('DraggableOrder', () => {
  let tree: ReactTestRenderer;
  beforeEach(() => {
    tree = create(<Spinner />);
  });
  afterEach(() => {
    tree.unmount();
  });
  it('rendersDraggableOrder', async () => {
    const testInstance = tree.root;
    await testInstance.findByProps({ 'data-testid': `spinner-container`});
  });
});
