import React from 'react';
import { shallow } from 'enzyme';
import LenderList from './LenderList';

describe('<LenderList />', () => {
  test('renders', () => {
    const wrapper = shallow(<Directory />);
    expect(wrapper).toMatchSnapshot();
  });
});
