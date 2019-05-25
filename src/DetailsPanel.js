import React from 'react';
import PropTypes from 'prop-types';
import './DetailsPanel.css';

const DetailsPanel = ({ superhero }) => {

    const renderUrls = urls => urls.map(({ type, url }) => (<li key={type}><a href={url} >{type}</a></li>));
    return (
        <section className="details-panel-container">
            <h3>{superhero.name}</h3>
            <img className="superhero-image" src={superhero.image} alt="superhero main image" />
            <span>BIO: {superhero.description}</span>
            <ul>
                {renderUrls(superhero.urls)}
            </ul>
        </section>
    )
};

DetailsPanel.propTypes = {
    superhero: PropTypes.shape({
        name: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        image: PropTypes.string.isRequired,
        urls: PropTypes.array.isRequired,
    }),
};

export default DetailsPanel;