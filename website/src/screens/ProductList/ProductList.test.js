import React from 'react';
import { shallow } from 'enzyme';
import ProductList from './ProductList';

describe('<ProductList />', () => {
  test('renders', () => {
    const wrapper = shallow(<ProductList />);
    expect(wrapper).toMatchSnapshot();
  });
});
