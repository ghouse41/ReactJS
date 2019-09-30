import React,{Component} from 'react';
import Aux from '../../../hoc/Auxilary/Auxilary';
import Button from '../../UI/Button/Button';

class orderSummary extends Component{

    // orderSummary need not to be class component. it can be functional component.
    // just to print the console log when this component is updated we converted this application into class component.
    componentWillUpdate(){
        console.log("am here.");
    }

    render(){
        const ingredientSummary = Object.keys(this.props.ingredients)
    .map(igkey => {
        return <li key={igkey}>
        <span style={{textTransform:'capitalize'}}>{igkey}</span>:{this.props.ingredients[igkey]}
        </li>
    })
    return(
        <Aux>
            <h3>Your Order</h3>
            <p>A delicious burger with the following ingredients:</p>
            <ul>
                {ingredientSummary}
            </ul>
            <p><strong>Total Price : {this.props.totalprice.toFixed(2)}</strong></p>
            <p>Continue to Checkout?</p> 
            <Button btnType="Danger" clicked={this.props.purchasecancelled}>CANCEL</Button>
            <Button btnType="Success"clicked={this.props.purchaseContinue}>CONTINUE</Button>
        </Aux>
    )
    }

}

export default orderSummary;