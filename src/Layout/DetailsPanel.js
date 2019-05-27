import React from 'react';
import PropTypes from 'prop-types';
import './DetailsPanel.css';

class DetailsPanel extends React.Component {
  constructor(props) {
    super(props);
    this.renderUrls = this.renderUrls.bind(this);
  }

  componentDidMount() {
    const id = parseInt(this.props.match.params.id, 10);
    if (Number.isInteger(id)) {
      this.props.fetchDetails(id);
    }
  }

  componentDidUpdate(prevProps) {
    const { id } = this.props.match.params;
    if (prevProps.match.params.id !== id && id === undefined) {
      this.props.cleanDetails();
      return;
    }
    const parsedId = parseInt(id, 10);
    // if url changed
    if (prevProps.match.params.id !== this.props.match.params.id && Number.isInteger(parsedId)) {
      this.props.fetchDetails(parsedId);
      return;
    }
  }

  renderUrls(urls) {
    return urls.map(({ type, url }) => (
      <li key={type}>
        <a href={url}>{type}</a>
      </li>)
    );
  }

  render() {
    const { superhero, isFetching } = this.props;
    if (!superhero.id) {
      return <span>Pick a superhero to learn about him/her!</span>;
    }
    if (isFetching) {
      return <span>Loading details of the superhero...</span>;
    }
    return (
      <section className="details-panel-container">
        <h2 className="superhero-name">{superhero.name}</h2>
        <div className="middle-section">
          <img className="superhero-image" src={superhero.image} alt="superhero main portrait" />
          <span className="superhero-bio">BIO: {superhero.description || 'No BIO available'}</span>
        </div>
        <ul>
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
