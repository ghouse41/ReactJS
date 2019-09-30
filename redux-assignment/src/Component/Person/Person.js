import React from 'react';
import classes from './Person.css';

const person = (props) => {

    return (
        <div className={classes.Person} onClick={props.clicked}>
            <p>Name: {props.name}</p>
            <p>Age: {props.age}</p>
        </div>
    );
}

export default person;