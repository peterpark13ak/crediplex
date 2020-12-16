import React from 'react';
import { shallow } from 'enzyme';
import Gallery from './Gallery';

describe('<Gallery />', () => {
  test('renders', () => {
    const wrapper = shallow(<Gallery />);
    expect(wrapper).toMatchSnapshot();
  });
});
