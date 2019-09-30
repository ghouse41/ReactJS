import React,{Component} from 'react';
import { connect } from 'react-redux';
import Aux from '../../hoc/Auxilary/Auxilary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildContols/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinnner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actionTypes from '../../store/actions';



class BurgerBuilder extends Component {

    state = {
        Purchasing: false,
        Loading:false,
        error:false

    }

    // componentDidMount() {
    //     console.log("BurgerBuilder.js - am in componentDidMount")
    //     // axios.get('/ingredients.json')
    //     // .then(response => {
    //     //     this.setState({ingredients:response.data});
    //     //     this.updatePurchaseState(response.data)
    //     //     console.log("BurgerBuilder.js - am in componentDidMount",response.data)
    //     // }).catch(error => {
    //     //     this.setState({error:true})
    //     // })
    // }

    purchaseHandler = () => {
        this.setState({Purchasing:true})
    }

    purchaseCancelHandler =() => {
        this.setState({Purchasing:false})
    }

    purchaseContinueHandler =() =>{
        //alert('continue!');
        // this.setState({Loading:true});

        // const order = {
        //     ingredients:this.state.ingredients,
        //     price:this.state.price,
        //     customer:{
        //         name:'Ghouse',
        //         address:{
        //             street:'twolichowki',
        //             zipcode:'500081',
        //             country:'India'
        //         },
        //         email:'test@test.com'
        //     },
        //     delveryMethod:'fastest'
        // }
        // axios.post('/orders.json',order)
        // .then(response => {
        //     console.log(response);
        //     this.setState({Loading:false,Purchasing:false});

        // }).catch(error => {
        //     console.log(error);
        //     this.setState({Loading:false,Purchasing:false});
        // })



        // const queryParams =[];
        // for (let i in this.state.ingredients){
        //     queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]))
        // }
        // queryParams.push('price='+this.state.totalPrice);
        // const queryString = queryParams.join('&');
        // this.props.history.push({
        //     pathname: '/checkout',
        //     search: '?' + queryString
        // })

        this.props.history.push({
            pathname: '/checkout'
        })


    }

    updatePurchaseState = (ingredients) => {
        const sum = Object.keys(ingredients).map(igkey => {
            return ingredients[igkey];
        }).reduce((sum,el) => {
            return sum + el;
        },0);

        return sum > 0
    }

    // addIngredientHandler = (type) => {
    //     const oldCount = this.state.ingredients[type];
    //     const updatedCount = oldCount + 1;
    //     const updatedIngredients = {
    //         ...this.state.ingredients
    //     };
    //     updatedIngredients[type] = updatedCount;
    //     const priceAddition = INGREDIENT_PRICES[type];
    //     const oldPrice = this.state.totalPrice;
    //     const newPrice = oldPrice + priceAddition;
    //     this.setState({totalPrice:newPrice,ingredients:updatedIngredients})
    //     this.updatePurchaseState(updatedIngredients)
    // }

    // removeIngredientHandler = (type) => {
    //     const oldCount = this.state.ingredients[type];
    //     let  updatedCount = 0;
    //     if(oldCount !== 0){
    //         updatedCount = oldCount - 1;
    //     }
    //     const updatedIngredients = {
    //         ...this.state.ingredients
    //     }
    //     updatedIngredients[type] = updatedCount;
    //     const priceDeduction = INGREDIENT_PRICES[type];
    //     const oldPrice = this.state.totalPrice;
    //     const newPrice = oldPrice - priceDeduction;
    //     this.setState({totalPrice:newPrice,ingredients:updatedIngredients})
    //     this.updatePurchaseState(updatedIngredients)
    // }

    render(){

        const disabledInfo = {...this.props.ings};

        for(let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <= 0;
        }
        
        let orderSummary = null;
        let burger = this.state.error ? <p>Ingredients cannot be loaded..!</p>:<Spinner/>;

        if(this.props.ings){
            burger = (
                <Aux>
                <Burger ingredients= {this.props.ings}/>
                    <BuildControls 
                    ingredientAdded = {this.props.onIngredientAdded}
                    ingredientRemoved= {this.props.onIngredientRemoved}
                    disabled = {disabledInfo}
                    purchasable = {this.updatePurchaseState(this.props.ings)}
                    price = {this.props.tot_price}
                    ordered = {this.purchaseHandler}/>
                </Aux>
            );

            orderSummary = <OrderSummary ingredients={this.props.ings} 
                                        purchasecancelled = {this.purchaseCancelHandler}
                                        purchaseContinue = {this.purchaseContinueHandler}
                                        totalprice = {this.props.tot_price}/>

        }

        if(this.state.Loading) {
            orderSummary = <Spinner/>; // no use of this verified by ghouse
        }

        
        return(
            <Aux>
                <Modal show={this.state.Purchasing} modalclosed={this.purchaseCancelHandler} Loading={this.state.Loading}> 
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
    }
}

const mapStateToProps = state => {
    return {
        ings: state.ingredients,
        tot_price: state.totalPrice
    };
}

const mapDispatchToProps = dispatch => {
    return{
        onIngredientAdded: (ingName) => dispatch({type:actionTypes.ADD_INGREDIENT,ingredientName:ingName}),
        onIngredientRemoved: (ingName) => dispatch({type:actionTypes.REMOVE_INGREDIENT,ingredientName:ingName})
    }
}

export default connect(mapStateToProps,mapDispatchToProps) (withErrorHandler(BurgerBuilder,axios));