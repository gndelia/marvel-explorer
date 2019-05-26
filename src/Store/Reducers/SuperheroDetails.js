import {
  REQUEST_SUPERHERO_DETAIL,
  RECEIVE_SUPERHERO_DETAIL,
  CLEAN_SUPERHERO_DETAILS,
} from './../Actions/SuperheroDetails';
export const initialState = {
  superhero: {
    urls: [],
  },
  ui: {
    isFetching: false,
  }
};

const superheroDetails = function superheroDetails(state = initialState, action) {
  switch (action.type) {
    case REQUEST_SUPERHERO_DETAIL:
      return { ...state, ui: { isFetching: true } };
    case RECEIVE_SUPERHERO_DETAIL:
      return { ...state, superhero: { ...action.payload.superhero }, ui: { isFetching: false } };
    case CLEAN_SUPERHERO_DETAILS:
      return { ...state, superhero: { ...initialState.superhero } };
    default:
      return state;
  }
};

export default superheroDetails;
