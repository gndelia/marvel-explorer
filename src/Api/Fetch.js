import mock from './ListMock';
const BaseMarvelUrl = 'https://gateway.marvel.com/v1/public';
const apiKeys = process.env.REACT_APP_MARVEL_API_KEY;

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
  const { limit, offset = 0 } = getJsonParams(uri);
  !isTestingEnv() && console.warn('Mocking Marvel Api request with a harcoded json. Perhaps you forgot to configure your key?');
  // mock fetch by using the mock
  return Promise.resolve({
    json: () => (Promise.resolve({
      data: {
        ...mock.data,
        results: mock.data.results.slice(offset, offset + limit),
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
  return Promise.resolve({
    json: () => (Promise.resolve({
      data: {
        ...mock.data,
        results: mock.data.results.filter(superhero => superhero.id === id),
      },
    })),
  });
}