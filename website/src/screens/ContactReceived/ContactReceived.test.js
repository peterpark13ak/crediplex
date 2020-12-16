import React from 'react';
import { shallow } from 'enzyme';
import ContactReceived from './ContactReceived';

describe('<ContactReceived />', () => {
  test('renders', () => {
    const wrapper = shallow(<ContactReceived />);
    expect(wrapper).toMatchSnapshot();
  });
});
