import React from 'react';
import { shallow } from 'enzyme';
import DetailsPanel from './DetailsPanel';

describe('Unit tests for DetailsPanel', () => {
  const urls = [{ type: 'bio', url: 'url1' }, { type: 'wiki', url: 'url2' }];
  const superhero = { id: 1, description: 'description', urls, image: 'image.jpg', name: 'name' };

  const shallowDetails = (superhero, isFetching) => (
    shallow(<DetailsPanel superhero={superhero} isFetching={isFetching} />)
  );

  it('renders without crashing', () => {
    shallowDetails({}, true);
  });

  it('renders a loading message if the data is being fetched', () => {
    const expected = <span>Loading details of the superhero...</span>;
    const wrapper = shallowDetails({ id: 1 }, true);
    expect(wrapper.equals(expected))
      .toEqual(true);
  });

  it('renders a message when no superhero has been selected', () => {
    const expected = <span>Pick a superhero to learn about him/her!</span>;
    const wrapper = shallowDetails({}, false);
    expect(wrapper.equals(expected))
      .toEqual(true);
  });

  it('renders a superhero and its details', () => {
    const wrapper = shallowDetails(superhero, false);
    expect(wrapper.find('section'))
      .toHaveLength(1);
    expect(wrapper
      .find('.superhero-name')
      .first()
      .text()
    )
      .toEqual(superhero.name);
    expect(wrapper
      .find('.superhero-bio')
      .first()
      .text()
    )
      .toEqual(`BIO: ${superhero.description}`);
    expect(wrapper.find('a'))
      .toHaveLength(urls.length);
  });

  it('renders a "No Bio available" message if the superhero does not have a bio', () => {
    const wrapper = shallowDetails({ ...superhero, description: '' }, false);
    expect(wrapper
      .find('.superhero-bio')
      .first()
      .text()
    )
      .toEqual('BIO: No BIO available');
  });
});
