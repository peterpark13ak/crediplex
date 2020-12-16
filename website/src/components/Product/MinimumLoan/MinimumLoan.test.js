import React from 'react';
import { shallow } from 'enzyme';
import MinimumLoan from './MinimumLoan';

describe('<MinimumLoan />', () => {
  test('renders', () => {
    const wrapper = shallow(<MinimumLoan />);
    expect(wrapper).toMatchSnapshot();
  });
});
