import React from 'react';
import { shallow } from 'enzyme';
import LenderDescription from './LenderDescription';

describe('<LenderDescription />', () => {
  test('renders', () => {
    const wrapper = shallow(<LenderDescription />);
    expect(wrapper).toMatchSnapshot();
  });
});
