import React from 'react';
import { shallow } from 'enzyme';
import FormSelect from './FormSelect';

describe('<FormSelect />', () => {
  test('renders', () => {
    const wrapper = shallow(<FormSelect />);
    expect(wrapper).toMatchSnapshot();
  });
});
