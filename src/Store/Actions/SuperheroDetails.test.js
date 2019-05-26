import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {
  requestDetails,
  receiveDetails,
  fetchDetails,
  REQUEST_SUPERHERO_DETAIL,
  RECEIVE_SUPERHERO_DETAIL,
} from './SuperheroDetails';
import { fetchSuperheroDetails } from './../../Api/MarvelApi';
// mock dependency from marvel real api
jest.mock('./../../Api/MarvelApi', () => ({
  fetchSuperheroDetails: jest.fn()
    .mockResolvedValue({ id: 1 }),
}));

describe('Superhero actions', () => {
  const middlewares = [thunk];
  const mockStore = configureStore(middlewares);

  const superhero = { id: 1, name: 'superhero', urls: [] };

  it('should create an action to request details for a superhero', () => {
    const action = { type: REQUEST_SUPERHERO_DETAIL };
    expect(requestDetails(superhero))
      .toEqual(action);
  });

  it('should create an action to receive details for a superhero', () => {
    const action = {
      type: RECEIVE_SUPERHERO_DETAIL,
      payload: { superhero },
    };
    expect(receiveDetails(superhero))
      .toEqual(action);
  });

  it('should fetch the details provided a superhero', async() => {
    const store = mockStore({});
    await store.dispatch(fetchDetails(superhero));
    expect(fetchSuperheroDetails)
      .toHaveBeenCalledTimes(1);
    const actionsDispatched = store.getActions();
    expect(actionsDispatched)
      .toHaveLength(2);
    expect(actionsDispatched[0])
      .toEqual(requestDetails());
    expect(actionsDispatched[1])
      .toEqual(receiveDetails({ id: 1 }));
  });
});
