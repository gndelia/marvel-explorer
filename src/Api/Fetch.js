// If the API worked fine, this file would not exists.
// MarvelApi would be the encapsulated service that handles all requests
// however, due to the need of mocking (or not easily) the results
// I created this file. However, it does its functionality and that's all
// It is now a beautiful code to maintain :) 
import mock from './ListMock';
const BaseMarvelUrl = process.env.REACT_APP_MARVEL_API_URL;
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

// show this message because user might have an api key, but forgot to configure it
const warnAboutMocking = () => !isTestingEnv()
&& console.warn('Mocking Marvel Api request with a harcoded json. Perhaps you forgot to configure your key?');

// if there are keys, we assume marvel api works and we use it
// do not mock here if env is test, because our tests are already mocking fetch
const isTestingEnv = () => process.env.NODE_ENV === 'test';
const isApiConfigured = () => apiKeys && apiKeys !== '<YOUR-KEY-HERE>';

export const apiFetch = function apiFetch(uri) {
  if (isTestingEnv() || isApiConfigured()) {
    return fetch(`${BaseMarvelUrl}${uri}&apikey=${apiKeys}`);
  }
  const { limit, offset = 0, nameStartsWith = '' } = getJsonParams(uri);
  const parsedOffset = parseInt(offset, 10);
  warnAboutMocking();
  // mock fetch by using the mock
  const filtered = mock.data.results
    .filter(sp => sp.name.toLowerCase().startsWith(nameStartsWith.toLowerCase()));
  return Promise.resolve({
    json: () => (Promise.resolve({
      data: {
        ...mock.data,
        total: filtered.length,
        results: filtered.slice(parsedOffset, parsedOffset + parseInt(limit), 10),
      },
    })),
  });
};

export const apiFetchDetails = function apiFetchDetails(uri) {
  if(isTestingEnv() || isApiConfigured()) {
    return fetch(`${BaseMarvelUrl}${uri}&apikey=${apiKeys}`);
  }
  warnAboutMocking();
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
        results: [superhero],
      },
    })),
  });
}