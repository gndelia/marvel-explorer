import React from 'react';
import './GridFilter.css';
import Pager from './Pager';

const GridFilter = ({ paging, fetchSuperheroes, onSuperheroFilter }) => {
  const onChange = event => onSuperheroFilter(event.target.value);
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
