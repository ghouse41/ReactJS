import React from 'react';
import classes from './Cockpit.css';

const Cockpit = (props) => {

    const assignedclasses = [];
    let btnclass = '';
    
    if(props.showPersons){
        btnclass = classes.Red;
    }
    if(props.persons.length < 2){
      assignedclasses.push(classes.red); // classes = ['red']
    }
    if(props.persons.length < 1){
      assignedclasses.push(classes.bold); // classes = ['red','bold']
    }

    return(
        <div className={classes.Cockpit}>
          <h1> Hi i'm react app </h1>
          <h2> {props.appTitle} </h2>
          <p className={assignedclasses.join(' ')}> this is working dynamic class name change </p>
          <button onClick={props.switchNameHandler.bind(this,'Shaik')}>Switch Name</button>
          <button className={btnclass} onClick={props.togglePersonHandler}>Toggle Persons </button>
        </div>
    );
}

export default Cockpit;