import React from 'react';
import { shallow } from 'enzyme';
import DetailsPanel from './DetailsPanel';

describe('Unit tests for DetailsPanel', () => {
  const urls = [{ type: 'bio', url: 'url1' }, { type: 'wiki', url: 'url2' }];
  const superhero = { id: 1, description: 'description', urls, image: 'image.jpg', name: 'name' };

  const createMockRouteMatch = id => ({ params: { id: id && id.toString() } });

  const shallowDetails = (
    superhero,
    isFetching,
    match,
    fetchDetails = jest.fn(),
    cleanDetails = jest.fn(),
  ) => (
    shallow((
      <DetailsPanel
        superhero={superhero}
        isFetching={isFetching}
        match={match}
        fetchDetails={fetchDetails}
        cleanDetails={cleanDetails} />
    ))
  );

  it('renders without crashing', () => {
    shallowDetails({}, true, createMockRouteMatch());
  });

  it('renders a loading message if the data is being fetched', () => {
    const expected = <span>Loading details of the superhero...</span>;
    const wrapper = shallowDetails({ id: 1 }, true, createMockRouteMatch());
    expect(wrapper.equals(expected))
      .toEqual(true);
  });

  it('renders a message when no superhero has been selected', () => {
    const expected = 'Pick a superhero to learn about him/her!';
    const wrapper = shallowDetails({}, false, createMockRouteMatch(0));
    expect(wrapper.text())
      .toEqual(expected);
  });

  it('renders a superhero and its details', () => {
    const fetchDetails = jest.fn();
    const wrapper = shallowDetails(superhero, false, createMockRouteMatch(1), fetchDetails);
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
      .toEqual(`${superhero.description}`);
    expect(wrapper.find('a'))
      .toHaveLength(urls.length);
    expect(fetchDetails)
      .toHaveBeenCalledTimes(1);
  });

  it('renders a "No Bio available" message if the superhero does not have a bio', () => {
    const wrapper = shallowDetails({ ...superhero, description: '' }, false, createMockRouteMatch(1));
    expect(wrapper
      .find('.superhero-bio')
      .first()
      .text()
    )
      .toEqual('No BIO available');
  });

  it('fetches details for a superhero if the id changes (due to routing)', () => {
    const fetchDetails = jest.fn();
    const wrapper = shallowDetails(superhero, false, createMockRouteMatch(1), fetchDetails);
    // update props so did update is called
    const newId = 2;
    wrapper.setProps({
      superhero: { ...superhero, id: newId },
      match: createMockRouteMatch(newId)
    });
    expect(fetchDetails)
      .toHaveBeenLastCalledWith(newId);
    expect(fetchDetails)
      .toHaveBeenCalledTimes(2);
    // set again same props and verify function was not called again
    wrapper.setProps({ match: createMockRouteMatch(newId) });
    expect(fetchDetails)
      .toHaveBeenCalledTimes(2);
  });

  it('should clean details', () => {
    const fetchDetails = jest.fn();
    const cleanDetails = jest.fn();
    const wrapper = shallowDetails(
      superhero,
      false,
      createMockRouteMatch(1),
      fetchDetails,
      cleanDetails
    );
    wrapper.setProps({
      superhero: {
        ...superhero,
        id: undefined,
      },
    });
    expect(cleanDetails)
      .toHaveBeenCalledTimes(1);
  });
});
