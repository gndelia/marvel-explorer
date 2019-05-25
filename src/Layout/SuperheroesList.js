import { connect } from 'react-redux';
import SuperheroesGrid from './SuperheroesGrid';

const mapStateToProps = ({ superheroes }) => ({
  superheroes
});

const SuperheroesList = connect(mapStateToProps)(SuperheroesGrid);

export default SuperheroesList;
