import { fetchSuperheroDetails } from './MarvelApi';
describe('MarvelApi', () => {
  it('should fetch and parse the details of a character', async() => {
    const id = 1;
    const mockedSuperhero = {
      id,
      name: 'mockedName',
      urls: ['mockedUrl'],
      description: 'mockedBio',
      thumbnail: {
        path: 'mockedPath',
        extension: 'jpg',
      },
    };
    const mockSuccessResponse = {
      data: { results: [mockedSuperhero] },
    };
    const mockJsonPromise = Promise.resolve(mockSuccessResponse);
    const mockFetchPromise = Promise.resolve({
      json: () => mockJsonPromise,
    });
    jest.spyOn(global, 'fetch')
      .mockImplementation(() => mockFetchPromise);
    const superhero = await fetchSuperheroDetails({ id });
    const { thumbnail, ...rest } = mockedSuperhero;
    expect(global.fetch)
      .toHaveBeenCalledTimes(1);
    expect(superhero)
      .toEqual({
        ...rest,
        image: `${thumbnail.path}.${thumbnail.extension}`,
      });
    global.fetch.mockClear();
  });
});
