import React from 'react';
import PropTypes from 'prop-types';
import './DetailsPanel.css';

const DetailsPanel = ({ superhero, isFetching }) => {
  if (!superhero.id) {
    return <span>Pick a superhero to learn about him/her!</span>;
  }
  if (isFetching) {
    return <span>Loading details of the superhero...</span>;
  }
  const renderUrls = urls => urls.map(({ type, url }) => (
    <li key={type}>
      <a href={url}>{type}</a>
    </li>));
  return (
    <section className="details-panel-container">
      <h3>{superhero.name}</h3>
      <img className="superhero-image" src={superhero.image} alt="superhero main portrait" />
      <span>BIO: {superhero.description || 'No BIO available'}</span>
      <ul>
        {renderUrls(superhero.urls)}
      </ul>
    </section>
  );
};

DetailsPanel.propTypes = {
  superhero: PropTypes.shape({
    name: PropTypes.string,
    description: PropTypes.string,
    image: PropTypes.string,
    urls: PropTypes.array,
  }),
};

export default DetailsPanel;
