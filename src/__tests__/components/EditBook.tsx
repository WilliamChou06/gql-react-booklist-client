import React from 'react'
import { shallow } from 'enzyme'

import EditBook from '../../components/EditBook';

it('should render EditBook component correctly', () => {
  const wrapper = shallow(<EditBook />);

  expect(wrapper).toMatchSnapshot();
})