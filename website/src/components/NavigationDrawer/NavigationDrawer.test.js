import React from 'react';
import { shallow } from 'enzyme';
import NavigationDrawer from './NavigationDrawer';

describe('<NavigationDrawer />', () => {
  test('renders', () => {
    const wrapper = shallow(<NavigationDrawer />);
    expect(wrapper).toMatchSnapshot();
  });
});
