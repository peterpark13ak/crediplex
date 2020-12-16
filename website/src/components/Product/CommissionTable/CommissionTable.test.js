import React from 'react';
import { shallow } from 'enzyme';
import CommissionTable from './CommissionTable';

describe('<CommissionTable />', () => {
  test('renders', () => {
    const wrapper = shallow(<CommissionTable />);
    expect(wrapper).toMatchSnapshot();
  });
});
