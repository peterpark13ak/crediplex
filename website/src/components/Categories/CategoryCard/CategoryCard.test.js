import React from 'react';
import { shallow } from 'enzyme';
import CategoryCard from './CategoryCard';

describe('<CategoryCard />', () => {
  test('renders', () => {
    const wrapper = shallow(<CategoryCard />);
    expect(wrapper).toMatchSnapshot();
  });
});
