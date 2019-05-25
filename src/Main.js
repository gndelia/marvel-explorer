import React from 'react';
import './Main.css';
import SuperheroesList from './SuperheroesList';
import DetailsPanel from './DetailsPanel';

const Main = () => {
    const superhero = {
        name: 'Wolverine',
        description: 'Born with super-human senses and the power to heal from almost any wound, Wolverine was captured by a secret Canadian organization and given an unbreakable skeleton and claws. Treated like an animal, it took years for him to control himself. Now, he\'s a premiere member of both the X-Men and the Avengers.',
        image: 'http://i.annihil.us/u/prod/marvel/i/mg/2/60/537bcaef0f6cf/standard_fantastic.jpg',
        urls: [{
            type: 'detail',
            url: 'http://marvel.com/comics/characters/1009718/wolverine?utm_campaign=apiRef&utm_source=001ac6c73378bbfff488a36141458af2',
        }, {
            type: 'wiki',
            url: 'http://marvel.com/universe/Wolverine_(James_Howlett)?utm_campaign=apiRef&utm_source=001ac6c73378bbfff488a36141458af2',
        }],
    };

    const superheros = {
        name: '3-D Man',
        image: 'http://i.annihil.us/u/prod/marvel/i/mg/c/e0/535fecbbb9784/portrait_small.jpg',
        appearsInComics: true,
        appearsInSeries: false,
        appearsInEvents: true,
        appearsInStory: false,
    };
    return (
        <div className="main-container">
            <SuperheroesList superheroes={Array(6).fill(superheros)}/>
            <DetailsPanel superhero={superhero} />
        </div>
    );
};

export default Main;

            