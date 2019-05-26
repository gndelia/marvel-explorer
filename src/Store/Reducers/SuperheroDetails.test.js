import {
  REQUEST_SUPERHERO_DETAIL,
  RECEIVE_SUPERHERO_DETAIL,
  CLEAN_SUPERHERO_DETAILS,
} from './../Actions/SuperheroDetails';
import superheroDetails from './SuperheroDetails';

describe('superheroDetails reducer', () => {
  it('should return the initial state', () => {
    expect(superheroDetails(undefined, ''))
      .toEqual({
        superhero: {
          urls: [],
        },
        ui: {
          isFetching: false,
        }
      });
  });

  it('should set isFetching=true when requesting a superhero detail', () => {
    const mockedAction = { type: REQUEST_SUPERHERO_DETAIL };
    expect(superheroDetails({}, mockedAction))
      .toEqual({ ui: { isFetching: true } });
  });

  it('should set isFetching=false when requesting a superhero detail', () => {
    const mockedState = { ui: { isFetching: true } };
    const superhero = { id: 1 };
    const mockedAction = { type: RECEIVE_SUPERHERO_DETAIL, payload: { superhero } };
    const expectedState = { ui: { isFetching: false }, superhero: { id: superhero.id } };
    expect(superheroDetails(mockedState, mockedAction))
      .toEqual(expectedState);
  });

  it('should clear the superhero details', () => {
    const mockedState = {
      ui: { isFetching: false },
      superhero: {
        id: 1,
        name: 'name',
        urls: [],
      },
    };
    const action = { type: CLEAN_SUPERHERO_DETAILS };
    expect(superheroDetails(mockedState, action))
      .toEqual({
        ...mockedState,
        superhero: {
          urls: [],
        },
      });
  });
});
