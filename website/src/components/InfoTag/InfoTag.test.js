import React from 'react';
import { shallow } from 'enzyme';
import InfoTag from './InfoTag';

describe('<InfoTag />', () => {
  test('renders', () => {
    const wrapper = shallow(<InfoTag />);
    expect(wrapper).toMatchSnapshot();
  });
});
