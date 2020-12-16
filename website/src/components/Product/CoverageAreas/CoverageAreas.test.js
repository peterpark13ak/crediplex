import React from 'react';
import { shallow } from 'enzyme';
import CoverageAreas from './CoverageAreas';

describe('<CoverageAreas />', () => {
  test('renders', () => {
    const wrapper = shallow(<CoverageAreas />);
    expect(wrapper).toMatchSnapshot();
  });
});
