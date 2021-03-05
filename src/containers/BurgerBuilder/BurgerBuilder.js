import React, { Component } from 'react';
import Auxiliary from '../../hoc/Auxiliary/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

const INGREDIENTS_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7
};

class BurgerBuilder extends Component {
  // constructor(props) {
  //  super(props);
  //  this.state = {...}
  // }

  state = {
    ingredients: null,
    totalPrice: 4,
    purchasable: false,
    purchasing: false,
    loading: false,
    error: false
  }

  componentDidMount() {
    axios.get('https://vekar-react-burger-app-default-rtdb.firebaseio.com/ingredients.json')
      .then(response => {
        this.setState({ ingredients: response.data });
      }).catch(error => {
        this.setState({ error: true })
      });
  }


  updatePurchaseState(ingredients) {
    const sum = Object.values(ingredients).reduce((sum, el) => sum + el, 0);
    this.setState({ purchasable: sum > 0 });
  }

  addIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    const updateCount = oldCount + 1;
    const updatedIngredients = {
      ...this.state.ingredients
    };
    updatedIngredients[type] = updateCount;
    const priceAddition = INGREDIENTS_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice + priceAddition;
    this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
    this.updatePurchaseState(updatedIngredients);
  }

  removeIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    if (oldCount <= 0) {
      return;
    } else {
      const updateCount = oldCount - 1;
      const updatedIngredients = {
        ...this.state.ingredients
      };
      updatedIngredients[type] = updateCount;
      const priceDeduction = INGREDIENTS_PRICES[type];
      const oldPrice = this.state.totalPrice;
      const newPrice = oldPrice - priceDeduction;
      this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
      this.updatePurchaseState(updatedIngredients);
    }
  }

  purchaseHandler = () => {
    this.setState({ purchasing: true });
  }

  purchaseCandelHandler = () => {
    this.setState({ purchasing: false });
  }

  purchaseContinueHandler = () => {
    // alert('You Continue');
    //   this.setState({ loading: true });
    //   const order = {
    //     ingredients: this.state.ingredients,
    //     price: this.state.totalPrice,
    //     customer: {
    //       name: 'Bartosz Olechnowicz',
    //       address: {
    //         street: 'Teststreet 215',
    //         zipcode: '54241',
    //         country: 'Poland'
    //       },
    //       email: 'test@test.com'
    //     },
    //     deliveryMethod: 'fastest'
    //   }
    //   axios.post('/orders.json', order)
    //     .then(response => { this.setState({ loading: false, purchasing: false }) })
    //     .catch(error => { this.setState({ loading: false, purchasing: false }) })
    // }
    this.props.history.push('/checkout');
  }

  render() {
    const disableInfo = {
      ...this.state.ingredients
    };
    for (let key in disableInfo) {
      disableInfo[key] = disableInfo[key] <= 0
      // disabledInfo = np {salad: true, meat: false.....}
    }
    let orderSummary = null;

    let burger = this.state.error ? <p style={{ textAlign: 'center' }}>Ingredients can't be loaded!</p> : <Spinner />;

    if (this.state.ingredients) {
      burger = (
        <Auxiliary>
          <Burger ingredients={this.state.ingredients} />
          <BuildControls
            ordered={this.purchaseHandler}
            ingredientAdded={this.addIngredientHandler}
            ingredientRemoved={this.removeIngredientHandler}
            disabled={disableInfo}
            purchasable={this.state.purchasable}
            price={this.state.totalPrice} />
        </Auxiliary>
      );
      orderSummary = <OrderSummary
        ingredients={this.state.ingredients}
        price={this.state.totalPrice}
        purchaseCancelled={this.purchaseCandelHandler}
        purchaseContinued={this.purchaseContinueHandler} />
    }
    if (this.state.loading) {
      orderSummary = <Spinner />;
    }

    return (
      <Auxiliary>
        <Modal show={this.state.purchasing} modalClosed={this.purchaseCandelHandler}>
          {orderSummary}
        </Modal>
        {burger}
      </Auxiliary>
    );
  }
}

export default withErrorHandler(BurgerBuilder, axios);