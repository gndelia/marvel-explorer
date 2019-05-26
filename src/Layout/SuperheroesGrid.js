import React from 'react';
import Pager from './Pager';
import { Link } from 'react-router-dom';

class SuperheroesGrid extends React.Component {
  constructor(props) {
    super(props);
    this.renderSuperheroes = this.renderSuperheroes.bind(this);
  }
  componentDidMount() {
    this.props.fetchSuperheroes(this.props.paging);
  }

  renderSuperheroes() {
    const { superheroes } = this.props;
    return superheroes.map(superhero => (
      <li
        className="superhero-row"
        key={superhero.id}>
        <span>{superhero.name}</span>
        <img src={superhero.image} alt="main superhero thumbnail" />
        <span>{superhero.appearsInComics.toString()}</span>
        <span>{superhero.appearsInSeries.toString()}</span>
        <span>{superhero.appearsInEvents.toString()}</span>
        <span>{superhero.appearsInStories.toString()}</span>
        <Link to={`/${superhero.id}`}>
          <button>View Details</button>
        </Link>
      </li>
    ));
  }

  render() {
    return (
      <section className="superheroes-grid-container">
        <Pager
          paging={this.props.paging}
          onNavigateToPage={this.props.fetchSuperheroes} />
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
