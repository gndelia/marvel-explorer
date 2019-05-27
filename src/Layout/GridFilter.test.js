import React from 'react';
import { shallow } from 'enzyme';
import GridFilter from './GridFilter';
import Pager from './Pager';

describe('Tests for the GridFilter component', () => {
  const shallowGridFilter = ({
    paging = {},
    fetchSuperheroes = jest.fn(),
    onSuperheroFilter = jest.fn()
  } = {}) => (
    shallow(
      <GridFilter
        paging={paging}
        fetchSuperheroes={fetchSuperheroes}
        onSuperheroFilter={onSuperheroFilter} />
    )
  );

  it('should render without crashing', () => {
    shallowGridFilter();
  });

  it('should render a pager and a textbox to filter', () => {
    const wrapper = shallowGridFilter();
    expect(wrapper.find('input'))
      .toHaveLength(1);
    expect(wrapper.find(Pager))
      .toHaveLength(1);
  });

  it('should fetch on typing on the textbox', () => {
    jest.useFakeTimers();
    const onSuperheroFilter = jest.fn();
    const wrapper = shallowGridFilter({ onSuperheroFilter });
    const filterWrapper = wrapper
      .find('.superhero-filter')
      .at(0);
    const filterText = 'filter mocked!';
    const event = { target: { value: filterText } };
    filterWrapper.simulate('change', event);
    jest.runAllTimers();
    expect(onSuperheroFilter)
      .toHaveBeenCalledWith(filterText);
  });
});
