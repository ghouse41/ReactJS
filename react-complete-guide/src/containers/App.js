import React, { Component } from 'react';

import classes from './App.css';
// CustomPersonElement is a new user html element which renders Person function.
// CustomPersonElement will be mapped as person because by default we are exporting person in Person.js file.
// User can choose any name instead of CustomPersonElement.
import Persons from '../components/Persons/Persons';// no need to write extenstion(.js) React will take care.
import Cockpit from '../components/Cockpit/Cockpit';
import Aux from '../hoc/auxilary';
import anotherWithClass from '../hoc/anotherwithClass';

class App extends Component {
  //We cannot write two state properties instead append newpersons array to existing state.
  
  constructor(props){
    super(props);
    console.log('[App.js] Inside Constructor',props);

    this.state = {
      persons: [
        { id:'as1', name: 'Ghouse', age: 27},
        { id:'ba1', name: 'Shaik', age: 27}
      ],
      newpersons: [
        {name: 'nawaz',age: 28}
      ],
      showstate : true,
      togglecount: 0
    };
  }

  componentWillMount(){

    console.log('[App.js] Inside componentWillMount()');
  }
  
  componentDidMount(){
    console.log('[App.js] Inside componentDidMount');
  }  


  switchNameHandler = (newName) => {
    console.log("was clicked!");
    this.setState({
      persons:[
      { id:'ba1', name: newName, age: 27},
      { id:'as1', name: 'Ghouse', age: 27}
    ]    
  });
}

  deleteNameHandler = (personIndex) => {
    // copies array object to new varibale "persons"
    //const persons = this.state.persons.slice();
    //another approch is by using spread operator
    const persons = [...this.state.persons];
    persons.splice(personIndex,1);
    this.setState(
      {persons: persons}
    );
  }

  namechangeHandler = (event,id) =>{
    const personIndex = this.state.persons.findIndex(p => {
        return p.id === id; 
    });

    const person = this.state.persons[personIndex];
    person.name = event.target.value;

    const persons = [...this.state.persons];
    persons[personIndex] = person;

    this.setState({
      persons: persons
    });
  }

  togglePersonHandler = () =>{
    const doesshow = this.state.showstate;
    this.setState((prevState,props)=>{
      console.log('prevState is ',prevState);
      return{
        showstate:!doesshow,
        togglecount: prevState.togglecount +1
      }
    })
  }

  render() {
    let persons = null;

    console.log('[App.js] Inside render')
    if ( this.state.showstate ){
      persons = (
        <div>
            <Persons 
            persons={this.state.persons}
            clicked={this.deleteNameHandler}
            changed={this.namechangeHandler} />
        </div>        
      );
           
    }
    
    
    return (
        <Aux>
          <Cockpit 
          appTitle = {this.props.title}
          persons = {this.state.persons}
          showPersons = {this.state.showstate}
          switchNameHandler = {this.switchNameHandler}
          togglePersonHandler = {this.togglePersonHandler}
          />
          {persons}
        </Aux>
    );
    //return React.createElement('div',{class : 'App'},React.createElement('h1',null,'Does this work now?'))
  }
}

export default anotherWithClass(App,classes.App);
