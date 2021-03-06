import {
  REQUEST_SUPERHEROES,
  RECEIVE_SUPERHEROES,
  UI_UPDATE_PAGING_PARAMS,
} from './../Actions/Superheroes';

const initialState = {
  list: [],
  ui: {
    isFetching: false,
    paging: {
      total: 0,
      currentPage: 1,
    }
  },
};

const calculateNumberOfPages = (total, pageSize) => Math.ceil(total / pageSize);

const updatePagingParams = function updatePagingParams(state, pagingParams) {
  const { currentPage, pageSize } = pagingParams;
  // malformed request, return current state
  if (currentPage === undefined && pageSize === undefined) {
    return state;
  }
  // prevent current page to overflow possible pages;
  const numberOfPages = Math.max(1, calculateNumberOfPages(state.ui.paging.total, pageSize));
  const realCurrentPage = Math.min(Math.max(currentPage, 1), numberOfPages);
  return {
    ...state,
    ui: {
      ...state.ui,
      paging: {
        ...state.ui.paging,
        currentPage: realCurrentPage,
      },
    },
  };
};

const recieveSuperheroes = (state, payload) => {
  const { total, superheroes } = payload;
  const numberOfPages = superheroes.length === 0
    ? 1
    : Math.max(1, calculateNumberOfPages(total, superheroes.length));
  const realCurrentPage = Math.min(Math.max(state.ui.paging.currentPage, 1), numberOfPages);
  return {
    ...state,
    list: superheroes,
    ui: {
      ...state.ui,
      isFetching: false,
      paging: {
        ...state.ui.paging,
        currentPage: realCurrentPage,
        total,
      }
    }
  };
};

const superheroes = function superheroes(state = initialState, action) {
  switch (action.type) {
    case REQUEST_SUPERHEROES:
      return { ...state, ui: { ...state.ui, isFetching: true } };
    case RECEIVE_SUPERHEROES:
      return recieveSuperheroes(state, action.payload);
    case UI_UPDATE_PAGING_PARAMS:
      return updatePagingParams(state, action.payload);
    default:
      return state;
  }
};

export default superheroes;
