import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import DetailsPanel from './DetailsPanel';
import { fetchDetails, cleanDetails } from './../Store/Actions/SuperheroDetails';

const mapStateToProps = state => {
  const { superheroDetails: { superhero, ui: { isFetching } } } = state;
  return {
    superhero,
    isFetching,
  };
};

const mapDispatchToProps = dispatch => ({
  fetchDetails: id => dispatch(fetchDetails({ id })),
  cleanDetails: () => dispatch(cleanDetails()),
});

const SuperheroDetails = connect(mapStateToProps, mapDispatchToProps)(DetailsPanel);

export default withRouter(SuperheroDetails);
