// we have to import React because to treate person function as React function/Jsx function.
// Jsx means Javascript + html code.
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classes from './Person.css';
import anotherWithClass from '../../../hoc/anotherwithClass';
import Aux from '../../../hoc/auxilary';

class Person extends Component {

    constructor(props){
        super(props);
        console.log('[Person.js] Inside Constructor',props);
        this.inputElement = React.createRef();
    }
      componentWillMount(){
    
        console.log('[Person.js] Inside componentWillMount()');
      }
      
      componentDidMount(){
        console.log('[Person.js] Inside componentDidMount');
        if( this.props.position === 0 ){
            this.inputElement.current.focus();
        }
        
      }


    render(){
        console.log('[Person.js] Inside render');
        return (<Aux>
                    <p onClick = {this.props.click}> I'm {this.props.name}, age: {this.props.age}</p>
                    <p> {this.props.children} </p>
                    <input
                    ref={this.inputElement}
                    type="text"
                    onChange={this.props.changed}
                    value={this.props.name} /> 
                </Aux>
        );
        // return([
        //     <p key="1" onClick = {this.props.click}> I'm {this.props.name}, age: {this.props.age}</p>,
        //     <p key="2" > {this.props.children} </p>,
        //     <input key="3" type="text"  onChange={this.props.changed} value={this.props.name} /> 
        // ]);
    }
}

Person.propTypes = {
    click: PropTypes.func,
    age: PropTypes.number,
    name:PropTypes.string
}

/*
const person = (props) => {
    return <div className={classes.Person}>
            <p onClick = {props.click}> I'm {props.name}, age: {props.age}</p>
            <p> {props.children} </p>
            <input type="text"  onChange={props.changed} value={props.name} /> 
        </div>
}
*/

export default anotherWithClass(Person,classes.Person);