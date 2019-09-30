import React from 'react';
import classes from './Burger.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger = (props) => {

    let transformedIngredients = <p>Please start adding ingredients!</p>
    //console.log("ingredients",props,props.length)
    if(Object.keys(props.ingredients).length !== 0){
        //console.log('am in burger')
        transformedIngredients = Object.keys(props.ingredients)
        .map(igkey => {
            return [...Array(props.ingredients[igkey])].map((_,i) => {
                return <BurgerIngredient key={igkey + i} type={igkey} />
            });
        })
        .reduce((total,currentarrValue,currentIndex,arr) =>{
            // console.log("am here",total,currentarrValue,currentIndex,arr);
            return total.concat(currentarrValue)
        });

        if (transformedIngredients.length === 0){
            transformedIngredients = <p>Please start adding ingredients!</p>
        }
    }
    

    

    // console.log(transformedIngredients);
    return (
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top" />
            {transformedIngredients}
            <BurgerIngredient type="bread-bottom" />  
        </div>
    );
}

export default burger;