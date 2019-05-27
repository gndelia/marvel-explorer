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
        {this.props.isFetching ?
          (<span>Loading data..</span>)
          : (
            <ul className="superheroes-rows-container">
              {this.renderSuperheroes()}
            </ul>
          )}
      </section>
    );
  }
}
export default SuperheroesGrid;
