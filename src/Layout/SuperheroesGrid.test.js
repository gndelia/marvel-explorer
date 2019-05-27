import React from 'react';
import { shallow } from 'enzyme';
import SuperheroesGrid from './SuperheroesGrid';
import GridFilter from './GridFilter';

describe('tests for SuperheroesGrid component', () => {
  const superheroes = Array.from(Array(4))
    .map((el, index) => ({
      id: index,
      name: `superhero${index}`,
      image: 'image.jpg',
      urls: [],
      appearsInComics: Math.random() < 0.5,
      appearsInSeries: Math.random() < 0.5,
      appearsInStories: Math.random() < 0.5,
      appearsInEvents: Math.random() < 0.5,
    }));
  const shallowGrid = (superheroes, otherProps = {}) => {
    // add some default values to mock what is not necessary for the specific shallow render.
    const {
      fetchSuperheroes = jest.fn(),
      onNavigateToPage = jest.fn(),
      paging = {},
      isFetching = false,
    } = otherProps;
    const Component = (
      <SuperheroesGrid
        superheroes={superheroes}
        fetchSuperheroes={fetchSuperheroes}
        onNavigateToPage={onNavigateToPage}
        paging={paging}
        isFetching={isFetching} />
    );
    return shallow(Component);
  };
  it('should render without crashing', () => {
    shallowGrid([]);
  });

  it('should fetch superheroes on loading', () => {
    const fetchSuperheroes = jest.fn();
    shallowGrid([], { fetchSuperheroes });
    expect(fetchSuperheroes)
      .toHaveBeenCalledTimes(1);
  });

  it('should render the proper components', () => {
    const wrapper = shallowGrid(superheroes);
    expect(wrapper.find('.superhero-row'))
      .toHaveLength(superheroes.length);
    expect(wrapper.exists(GridFilter))
      .toEqual(true);
  });

  it('should generate appropiate link for a superhero', () => {
    const wrapper = shallowGrid(superheroes);
    const superheroIndex = 2;
    expect(
      wrapper
        .find('Link')
        .at(superheroIndex)
        .prop('to')
    )
      .toEqual(`/${superheroes[superheroIndex].id}`);
  });

  const assertAttribution = (url, expectedUrl) => {
    const superhero = [{
      ...superheroes[0],
      urls: [],
    }];
    if (url.length > 0) {
      superhero[0].urls.push({ url });
    }
    const wrapper = shallowGrid(superhero);
    const attribution = wrapper
      .find('.external-link-attribution')
      .at(0);
    expect(attribution.text())
      .toEqual('Attribution');
    expect(attribution
      .props()
      .href
    )
      .toEqual(expectedUrl);
  };

  it('should generate the attributions for a superhero', () => {
    const url = 'my.mocked.url';
    assertAttribution(url, url);
  });

  it('should render an attribution with default link if no url was provided', () => {
    const url = '';
    assertAttribution(url, 'https://marvel.com');
  });

  it('should render a message if no superheroes were found', () => {
    const wrapper = shallowGrid([]);
    expect(wrapper.find('.superhero-row'))
      .toHaveLength(0);
    expect(wrapper.find('.no-superheroes-found'))
      .toHaveLength(1);
  });

  it('should render a message if the superheroes are being fetched', () => {
    const wrapper = shallowGrid([], { isFetching: true });
    expect(wrapper.find('.superheroes-loading'))
      .toHaveLength(1);
    expect(wrapper.find('.no-superheroes-found'))
      .toHaveLength(0);
  });
});
