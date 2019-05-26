import React from 'react';
import './Main.css';
import SuperheroesList from './SuperheroesList';
import SuperheroDetails from './SuperheroDetails';

const Main = () => (
  <div className="main-container">
    <SuperheroesList />
    <SuperheroDetails />
  </div>
);

export default Main;

