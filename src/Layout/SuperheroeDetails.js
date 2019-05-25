import { connect } from 'react-redux';
import DetailsPanel from './DetailsPanel';

const mapStateToProps = ({ selectedSuperhero: superhero }) => ({
  superhero,
});

const SuperheroeDetails = connect(mapStateToProps)(DetailsPanel);

export default SuperheroeDetails;
