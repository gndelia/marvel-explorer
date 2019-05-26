import React from 'react';

class SuperheroesGrid extends React.Component {
  constructor(props) {
    super(props);
    this.renderSuperheroes = this.renderSuperheroes.bind(this);
  }
  componentDidMount() {
    this.props.fetchSuperheroes();
  }

  renderSuperheroes() {
    const { superheroes, fetchDetails } = this.props;
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
        <button onClick={() => fetchDetails(superhero)}>View Details</button>
      </li>
    ));
  }

  render() {
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
          {this.renderSuperheroes()}
        </ul>
      </section>
    );
  }
}
export default SuperheroesGrid;
