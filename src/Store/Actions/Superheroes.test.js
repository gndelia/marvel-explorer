import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {
  REQUEST_SUPERHEROES,
  RECEIVE_SUPERHEROES,
  UI_UPDATE_PAGING_PARAMS,
  requestSuperheroes,
  receiveSuperheroes,
  updatePagingParams,
  fetchSuperheroes,
} from './Superheroes';
import { fetchSuperheroesList } from './../../Api/MarvelApi';

jest.mock('./../../Api/MarvelApi', () => ({
  fetchSuperheroesList: jest.fn()
    .mockResolvedValue({ results: [] }),
}));

describe('Tests for Superheroes Actions', () => {
  it('should create an action to request superheroes', () => {
    expect(requestSuperheroes())
      .toEqual({ type: REQUEST_SUPERHEROES });
  });

  it('should create an action to receive superheroes', () => {
    const superheroes = { results: [] };
    expect(receiveSuperheroes(superheroes))
      .toEqual({ type: RECEIVE_SUPERHEROES, payload: { superheroes: superheroes.results } });
  });

  it('should retrieve the list of superheroes', async() => {
    const middlewares = [thunk];
    const mockStore = configureStore(middlewares);
    const store = mockStore({});
    const pagingParams = { pageSize: 1, currentPage: 2, superheroName: 'mocked' };
    await store.dispatch(fetchSuperheroes(pagingParams));
    expect(fetchSuperheroesList)
      .toHaveBeenCalledWith(pagingParams);
    // verify the actions we expected have been dispatched
    const actionsDispatched = store.getActions();
    expect(actionsDispatched)
      .toHaveLength(3);
    expect(actionsDispatched[0])
      .toEqual({ type: UI_UPDATE_PAGING_PARAMS, payload: { ...pagingParams } });
    expect(actionsDispatched[1])
      .toEqual({ type: REQUEST_SUPERHEROES });
    expect(actionsDispatched[2])
      .toEqual({
        type: RECEIVE_SUPERHEROES,
        payload: { superheroes: [] },
      });
  });

  it('should create an action to navigate to a page', () => {
    const pagingParams = {};
    const action = { type: UI_UPDATE_PAGING_PARAMS, payload: { ...pagingParams } };
    expect(updatePagingParams(pagingParams))
      .toEqual(action);
  });
});
