import { connect } from 'react-redux';
import DetailsPanel from './DetailsPanel';

const mapStateToProps = ({ superheroDetails: { superhero, ui: { isFetching } } }) => ({
  superhero,
  isFetching,
});

const SuperheroDetails = connect(mapStateToProps)(DetailsPanel);

export default SuperheroDetails;
