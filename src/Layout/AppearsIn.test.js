import React from 'react';
import { shallow } from 'enzyme';
import AppearsIn from './AppearsIn';
import Check from './Check';
import Cross from './Cross';

describe('Tests for AppearsIn component', () => {
  it('should render without crashing', () => {
    shallow(<AppearsIn />);
  });

  const assertComponent = (appearsIn, expected, notExpected) => {
    const wrapper = shallow(<AppearsIn event={appearsIn} />);
    expect(wrapper.equals(expected))
      .toEqual(true);
    expect(wrapper.equals(notExpected))
      .toEqual(false);
  };

  it('should render Check svg if the superhero appears in the event', () => {
    assertComponent(true, Check, Cross);
  });

  it('should render Cross svg if the superhero does not appear in the event', () => {
    assertComponent(false, Cross, Check);
  });
});
