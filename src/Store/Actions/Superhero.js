import { fetchSuperheroDetails } from './../../Api/MarvelApi';
// actions
export const REQUEST_SUPERHERO_DETAIL = 'REQUEST_SUPERHERO_DETAIL';
export const RECEIVE_SUPERHERO_DETAIL = 'RECEIVE_SUPERHERO_DETAIL';

// actions creators
export const requestDetails = function requestDetails({ id }) {
  return {
    type: REQUEST_SUPERHERO_DETAIL,
    payload: {
      id,
    },
  };
};

export const receiveDetails = function receiveDetails(superhero) {
  return {
    type: RECEIVE_SUPERHERO_DETAIL,
    payload: {
      superhero,
    },
  };
};

export const fetchDetails = function fetchDetails(superhero) {
  return async dispatch => {
    dispatch(requestDetails(superhero));
    const superheroResponse = await fetchSuperheroDetails(superhero);
    dispatch(receiveDetails(superheroResponse));
  };
};
