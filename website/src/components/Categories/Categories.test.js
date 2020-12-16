import React from 'react';
import { shallow } from 'enzyme';
import Categories from './Categories';

describe('<Categories />', () => {
  test('renders', () => {
    const wrapper = shallow(<Categories />);
    expect(wrapper).toMatchSnapshot();
  });
});
