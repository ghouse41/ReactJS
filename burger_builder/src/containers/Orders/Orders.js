import React, { Component } from 'react';
import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import WithErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

class Orders extends Component {

    state ={
        orders: [],
        loading: true
    }

    componentDidMount() {
        axios.get('/orders.json')
            .then(response => {
                const fetchorders = [];
                for ( let key in response.data){
                    fetchorders.push({
                        ...response.data[key],
                        id:key
                    });
                }
                this.setState({loading:false,orders:fetchorders});
                console.log(response.data);
                console.log(fetchorders);
            })
            .catch(err => {
                this.setState({loading:false})
            })
    }


    render(){
        return(
            <div>
                {this.state.orders.map(order => (
                    <Order 
                    key={order.id}
                    ingredients={order.ingredients}
                    price={+order.price}/>
                ))}
            </div>
        );
    }
}

export default WithErrorHandler(Orders,axios);