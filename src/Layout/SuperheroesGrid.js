import React from 'react';
import { Link } from 'react-router-dom';
import './SuperheroesGrid.css';
import GridFilter from './GridFilter';
import AppearsIn from './AppearsIn';

class SuperheroesGrid extends React.Component {
  constructor(props) {
    super(props);
    this.renderSuperheroes = this.renderSuperheroes.bind(this);
    this.onSuperheroFilter = this.onSuperheroFilter.bind(this);
    this.renderGrid = this.renderGrid.bind(this);
  }
  componentDidMount() {
    this.props.fetchSuperheroes(this.props.paging);
  }

  onSuperheroFilter(superheroName) {
    this.props.fetchSuperheroes({
      ...this.props.paging,
      superheroName,
    });
  }

  renderGrid() {
    if (this.props.isFetching) {
      return <span className="superheroes-loading">Loading data..</span>;
    }
    if (this.props.superheroes.length === 0) {
      return <span className="no-superheroes-found">No superheroes were found!</span>;
    }
    return (
      <ul className="superheroes-rows-container">
        {this.renderSuperheroes()}
      </ul>
    );
  }

  renderSuperheroes() {
    const { superheroes } = this.props;
    return superheroes.map(superhero => (
      <li
        className="superhero-row"
        key={superhero.id}>
        <span>{superhero.name}</span>
        <div>
          <img src={superhero.image} alt="main superhero thumbnail" />
        </div>
        <div className="appears-in-container">
          <AppearsIn event={superhero.appearsInComics} />
          <AppearsIn event={superhero.appearsInSeries} />
          <AppearsIn event={superhero.appearsInEvents} />
          <AppearsIn event={superhero.appearsInStories} />
        </div>
        <Link to={`/${superhero.id}`}>
          <button className="btn btn-view-details">View</button>
        </Link>
        <a
          className="external-link-attribution"
          target="_blank"
          rel="noopener noreferrer"
          href={superhero.urls.length > 0 ? superhero.urls[0].url : 'https://marvel.com'}>
            Attribution
        </a>
      </li>
    ));
  }

  render() {
    return (
      <section className="superheroes-grid-container">
        <GridFilter
          paging={this.props.paging}
          fetchSuperheroes={this.props.fetchSuperheroes}
          onSuperheroFilter={this.onSuperheroFilter} />
        <ul className="header-grid">
          <li>Name</li>
          <li>Image</li>
          <li className="participations-container">
            <span>Participates in:</span>
            <div className="participations">
              <span>Comics</span>
              <span>Series</span>
              <span>Events</span>
              <span>Stories</span>
            </div>
          </li>
        </ul>
        {this.renderGrid()}
      </section>
    );
  }
}
export default SuperheroesGrid;
