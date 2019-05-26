import React from 'react';
import { shallow } from 'enzyme';
import SuperheroesGrid from './SuperheroesGrid';
import Pager from './Pager';

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
      fetchDetails = jest.fn(),
      fetchSuperheroes = jest.fn(),
      onNavigateToPage = jest.fn(),
      paging = {},
    } = otherProps;
    const Component = (
      <SuperheroesGrid
        superheroes={superheroes}
        fetchDetails={fetchDetails}
        fetchSuperheroes={fetchSuperheroes}
        onNavigateToPage={onNavigateToPage}
        paging={paging} />
    );
    return shallow(Component);
  };
  it('should render without crashing', () => {
    shallowGrid([]);
  });

  it('should fetch super heroes on loading', () => {
    const fetchSuperheroes = jest.fn();
    shallowGrid([], { fetchSuperheroes });
    expect(fetchSuperheroes)
      .toHaveBeenCalledTimes(1);
  });

  it('should render the proper components', () => {
    const wrapper = shallowGrid(superheroes);
    expect(wrapper.find('.superhero-row'))
      .toHaveLength(superheroes.length);
    expect(wrapper.exists(Pager))
      .toEqual(true);
  });

  it('should fetch details of the superhero when clicking Details button', () => {
    const fetchDetails = jest.fn();
    const wrapper = shallowGrid(superheroes, { fetchDetails });
    const superheroIndex = 2;
    wrapper
      .find('button')
      .at(superheroIndex)
      .simulate('click');
    expect(fetchDetails)
      .toHaveBeenCalledWith(superheroes[superheroIndex]);
  });
});
