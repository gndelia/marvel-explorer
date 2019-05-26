import React from 'react';
import './Main.css';
import { Route } from 'react-router';
import SuperheroesList from './SuperheroesList';
import SuperheroDetails from './SuperheroDetails';

const Main = () => (
  <div className="main-container">
    <Route path="/" render={() => (<SuperheroesList />)} />
    <Route path="/:id(\d+)?" render={() => (<SuperheroDetails />)} />
  </div>
);

export default Main;

