import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actionCreators from '../../store/actions/index';

import CounterControl from '../../components/CounterControl/CounterControl';
import CounterOutput from '../../components/CounterOutput/CounterOutput';
//import * as actionTypes from '../../store/actions/actionsTypes';
class Counter extends Component {
    // state = {
    //     counter: 0
    // }

    // counterChangedHandler = ( action, value ) => {
    //     switch ( action ) {
    //         case 'inc':
    //             this.setState( ( prevState ) => { return { counter: prevState.counter + 1 } } )
    //             break;
    //         case 'dec':
    //             this.setState( ( prevState ) => { return { counter: prevState.counter - 1 } } )
    //             break;
    //         case 'add':
    //             this.setState( ( prevState ) => { return { counter: prevState.counter + value } } )
    //             break;
    //         case 'sub':
    //             this.setState( ( prevState ) => { return { counter: prevState.counter - value } } )
    //             break;
    //     }
    // }

    render () {
        return (
            <div>
                <CounterOutput value={this.props.ctr} />
                <CounterControl label="Increment" clicked={this.props.onIncrementCounter} />
                <CounterControl label="Decrement" clicked={this.props.onDecrementCounter}  />
                <CounterControl label="Add 5" clicked={this.props.addCounter}  />
                <CounterControl label="Subtract 5" clicked={this.props.subCounter}  />
                <hr />
                <button onClick={() => this.props.onStoreResult(this.props.ctr)}>Store Results</button>
                <ul>
                    {this.props.storedResults.map(storedResult => (
                        <li key={storedResult.id} onClick={() => this.props.onDeleteResult(storedResult.id)}>{storedResult.value}</li>
                    ))}
                    
                </ul>
            </div>
        );
    }
}

const mapStateToProps = state => {
    //console.log(state);
    return {
        ctr:state.ctr.counter, // here state is Redux state in reducer.js file
        storedResults: state.res.results
    };
}

const mapDispatchToProps = dispatch =>{
    return{
        onIncrementCounter: () => dispatch(actionCreators.increment()),
        onDecrementCounter: () => dispatch(actionCreators.decrement()),
        addCounter: () => dispatch(actionCreators.add(5)),
        subCounter: () => dispatch(actionCreators.sub(5)),
        onStoreResult: (result) => dispatch(actionCreators.storeResult(result)),
        onDeleteResult: (id) => dispatch(actionCreators.deleteResult(id))
    };
}

export default connect(mapStateToProps,mapDispatchToProps)(Counter);// connect is a function takes input as function "mapStateToProps" and returns 
//export default connect(null,mapDispatchToProps)(Counter); valid syntax if we have only to dispacth actions then use null in first argument.