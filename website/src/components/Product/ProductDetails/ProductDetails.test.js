import React from 'react';
import { shallow } from 'enzyme';
import ProductDetails from './ProductDetails';

describe('<ProductDetails />', () => {
  test('renders', () => {
    const wrapper = shallow(<ProductDetails />);
    expect(wrapper).toMatchSnapshot();
  });
});
