import React from 'react';
import { shallow } from 'enzyme';
import Pager from './Pager';

describe('Tests for the Pager component', () => {
  const shallowPager = ({
    paging = {},
    onNavigateToPage = jest.fn(),
  } = {}) => (
    shallow(
      <Pager
        paging={paging}
        onNavigateToPage={onNavigateToPage} />
    )
  );
  it('should render without crashing', () => {
    shallowPager();
  });

  it('renders the appropiate texts given paging props', () => {
    const wrapper = shallowPager({ paging: { total: 40, currentPage: 2, numberOfPages: 4 } });
    expect(wrapper
      .find('.viewing-text')
      .text()
    )
      .toEqual('Viewing page 2 of 4');
    expect(wrapper
      .find('.total-characters-text')
      .text()
    )
      .toEqual('Total number of characters: 40');
  });

  it('calls the appropiate functions on each button', () => {
    const onNavigateToPage = jest.fn();
    const paging = { total: 40, currentPage: 2, numberOfPages: 4 };
    const wrapper = shallowPager({ paging, onNavigateToPage });
    const expectButtonClicked = (selector, spy, pagingParams) => {
      wrapper
        .find(selector)
        .at(0)
        .simulate('click');
      expect(spy)
        .toHaveBeenCalledWith(pagingParams);
    };
    const getExpectedPaging = currentPage => ({ ...paging, currentPage });
    expectButtonClicked('.previous-page-button', onNavigateToPage, getExpectedPaging(1));
    expectButtonClicked('.next-page-button', onNavigateToPage, getExpectedPaging(3));
    expectButtonClicked('.first-page-button', onNavigateToPage, getExpectedPaging(1));
    expectButtonClicked('.last-page-button', onNavigateToPage, getExpectedPaging(4));
  });
});
