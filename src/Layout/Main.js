import React from 'react';
import './Main.css';
import SuperheroesList from './SuperheroesList';
import SuperheroeDetails from './SuperheroeDetails';

const Main = () => {
    return (
        <div className="main-container">
            <SuperheroesList />
            <SuperheroeDetails />
        </div>
    );
};

export default Main;

            