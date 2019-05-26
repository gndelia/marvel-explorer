import { fetchSuperheroesList } from './../../Api/MarvelApi';

// actions
export const REQUEST_SUPERHEROES = 'REQUEST_SUPERHEROES';
export const RECEIVE_SUPERHEROES = 'RECEIVE_SUPERHEROES';

// action creators
export const requestSuperheroes = function requestSuperheroes() {
  return {
    type: REQUEST_SUPERHEROES,
  };
};

export const receiveSuperheroes = function receiveSuperheroes({ results: superheroes }) {
  return {
    type: RECEIVE_SUPERHEROES,
    payload: { superheroes },
  };
};

export const fetchSuperheroes = function fetchSuperheroes(pagingParams) {
  return async dispatch => {
    dispatch(requestSuperheroes());
    const superheroesResponse = await fetchSuperheroesList(pagingParams);
    dispatch(receiveSuperheroes(superheroesResponse));
  };
};
