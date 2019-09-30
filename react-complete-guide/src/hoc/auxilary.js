const aux = (props) => props.children;

export default aux;

//hoc stands for higher order component becuase it wraps up another component in it.




// So the following code

// <Aux>
//     <h1>First Element</h1>
//     <h1>Second Element</h1>
// </Aux>
// becomes

// <>
//     <h1>First Element</h1>
//     <h1>Second Element</h1>
// </>