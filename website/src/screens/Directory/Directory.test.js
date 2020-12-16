import React from 'react';
import { shallow } from 'enzyme';
import Directory from './Directory';

describe('<Directory />', () => {
  test('renders', () => {
    const wrapper = shallow(<Directory />);
    expect(wrapper).toMatchSnapshot();
  });
});
