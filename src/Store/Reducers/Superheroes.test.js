import { REQUEST_SUPERHEROES, RECEIVE_SUPERHEROES } from './../Actions/Superheroes';
import superheroes from './Superheroes';

describe('Tests for superheroes reducer', () => {
  it('should load the default state', () => {
    expect(superheroes(undefined, {}))
      .toEqual({ list: [], ui: { isFetching: false } });
  });

  it('should set isFetching to true when requesting superheroes', () => {
    expect(superheroes(undefined, { type: REQUEST_SUPERHEROES }))
      .toEqual({ list: [], ui: { isFetching: true } });
  });

  it('should set isFetching to false when receiving superheroes', () => {
    expect(superheroes(undefined, { type: RECEIVE_SUPERHEROES, payload: { superheroes: [] } }))
      .toEqual({ list: [], ui: { isFetching: false } });
  });
});
