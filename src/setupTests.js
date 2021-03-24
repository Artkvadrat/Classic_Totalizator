import enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-17-updated';

enzyme.configure({ adapter: new Adapter() });

const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn()
};
window.localStorage = localStorageMock;
