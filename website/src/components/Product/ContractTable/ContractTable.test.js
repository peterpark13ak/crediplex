import React from 'react';
import { shallow } from 'enzyme';
import ContractTable from './ContractTable';

describe('<ContractTable />', () => {
  test('renders', () => {
    const wrapper = shallow(<ContractTable />);
    expect(wrapper).toMatchSnapshot();
  });
});
