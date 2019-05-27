import React from 'react';
import PropTypes from 'prop-types';
import './DetailsPanel.css';

class DetailsPanel extends React.Component {
  constructor(props) {
    super(props);
    this.renderUrls = this.renderUrls.bind(this);
  }

  componentDidMount() {
    if (this.props.superhero.id) {
      this.props.fetchDetails(this.props.superhero.id);
    }
  }

  componentDidUpdate(prevProps) {
    const { id } = this.props.superhero;
    if (prevProps.superhero.id !== id && id === undefined) {
      this.props.cleanDetails();
      return;
    }
    // if url changed
    if (prevProps.superhero.id !== id) {
      this.props.fetchDetails(id);
      return;
    }
  }

  renderUrls(urls) {
    return urls.map(({ type, url }) => (
      <li key={type}>
        <a target="_blank" rel="noopener noreferrer" href={url}>{type}</a>
      </li>)
    );
  }

  render() {
    const { superhero, isFetching } = this.props;
    if (!superhero.id) {
      return <span className="pick-superhero-msg">Pick a superhero to learn about him/her!</span>;
    }
    if (isFetching) {
      return <span>Loading details of the superhero...</span>;
    }
    return (
      <section className="details-panel-container">
        <h2 className="superhero-name">{superhero.name}</h2>
        <div>
          <img className="superhero-image" src={superhero.image} alt="superhero main portrait" />
        </div>
        <span className="superhero-bio">{superhero.description || 'No BIO available'}</span>
        <ul>
          Useful Links:
          {this.renderUrls(superhero.urls)}
        </ul>
      </section>
    );
  }
}

DetailsPanel.propTypes = {
  superhero: PropTypes.shape({
    name: PropTypes.string,
    description: PropTypes.string,
    image: PropTypes.string,
    urls: PropTypes.array,
  }),
};

export default DetailsPanel;
