import React from 'react';
import { shallow } from 'enzyme';
import LongDescription from './LongDescription';

describe('<LongDescription />', () => {
  test('renders', () => {
    const wrapper = shallow(<LongDescription />);
    expect(wrapper).toMatchSnapshot();
  });
});
