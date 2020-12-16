import React from 'react';
import { shallow } from 'enzyme';
import ContactForm from './ContactForm';

describe('<ContactForm />', () => {
  test('renders', () => {
    const wrapper = shallow(<ContactForm />);
    expect(wrapper).toMatchSnapshot();
  });
});
