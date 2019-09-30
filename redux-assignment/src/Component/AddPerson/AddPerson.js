import React, { Component } from 'react';
import classes from './AddPerson.css';

class AddPerson extends Component {

    state = {
        name: '',
        age: ''
    }

    nameEventListener = (event) => {
        console.log(event.target);
        this.setState({name:event.target.value});
    }

    ageEventListener = (event) => {
        console.log(event.target);
        this.setState({age:event.target.value});
    }

    render() {
        return(
            <div className={classes.AddPerson}>
                
                
                <input 
                    type="text"
                    placeholder="Name"
                    onChange={(event) => this.nameEventListener(event)}
                    value={this.state.name}/>
                <input
                    type="number"
                    placeholder="Age"
                    onChange={(event) => this.ageEventListener(event)}
                    value={this.state.age}/>
                <button onClick={() => this.props.clicked(this.state.name,this.state.age)}>AddPerson</button>
            </div>
        );
    }
}

export default AddPerson;