import React from 'react';

const SuperheroesList = ({ superheroes }) => {

    const renderSuperheroes = sp => sp.map(superhero => (
        <li
            key={superhero.id}
        >
            <span>{superhero.name}</span>
            <img src={superhero.image} alt="superhero thumbnail" />
        </li>
    ));  
    return (
        <section>
            <ul className="">
                <li>Name</li>
                <li>Image</li>
            </ul>
            <ul>
                {renderSuperheroes(superheroes)}
            </ul>
        </section>
    );
};

export default SuperheroesList;