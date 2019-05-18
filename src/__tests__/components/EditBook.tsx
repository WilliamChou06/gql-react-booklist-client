import React from 'react'
import { shallow } from 'enzyme'

import EditBook from '../../components/EditBook';

let wrapper, history;

beforeEach(() => {
  wrapper = shallow(<EditBook />);
  history = {
    push: jest.fn()
  }
})

it('should render EditBook component correctly', () => {
  expect(wrapper).toMatchSnapshot();
})

it('should handle onSubmit', () => {
  wrapper.find('edit_book').prop('onSubmit');
  expect(history.push).toHaveBeenLastCalledWith("/");
})