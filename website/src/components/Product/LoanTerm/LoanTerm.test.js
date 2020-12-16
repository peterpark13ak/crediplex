import React from 'react';
import { shallow } from 'enzyme';
import LoanTerm from './LoanTerm';

describe('<LoanTerm />', () => {
  test('renders', () => {
    const wrapper = shallow(<LoanTerm />);
    expect(wrapper).toMatchSnapshot();
  });
});
