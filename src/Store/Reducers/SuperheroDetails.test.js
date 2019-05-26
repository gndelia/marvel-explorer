import { REQUEST_SUPERHERO_DETAIL, RECEIVE_SUPERHERO_DETAIL } from './../Actions/Superhero';
import superheroDetails from './SuperheroDetails';

describe('superheroDetails reducer', () => {
  it('should return the initial state', () => {
    const mockedState = { id: 1 };
    expect(superheroDetails(mockedState, ''))
      .toEqual(mockedState);
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
});