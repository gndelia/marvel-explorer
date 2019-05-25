import React from 'react';

const SuperheroesList = ({ superheroes }) => {
  const renderRows = sp => sp.map(superhero => (
    <li
      key={superhero.id}>
      <span>{superhero.name}</span>
      <img src={superhero.image} alt="superhero thumbnail" />
      <span>{superhero.appearsInComics.toString()}</span>
      <span>{superhero.appearsInSeries.toString()}</span>
      <span>{superhero.appearsInEvents.toString()}</span>
      <span>{superhero.appearsInStories.toString()}</span>
    </li>
  ));
  return (
    <section>
      <ul className="">
        <li>Name</li>
        <li>Image</li>
        <li>Participates in Comics</li>
        <li>Participates in Series</li>
        <li>Participates in Events</li>
        <li>Participates in Stories</li>
      </ul>
      <ul>
        {renderRows(superheroes)}
      </ul>
    </section>
  );
};

export default SuperheroesList;
