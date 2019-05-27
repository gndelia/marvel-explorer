import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import DetailsPanel from './DetailsPanel';
import { fetchDetails, cleanDetails } from './../Store/Actions/SuperheroDetails';

const mapStateToProps = (state, ownProps) => {
  const { superheroDetails: { superhero, ui: { isFetching } } } = state;
  return {
    superhero: {
      ...superhero,
      id: ownProps.match.params.id ? parseInt(ownProps.match.params.id, 10) : undefined,
    },
    isFetching,
  };
};

const mapDispatchToProps = dispatch => ({
  fetchDetails: id => dispatch(fetchDetails({ id })),
  cleanDetails: () => dispatch(cleanDetails()),
});

const SuperheroDetails = connect(mapStateToProps, mapDispatchToProps)(DetailsPanel);

export default withRouter(SuperheroDetails);
