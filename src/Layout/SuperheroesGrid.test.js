import React from 'react';
import { shallow } from 'enzyme';
import SuperheroesGrid from './SuperheroesGrid';

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
  const shallowGrid = (superheroes, fetchDetails) => (
    shallow(<SuperheroesGrid superheroes={superheroes} fetchDetails={fetchDetails} />)
  );
  it('should render without crashing', () => {
    shallowGrid([], jest.fn());
  });

  it('should render a list of superheroes', () => {
    const wrapper = shallowGrid(superheroes, jest.fn());
    expect(wrapper.find('.superhero-row'))
      .toHaveLength(superheroes.length);
  });

  it('should fetch details of the superhero when clicking Details button', () => {
    const fetchDetailsSpy = jest.fn();
    const wrapper = shallowGrid(superheroes, fetchDetailsSpy);
    const superheroIndex = 2;
    wrapper
      .find('button')
      .at(superheroIndex)
      .simulate('click');
    expect(fetchDetailsSpy)
      .toHaveBeenCalledWith(superheroes[superheroIndex]);
  });
});
