import { fetchSuperheroDetails, fetchSuperheroesList } from './MarvelApi';
describe('MarvelApi', () => {
  afterEach(() => global.fetch.mockClear());

  const mockFetch = response => {
    const mockJsonPromise = Promise.resolve(response);
    const mockFetchPromise = Promise.resolve({
      json: () => mockJsonPromise,
    });
    jest.spyOn(global, 'fetch')
      .mockImplementation(() => mockFetchPromise);
  };

  const mockedSuperhero1 = {
    id: 1,
    name: 'mockedName',
    urls: ['mockedUrl'],
    description: 'mockedBio',
    thumbnail: { path: 'mockedPath', extension: 'jpg' },
    comics: { available: 0 },
    series: { available: 0 },
    events: { available: 0 },
    stories: { available: 0 },
  };

  const mockedSuperhero2 = {
    id: 2,
    name: 'mockedName2',
    urls: ['mockedUrl2'],
    description: 'mockedBio2',
    thumbnail: { path: 'mockedPath', extension: 'jpg' },
    comics: { available: 1 },
    series: { available: 2 },
    events: { available: 3 },
    stories: { available: 4 },
  };

  const getParsedSuperhero = (mocked, smallImage = false) => {
    const { comics, series, events, stories, thumbnail, ...rest } = mocked;
    return {
      ...rest,
      appearsInComics: comics.available > 0,
      appearsInSeries: series.available > 0,
      appearsInEvents: events.available > 0,
      appearsInStories: stories.available > 0,
      image: `${thumbnail.path}${smallImage ? '/portrait_small' : ''}.${thumbnail.extension}`,
    };
  };

  it('should fetch and parse the details of a character', async() => {
    const mockSuccessResponse = {
      data: { results: [mockedSuperhero1] },
    };
    mockFetch(mockSuccessResponse);
    const superhero = await fetchSuperheroDetails({ id: mockedSuperhero1.id });
    expect(global.fetch)
      .toHaveBeenCalledTimes(1);
    expect(superhero)
      .toEqual(getParsedSuperhero(mockedSuperhero1));
  });

  it('should retrieve the lists of superheroes', async() => {
    const mockedResponse = { data: { total: 2, results: [mockedSuperhero1, mockedSuperhero2] } };
    mockFetch(mockedResponse);
    const filters = { pageSize: 10, currentPage: 1, superheroName: 'mockedName' };
    const apiResponse = await fetchSuperheroesList(filters);
    expect(global.fetch)
      .toHaveBeenCalledTimes(1);
    expect(apiResponse)
      .toEqual({
        total: mockedResponse.data.total,
        results: mockedResponse.data.results.map(superhero => getParsedSuperhero(superhero, true)),
      });
  });
  // There is no way to verify proper values have been set - there is no spy to use.
  // I leave the test in case a future refactor allow me to test this
  // it('should set proper default values for paging filters', async() => {
  //   mockFetch({ data: {} });
  //   const apiResponse = await fetchSuperheroesList();
  //   expect(global.fetch)
  //     .toHaveBeenCalledWith({ pageSize: 10, currentPage: 1, superheroName: '' });
  // });
});
