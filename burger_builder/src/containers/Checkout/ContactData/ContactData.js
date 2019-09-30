import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinnner/Spinner';
import Input from '../../../components/UI/Input/Input';


class ContactData extends Component {
    state = {
        orderForm: {
            name: {
                elementType: 'input', // html tag name,
                elementConfig: { // arrtibutes of html tag
                    type:'text',
                    placeholder:'your Name'
                },
                value:'',// display data in html tag
                validation:{
                    required:true
                },
                valid:false,
                touched:false
            },
            street:{
                elementType: 'input', // html tag name,
                elementConfig: { // arrtibutes of html tag
                    type:'text',
                    placeholder:'Street'
                },
                value: '',// display data in html tag
                validation:{
                    required:true
                },
                valid:false,
                touched:false
            },
            zipcode:{
                elementType: 'input', // html tag name,
                elementConfig: { // arrtibutes of html tag
                    type:'text',
                    placeholder:'Zip Code'
                },
                value:'',// display data in html tag
                validation:{
                    required:true,
                    minLength:1,
                    maxLength:5
                },
                valid:false,
                touched:false
            },
            country:{
                elementType: 'input', // html tag name,
                elementConfig: { // arrtibutes of html tag
                    type:'text',
                    placeholder:'Country'
                },
                value:'',// display data in html tag
                validation:{
                    required:true
                },
                valid:false,
                touched:false
            },
            email:{
                elementType: 'input', // html tag name,
                elementConfig: { // arrtibutes of html tag
                    type:'email',
                    placeholder:'your E-Mail'
                },
                value:'',// display data in html tag
                validation:{
                    required:true
                },
                valid:false,
                touched:false
            },
            delveryMethod:{
                elementType: 'select', // html tag name,
                elementConfig: { // arrtibutes of html tag
                   options: [
                       {value:'fastest',displayValue:'Fastest'},
                       {value:'cheapest',displayValue:'Cheapest'}
                    ]
                },
                value:'cheapest',// this is a bug if we didn't change drop down box values. then empty value will be sent to server. we will this in next lectures.For now keep either "fastest" or "chepeast"
                validation:{}, // to handle the error when we change dropdown value. highly recomended solution
                valid:true
            }
        },
        formIsValid:false,
        Loading:false
    }

    orderHandler = (event) => {
        event.preventDefault(); // to prevent reloading the page.
        //console.log(this.props.ingredients);
        this.setState({Loading:true});
        const formData = {};
        for (let formElementIdentifier in this.state.orderForm){
            formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value
        }
        const order = {
            ingredients:this.props.ings,
            price:this.props.tot_price,
            orderData:formData
            
        }
        axios.post('/orders.json',order)
        .then(response => {
            console.log(response);
            this.setState({Loading:false});
            this.props.history.push('/');

        }).catch(error => {
            console.log(error);
            this.setState({Loading:false});
        })
    }

    checkValidity(value,rules) {
        let isValid = true;
        //console.log(value,rules);
        if(rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if(rules.minLength){
            isValid = value.length >= rules.minLength && isValid;
        }

        if(rules.maxLength){
            isValid = value.length <= rules.maxLength && isValid;
        }
        console.log(isValid);

        return isValid;
    }

    inputChangeHandler = (event,inputIdentifier) => {
        // cloning the orderform date but not cloning deeply because nested objects copied as pointers. if we change nested object it will change original state also,
        // so we have to clone deeply how?
        // we have to update the state immutably.
        const updatedOrderform = {
            ...this.state.orderForm
        };
        //const updatedFormElement = {...updatedOrderform[inputIdentifier] };
        updatedOrderform[inputIdentifier].value = event.target.value;
        updatedOrderform[inputIdentifier].valid = this.checkValidity(updatedOrderform[inputIdentifier].value,updatedOrderform[inputIdentifier].validation)
        updatedOrderform[inputIdentifier].touched = true;
        //updatedFormElement.value = event.target.value;

        //ContactData.jsupdatedOrderform[inputIdentifier] = updatedFormElement;

        // to check overall form data is valid or not
        let formIsValid = true;
        for (let inputIdentifier in updatedOrderform) {
            formIsValid = updatedOrderform[inputIdentifier].valid && formIsValid;
        }

        console.log("formIsValid",formIsValid);


        this.setState({orderForm:updatedOrderform,formIsValid:formIsValid});

    }
    render() {

        const formElementsArray = [];
            for (let key in this.state.orderForm){
                formElementsArray.push({
                    id:key,
                    config:this.state.orderForm[key]
                })
            }

        let form = (
            <form onSubmit={this.orderHandler}>            
                {formElementsArray.map(formElement => (
                    <Input key={formElement.id}
                            elementType={formElement.config.elementType}
                            elementConfig={formElement.config.elementConfig}
                            value={formElement.config.value}
                            invalid={!formElement.config.valid}
                            shouldValidate={formElement.config.validation}
                            touched={formElement.config.touched}
                            changed={(event) => this.inputChangeHandler(event,formElement.id)}/>
                ))}
                <Button btnType="Success" disabled={!this.state.formIsValid}>ORDER</Button>
            </form>);
        if(this.state.Loading){
            form = <Spinner />
        }

        

        return (          
            <div className={classes.ContactData}>
                <h4>Enter your Contact Data</h4>
                {form}
            </div>
        );
    }

}


const mapStateToProps = state => {
    return{
        ings:state.ingredients,
        tot_price:state.totalPrice
    }
}

export default connect(mapStateToProps)(ContactData);