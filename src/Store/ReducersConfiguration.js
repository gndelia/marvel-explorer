import { combineReducers } from 'redux';
import superheroDetails from './Reducers/SuperheroDetails';
import superheroes from './Reducers/Superheroes';
const rootReducer = combineReducers({
  superheroDetails,
  superheroes,
});

export default rootReducer;
