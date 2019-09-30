
const initialState = {
    persons: []
};

const reducer = (state = initialState,action) => {
    if(action.type === 'ADD_PERSON'){
        const newstate = {
            id: Math.random(),
            name: action.personData.name,
            age: action.personData.age
        }

        return{ 
            ...state,
            persons: state.persons.concat(newstate)
        }

    }

    if(action.type === 'DELETE_PERSON'){
        return{
            ...state, 
            persons: state.persons.filter(person => person.id !== action.PersonId)
        }
    }

    return state; //return state if no action is executed

}


export default reducer;