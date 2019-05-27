import React from 'react';
import { Link } from 'react-router-dom';
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
        <img src={superhero.image} alt="main superhero thumbnail" />
        <AppearsIn event={superhero.appearsInComics} />
        <AppearsIn event={superhero.appearsInSeries} />
        <AppearsIn event={superhero.appearsInEvents} />
        <AppearsIn event={superhero.appearsInStories} />
        <Link to={`/${superhero.id}`}>
          <button>View Details</button>
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
        <ul className="">
          <li>Name</li>
          <li>Image</li>
          <li>Participates in Comics</li>
          <li>Participates in Series</li>
          <li>Participates in Events</li>
          <li>Participates in Stories</li>
        </ul>
        <ul>
          {this.renderSuperheroes()}
        </ul>
      </section>
    );
  }
}
export default SuperheroesGrid;
