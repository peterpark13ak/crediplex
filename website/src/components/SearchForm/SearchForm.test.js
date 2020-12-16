import React from 'react';
import { shallow } from 'enzyme';
import SearchForm from './SearchForm';

describe('<SearchForm />', () => {
  test('renders', () => {
    const wrapper = shallow(<SearchForm />);
    expect(wrapper).toMatchSnapshot();
  });
});
