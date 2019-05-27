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
    } = otherProps;
    const Component = (
      <SuperheroesGrid
        superheroes={superheroes}
        fetchSuperheroes={fetchSuperheroes}
        onNavigateToPage={onNavigateToPage}
        paging={paging} />
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
});
