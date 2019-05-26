import { fetchSuperheroesList } from './../../Api/MarvelApi';

// actions
export const REQUEST_SUPERHEROES = 'REQUEST_SUPERHEROES';
export const RECEIVE_SUPERHEROES = 'RECEIVE_SUPERHEROES';
export const UI_UPDATE_PAGING_PARAMS = 'UI_UPDATE_PAGING_PARAMS';

// action creators
export const requestSuperheroes = function requestSuperheroes() {
  return {
    type: REQUEST_SUPERHEROES,
  };
};

export const receiveSuperheroes = function receiveSuperheroes({ total, results: superheroes }) {
  return {
    type: RECEIVE_SUPERHEROES,
    payload: { total, superheroes },
  };
};

export const updatePagingParams = function pagingParams(pagingParams) {
  return {
    type: UI_UPDATE_PAGING_PARAMS,
    payload: { ...pagingParams },
  };
};

export const fetchSuperheroes = function fetchSuperheroes(pagingParams) {
  return async dispatch => {
    dispatch(updatePagingParams(pagingParams));
    dispatch(requestSuperheroes());
    const superheroesResponse = await fetchSuperheroesList(pagingParams);
    dispatch(receiveSuperheroes(superheroesResponse));
  };
};
