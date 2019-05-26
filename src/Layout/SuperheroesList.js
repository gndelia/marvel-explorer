import { connect } from 'react-redux';
import SuperheroesGrid from './SuperheroesGrid';
import { fetchDetails } from './../Store/Actions/SuperheroDetails';
import { fetchSuperheroes } from './../Store/Actions/Superheroes';

const mapStateToProps = ({ superheroes }) => {
  const {
    list,
    ui: { paging },
  } = superheroes;
  return {
    superheroes: list,
    paging,
  };
};

const mapDispatchToProps = dispatch => ({
  fetchDetails: superhero => dispatch(fetchDetails(superhero)),
  fetchSuperheroes: pagingParams => dispatch(fetchSuperheroes(pagingParams)),
});

const SuperheroesList = connect(
  mapStateToProps,
  mapDispatchToProps
)(SuperheroesGrid);

export default SuperheroesList;
