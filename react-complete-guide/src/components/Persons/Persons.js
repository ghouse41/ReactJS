import React, { Component } from 'react';
import CustomPersonElement from './Person/Person';


// Note: Below function is arrow function but we haven't used curly braces for this function,
//          because below function has only one line code(normal javascript code) inside javascript code we have JSX code,
//          that doesn't be any problem.
/* const persons = (props) => props.persons.map((person,index) =>{
        return <CustomPersonElement 
            name={person.name} 
            age={person.age}
            click={() => props.clicked(index)}
            changed={(event) => props.changed(event,person.id)}
            key={person.id} />
    })
*/

class Persons extends Component {
    constructor(props){
        super(props);
        console.log('[Persons.js] Inside Constructor',props);        
    }
    componentWillMount(){

    console.log('[Persons.js] Inside componentWillMount()');
    }
    
    componentDidMount(){
    console.log('[Persons.js] Inside componentDidMount');
    }

    componentWillReceiveProps(nextProps){
        console.log('[UPDATE Persons.js] Inside componentWillReceiveProps',nextProps)
    }

    shouldComponentUpdate(nextProps,nextState){
        console.log('[UPDATE Persons.js] Inside shouldComponentUpdate',nextProps.persons,nextState,this.props.persons);
        return nextProps.persons !== this.props.persons || nextProps.changed !== this.props.changed ||
        nextProps.clicked !== this.props.clicked;
    }
    
    componentWillUpdate(nextProps,nextState){
        console.log('[UPDATE Persons.js] Inside componentWillUpdate',nextProps);
    }

    componentDidUpdate(){
        console.log('[UPDATE Persons.js] Inside componentDidUpdate');
    }

    render() {
        console.log('[Persons.js] Inside render');
        return this.props.persons.map((person,index) => {
            return <CustomPersonElement 
                name={person.name} 
                age={person.age}
                position={index}
                click={() => this.props.clicked(index)}
                changed={(event) => this.props.changed(event,person.id)}
                key={person.id} />
        } );
    }
}

export default Persons;