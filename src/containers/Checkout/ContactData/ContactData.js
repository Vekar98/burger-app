import React, { Component } from 'react';
import axios from '../../../axios-orders';

import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.module.css';
import Spinner from '../../../components/UI/Spinner/Spinner';

class ContactData extends Component {
 state = {
  name: '',
  email: '',
  address: {
   street: '',
   postalCode: ''
  },
  loading: false
 }

 orderHandler = (event) => {
  this.setState({ loading: true });
  const order = {
   ingredients: this.props.ingredients,
   price: this.props.price,
   customer: {
    name: 'Bartosz Olechnowicz',
    address: {
     street: 'Teststreet 215',
     zipcode: '54241',
     country: 'Poland'
    },
    email: 'test@test.com'
   },
   deliveryMethod: 'fastest'
  }
  axios.post('/orders.json', order)
   .then(response => {
    this.setState({ loading: false })
    this.props.history.push('/');
   })
   .catch(error => { this.setState({ loading: false }) })
 }


 render() {
  let form = (
   <form>
    <input className={classes.Input} type="text" name="name" placeholder="Your  Name" />
    <input className={classes.Input} type="text" name="email" placeholder="Your  Mail" />
    <input className={classes.Input} type="text" name="street" placeholder="Street" />
    <input className={classes.Input} type="text" name="postal" placeholder="Postal Code" />
   </form>);
  if (this.state.loading === true) {
   form = <Spinner />;
  }
  return (
   <div className={classes.ContactData}>
    <h4>Enter your Contact Data</h4>
    {form}
    <Button
     btnType="Success"
     clicked={this.orderHandler}
    >ORDER</Button>
   </div>
  );
 }
}

export default ContactData;
