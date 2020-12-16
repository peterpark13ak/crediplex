import React from 'react';
import { shallow } from 'enzyme';
import Pager from './Pager';

describe('<Pager />', () => {
  test('renders', () => {
    const wrapper = shallow(<Pager />);
    expect(wrapper).toMatchSnapshot();
  });
});
