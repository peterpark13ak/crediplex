import React from 'react';
import { shallow } from 'enzyme';
import LenderCard from './LenderCard';

describe('<LenderCard />', () => {
  test('renders', () => {
    const wrapper = shallow(<LenderCard />);
    expect(wrapper).toMatchSnapshot();
  });
});
