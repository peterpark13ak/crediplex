import React from 'react';
import { shallow } from 'enzyme';
import CoverageArea from './CoverageArea';

describe('<CoverageArea />', () => {
  test('renders', () => {
    const wrapper = shallow(<CoverageArea />);
    expect(wrapper).toMatchSnapshot();
  });
});
