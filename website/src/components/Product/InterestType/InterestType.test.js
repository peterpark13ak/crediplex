import React from 'react';
import { shallow } from 'enzyme';
import InterestType from './InterestType';

describe('<InterestType />', () => {
  test('renders', () => {
    const wrapper = shallow(<InterestType />);
    expect(wrapper).toMatchSnapshot();
  });
});
