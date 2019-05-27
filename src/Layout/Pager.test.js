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
    const wrapper = shallowPager({ paging: { total: 40, currentPage: 2, pageSize: 10 } });
    expect(wrapper
      .find('.viewing-text')
      .text()
    )
      .toEqual('Viewing page 2 of 4');
    expect(wrapper
      .find('.total-superheroes-text')
      .text()
    )
      .toEqual('Total number of superheroes: 40');
  });

  it('calls the appropiate functions on each button', () => {
    const onNavigateToPage = jest.fn();
    const paging = { total: 40, currentPage: 2, pageSize: 10 };
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

  const assertButtonNotClicked = (paging, selector) => {
    const onNavigateToPage = jest.fn();
    const wrapper = shallowPager({ paging, onNavigateToPage });
    wrapper
      .find(selector)
      .at(0)
      .simulate('click');
    expect(onNavigateToPage)
      .toHaveBeenCalledTimes(0);
  };

  it('it should not click previous page if current page is the first one', () => {
    assertButtonNotClicked({ total: 1, currentPage: 1, pageSize: 10 }, '.previous-page-button');
  });

  it('it should not click next page if current page is the last one', () => {
    assertButtonNotClicked({ total: 40, currentPage: 4, pageSize: 10 }, '.next-page-button');
  });
});
