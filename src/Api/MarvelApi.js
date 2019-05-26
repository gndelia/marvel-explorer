import { apiFetch, apiFetchDetails } from './Fetch';

// default constants for paging.
const PageSize = 10;

const getDetailsUrl = ({ id }) => `/characters/${id}?`;
const getListUrl = (superheroName, limit, offset) => {
  // encode because some characters might have spaces in their name
  const nameFilter = superheroName && `&nameStartsWith=${encodeURI(superheroName)}`;
  const pagingFilter = `&limit=${limit}&offset=${offset}`;
  return `/characters?${nameFilter}${pagingFilter}`;
};

const parseImage = (superhero, small = false) => (
  `${superhero.thumbnail.path}${small ? '/portrait_small' : ''}.${superhero.thumbnail.extension}`
);

const participedIn = event => event.available > 0;

const parseDetails = superhero => ({
  id: superhero.id,
  name: superhero.name,
  urls: superhero.urls,
  description: superhero.description,
  image: parseImage(superhero),
  appearsInComics: participedIn(superhero.comics),
  appearsInSeries: participedIn(superhero.series),
  appearsInEvents: participedIn(superhero.events),
  appearsInStories: participedIn(superhero.stories),
});

const parseList = ({ data: { total, results } }) => ({
  total,
  results: results.map(superhero => ({
    ...parseDetails(superhero),
    image: parseImage(superhero, true),
  })),
});

export const fetchSuperheroDetails = async function fetchSuperheroDetails(superhero) {
  const response = await apiFetchDetails(getDetailsUrl(superhero));
  const jsonResponse = await response.json();
  return parseDetails(jsonResponse.data.results[0]);
};

export const fetchSuperheroesList = async function fetchSuperheroesList(filters = {}) {
  const { pageSize = PageSize, currentPage = 1, superheroName = '' } = filters;
  const offset = (currentPage - 1) * pageSize;
  const response = await apiFetch(getListUrl(superheroName, pageSize, offset));
  const jsonResponse = await response.json();
  return parseList(jsonResponse);
};
