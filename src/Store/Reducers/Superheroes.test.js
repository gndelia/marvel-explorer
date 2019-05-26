import {
  REQUEST_SUPERHEROES,
  RECEIVE_SUPERHEROES,
  UI_UPDATE_PAGING_PARAMS,
} from './../Actions/Superheroes';
import superheroes from './Superheroes';

describe('Tests for superheroes reducer', () => {
  const getInitialState = () => ({
    list: [],
    ui: {
      isFetching: false,
      paging: {
        total: 0,
        currentPage: 1,
        numberOfPages: 0,
        pageSizes: [10],
        pageSize: 10,
      },
    },
  });

  it('should load the default state', () => {
    expect(superheroes(undefined, {}))
      .toEqual(getInitialState());
  });

  it('should set isFetching to true when requesting superheroes', () => {
    const state = getInitialState();
    expect(superheroes(undefined, { type: REQUEST_SUPERHEROES }))
      .toEqual({ ...state, ui: { ...state.ui, isFetching: true } });
  });

  it('should set isFetching to false when receiving superheroes', () => {
    const state = getInitialState();
    const action = { type: RECEIVE_SUPERHEROES, payload: { total: 0, superheroes: [] } };
    expect(superheroes(undefined, action))
      .toEqual({ ...state, ui: { ...state.ui, isFetching: false } });
  });

  const assertPagingParams = (payloadCurrentPage, expectedCurrentPage) => {
    const state = getInitialState();
    state.ui.paging = { ...state.ui.paging, total: 100 };
    const payload = { pageSize: state.ui.paging.pageSize, currentPage: payloadCurrentPage };
    expect(superheroes(state, { type: UI_UPDATE_PAGING_PARAMS, payload }))
      .toEqual({
        ...state,
        ui: {
          ...state.ui,
          paging: {
            ...state.ui.paging,
            numberOfPages: 10,
            pageSize: payload.pageSize,
            currentPage: expectedCurrentPage
          },
        },
      });
  };

  it('should update paging parameters', () => {
    const currentPage = 2;
    assertPagingParams(currentPage, currentPage);
  });

  it('should set 1 as current page if a negative page is passed along', () => {
    assertPagingParams(-1, 1);
  });

  it('should set the max possible page number as current page if a bigger number is passed', () => {
    assertPagingParams(9999, 10);
  });

  it('should not update the paging state if no params are provided', () => {
    const state = {};
    expect(superheroes(state, { type: UI_UPDATE_PAGING_PARAMS, payload: {} }))
      .toEqual(state);
  });
});
