import * as actionTypes from '../actions/actionsTypes';
import { updateObject } from '../utility';


const initialState = {
    counter:0
}
//Error: Reducer "ctr" returned undefined during initialization. If the state passed to the reducer is undefined, you must explicitly return the initial state. The initial state may not be undefined. If you don't want to set a value for this reducer, you can use null instead of undefined.

const reducer = (state = initialState ,action) => {

    switch ( action.type ){
        case actionTypes.INCREMENT:
            return updateObject(state,{counter:state.counter + 1})
        case actionTypes.DECREMENT:
            return updateObject(state,{counter:state.counter - 1})    // Here we are overwriting the counter not touching the results.
        case actionTypes.ADD:
            return updateObject(state,{counter:state.counter + action.value})
        case actionTypes.SUB:
            return updateObject(state,{counter:state.counter - action.value})
    }
    return state;
};

export default reducer;
