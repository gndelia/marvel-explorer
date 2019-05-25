import React from 'react';
import './App.css';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';

const App = () => {
    return (
        <div className="app-container">
            <Header />
            <Main />
            <Footer />
        </div>
    );
}

export default App;
