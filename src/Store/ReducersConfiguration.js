import { combineReducers } from 'redux';
import selectedSuperhero from './Reducers/SelectedSuperhero';
import superheroes from './Reducers/Superheroes';
const rootReducer = combineReducers({
  selectedSuperhero,
  superheroes,
});

export default rootReducer;
