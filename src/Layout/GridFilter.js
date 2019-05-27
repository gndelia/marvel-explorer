import React from 'react';
import AwesomeDebouncePromise from 'awesome-debounce-promise';
import './GridFilter.css';
import Pager from './Pager';

const GridFilter = ({ paging, fetchSuperheroes, onSuperheroFilter }) => {
  const debouncingTime = 500;
  // create debounced function to prevent multiple requests
  const debouncedOnSuperheroFilter = AwesomeDebouncePromise(onSuperheroFilter, debouncingTime);
  const onChange = async event => await debouncedOnSuperheroFilter(event.target.value);

  return (
    <div className="grid-filter-container">
      <Pager
        paging={paging}
        onNavigateToPage={fetchSuperheroes} />
      <div>
        <label htmlFor="superhero-filter">Superhero:
        </label>
        <input
          name="superhero-filter"
          className="superhero-filter"
          type="text"
          placeholder="Wolverine"
          onChange={onChange} />
      </div>
    </div>
  );
};

export default GridFilter;
