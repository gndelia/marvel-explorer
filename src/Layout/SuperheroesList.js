import { connect } from 'react-redux';
import SuperheroesGrid from './SuperheroesGrid';
import { fetchDetails } from './../Store/Actions/SuperheroDetails';
import { fetchSuperheroes } from './../Store/Actions/Superheroes';

const mapStateToProps = ({ superheroes: { list: superheroes } }) => ({
  superheroes,
});

const mapDispatchToProps = dispatch => ({
  fetchDetails: superhero => dispatch(fetchDetails(superhero)),
  fetchSuperheroes: () => dispatch(fetchSuperheroes()),
});

const SuperheroesList = connect(
  mapStateToProps,
  mapDispatchToProps
)(SuperheroesGrid);

export default SuperheroesList;
