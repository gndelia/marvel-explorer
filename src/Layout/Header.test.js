import React from 'react';
import { shallow } from 'enzyme';
import Header from './Header';

describe('Tests for the Header component', () => {
  it('should render without crashing', () => {
    const wrapper = shallow(<Header />);
    expect(wrapper.find('img'))
      .toHaveLength(1);
  });
});
