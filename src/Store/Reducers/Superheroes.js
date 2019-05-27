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
      superheroName: '',
      total: 0,
      currentPage: 1,
      numberOfPages: 1,
      pageSizes: [10],
      pageSize: 10,
    }
  },
};

const calculateNumberOfPages = (total, pageSize) => Math.ceil(total / pageSize);

const updatePagingParams = function updatePagingParams(state, pagingParams) {
  const { currentPage, pageSize, superheroName } = pagingParams;
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
        superheroName,
        pageSize,
        numberOfPages,
        currentPage: realCurrentPage,
      },
    },
  };
};

const recieveSuperheroes = (state, payload) => {
  const { total, superheroes } = payload;
  const numberOfPages = Math.max(1, calculateNumberOfPages(total, state.ui.paging.pageSize));
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
        numberOfPages,
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
