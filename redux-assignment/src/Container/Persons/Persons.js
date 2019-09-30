import React,{ Component } from 'react';
import { connect } from 'react-redux';

import Person from '../../Component/Person/Person';
import AddPerson from '../../Component/AddPerson/AddPerson';
import classes from './Persons.css';


class Persons extends Component {


    // state = {
    //     persons: []
    // }

    // addPersonHandler = () => {
    //     const newstate = {
    //         id: Math.random(),
    //         name: 'Max',
    //         age: Math.floor(Math.random() * 40 )
    //     }

    //     this.setState((prevState) => {
    //         return{ persons: prevState.persons.concat(newstate)}
    //     })
    // }

    // deletePersonHandler = (id) => {
    //     this.setState((prevState) => {
    //         return{ persons: prevState.persons.filter(person => person.id !== id)}
    //     })
    // }

    render() {
        return (
            <div className={classes.Persons}>
                <AddPerson clicked={this.props.addPersonHandler}/>
                {this.props.pers.map(person =>(
                    <Person 
                    key= {person.id}
                    name= {person.name}
                    age= {person.age}
                    clicked = {() => this.props.deletePersonHandler(person.id)}/>
                ))}
                
            </div>
        );
    }


}

const mapStateToProps = state => {
    return {
        pers: state.persons
    }

}

const mapDispatchToProps = dispatch => {
    return {
        addPersonHandler: (name,age) => dispatch({type:'ADD_PERSON',personData:{name:name,age:age}}),
        deletePersonHandler: (id) => dispatch({type:'DELETE_PERSON',PersonId:id})
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Persons);