import { REQUEST_SUPERHEROES, RECEIVE_SUPERHEROES } from './../Actions/Superheroes';

// {
//   id: 1011334,
//   name: '3-D Man',
//   image: 'http://i.annihil.us/u/prod/marvel/i/mg/c/e0/535fecbbb9784/portrait_small.jpg',
//   appearsInComics: true,
//   appearsInSeries: false,
//   appearsInEvents: true,
//   appearsInStories: false,
// }

const initialState = {
  list: [],
  ui: {
    isFetching: false,
  },
};

const superheroes = function superheroes(state = initialState, action) {
  switch (action.type) {
    case REQUEST_SUPERHEROES:
      return { ...state, ui: { ...state.ui, isFetching: true } };
    case RECEIVE_SUPERHEROES:
      return {
        ...state,
        list: action.payload.superheroes,
        ui: { ...state.ui, isFetching: false },
      };
    default:
      return state;
  }
};

export default superheroes;
