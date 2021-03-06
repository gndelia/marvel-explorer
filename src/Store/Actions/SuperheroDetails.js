import { fetchSuperheroDetails } from './../../Api/MarvelApi';
// actions
export const REQUEST_SUPERHERO_DETAIL = 'REQUEST_SUPERHERO_DETAIL';
export const RECEIVE_SUPERHERO_DETAIL = 'RECEIVE_SUPERHERO_DETAIL';
export const CLEAN_SUPERHERO_DETAILS = 'CLEAN_SUPERHERO_DETAILS';

// actions creators
export const requestDetails = function requestDetails() {
  return { type: REQUEST_SUPERHERO_DETAIL };
};

export const receiveDetails = function receiveDetails(superhero) {
  return {
    type: RECEIVE_SUPERHERO_DETAIL,
    payload: {
      superhero,
    },
  };
};

export const cleanDetails = function cleanDetails() {
  return { type: CLEAN_SUPERHERO_DETAILS };
};

export const fetchDetails = function fetchDetails(superhero) {
  return async dispatch => {
    dispatch(requestDetails());
    const superheroResponse = await fetchSuperheroDetails(superhero);
    dispatch(receiveDetails(superheroResponse));
  };
};
