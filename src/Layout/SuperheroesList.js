import { connect } from 'react-redux';
import SuperheroesGrid from './SuperheroesGrid';
import { fetchSuperheroes } from './../Store/Actions/Superheroes';
import { withRouter } from 'react-router-dom';

const mapStateToProps = ({ superheroes }) => {
  const {
    list,
    ui: { paging, isFetching },
  } = superheroes;
  return {
    superheroes: list,
    isFetching,
    paging,
  };
};

const mapDispatchToProps = dispatch => ({
  fetchSuperheroes: pagingParams => dispatch(fetchSuperheroes(pagingParams)),
});

const SuperheroesList = connect(
  mapStateToProps,
  mapDispatchToProps
)(SuperheroesGrid);

export default withRouter(SuperheroesList);
