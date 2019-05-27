import mock from './ListMock';
const BaseMarvelUrl = 'https://gateway.marvel.com/v1/public';
const apiKeys = process.env.REACT_APP_MARVEL_API_KEY;

// set total
mock.data.total = mock.data.results.length;
// add public url for image path
mock.data.results.forEach(sp => sp.thumbnail.path = `${process.env.PUBLIC_URL}${sp.thumbnail.path}`);

const getJsonParams = uri => {
  // to simplify time, we extract params from the uri
  return  uri
    .split('&')
    .map(params => params.split('='))
    .reduce((memo, ind) => {
      memo[ind[0]] = ind[1] === Number(ind[1]) ? parseFloat(ind[1],10) : decodeURIComponent(ind[1]);
      return memo;
    }, {});
};

// if there are keys, we assume marvel api works and we use it
// do not mock here if env is test, because our tests are already mocking fetch
const isTestingEnv = () => process.env.NODE_ENV === 'test';
const isApiConfigured = () => apiKeys && apiKeys !== '<YOUR-KEY-HERE>';

export const apiFetch = function apiFetch(uri) {
  if (isTestingEnv() || isApiConfigured()) {
    return fetch(`${BaseMarvelUrl}${uri}${apiKeys}`);
  }
  const { limit, offset = 0, nameStartsWith = '' } = getJsonParams(uri);
  !isTestingEnv() && console.warn('Mocking Marvel Api request with a harcoded json. Perhaps you forgot to configure your key?');
  // mock fetch by using the mock
  const filtered = mock.data.results
    .filter(sp => sp.name.toLowerCase().startsWith(nameStartsWith.toLowerCase()));
  return Promise.resolve({
    json: () => (Promise.resolve({
      data: {
        ...mock.data,
        total: filtered.length,
        results: filtered.slice(offset, offset + limit),
      },
    })),
  });
};

export const apiFetchDetails = function apiFetchDetails(uri) {
  if(isTestingEnv() || isApiConfigured()) {
    return fetch(`${BaseMarvelUrl}${uri}${apiKeys}`);
  }
  !isTestingEnv() && console.warn('Mocking Marvel Api request with a harcoded json. Perhaps you forgot to configure your key?');
  // extract id from url, it will be the only number
  const id = parseInt(uri.match(/\d+/)[0], 10);
  // mock fetch by using the mock
  const superhero = mock.data.results.find(superhero => superhero.id === id);
  return Promise.resolve({
    json: () => (Promise.resolve({
      data: {
        ...mock.data,
        total: 1,
        // use a larger image for details
        results: [{
          ...superhero,
          thumbnail: {
            ...superhero.thumbnail,
            path: `${process.env.PUBLIC_URL}/iron-man`,
          },
        }],
      },
    })),
  });
}