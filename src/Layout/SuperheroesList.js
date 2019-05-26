import { connect } from 'react-redux';
import SuperheroesGrid from './SuperheroesGrid';
import { fetchDetails } from './../Store/Actions/Superhero';

const mapStateToProps = ({ superheroes }) => ({
  superheroes
});

const mapDispatchToProps = dispatch => ({
  fetchDetails: superhero => dispatch(fetchDetails(superhero)),
});

const SuperheroesList = connect(
  mapStateToProps,
  mapDispatchToProps
)(SuperheroesGrid);

export default SuperheroesList;
