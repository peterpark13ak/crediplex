import React from 'react';
import { shallow } from 'enzyme';
import ShortDescription from './ShortDescription';

describe('<ShortDescription />', () => {
  test('renders', () => {
    const wrapper = shallow(<ShortDescription />);
    expect(wrapper).toMatchSnapshot();
  });
});
