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
    const payload = {
      currentPage: payloadCurrentPage,
      pageSize: 10,
      superheroName: 'superhero',
    };
    expect(superheroes(state, { type: UI_UPDATE_PAGING_PARAMS, payload }))
      .toEqual({
        ...state,
        ui: {
          ...state.ui,
          paging: {
            ...state.ui.paging,
            currentPage: expectedCurrentPage
          },
        },
      });
  };

  it('should update paging parameters', () => {
    const currentPage = 2;
    assertPagingParams(currentPage, currentPage);
  });

  it('should not update the paging state if no params are provided', () => {
    const state = {};
    expect(superheroes(state, { type: UI_UPDATE_PAGING_PARAMS, payload: {} }))
      .toEqual(state);
  });

  const assertPageChanges = (state, payload, expectedCurrentPage) => {
    expect(superheroes(state, { type: RECEIVE_SUPERHEROES, payload }))
      .toEqual({
        ...state,
        list: payload.superheroes,
        ui: {
          ...state.ui,
          paging: {
            ...state.ui.paging,
            currentPage: expectedCurrentPage,
            total: payload.total,
          },
        },
      });
  };

  it('should set currentPage as 1 if there are no results', () => {
    const state = { ui: { isFetching: false, paging: { currentPage: 2 } } };
    const payload = { total: 0, superheroes: [] };
    assertPageChanges(state, payload, 1);
  });

  it('should set currentPage appropiately given total and page size', () => {
    const state = { ui: { isFetching: false, paging: { currentPage: 2 } } };
    const payload = { total: 40, superheroes: Array.from({ length: 10 }) };
    assertPageChanges(state, payload, 2);
  });
});
