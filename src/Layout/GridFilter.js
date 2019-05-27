import React, { Fragment } from 'react';
import Pager from './Pager';

const GridFilter = ({ paging, fetchSuperheroes, onSuperheroFilter }) => {
  const onChange = event => onSuperheroFilter(event.target.value);
  return (
    <Fragment>
      <Pager
        paging={paging}
        onNavigateToPage={fetchSuperheroes} />
      <label htmlFor="superhero-filter">Superhero: </label>
      <input
        name="superhero-filter"
        className="superhero-filter"
        type="text"
        placeholder="Wolverine"
        onChange={onChange} />
    </Fragment>
  );
};

export default GridFilter;
