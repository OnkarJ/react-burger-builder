import React, { Component } from "react";
import Aux from '../../hoc/AuxHOC';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

const INGREDIENT_PRICE = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
};

class BurgerBuilder extends Component {

    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        totalPrice: 4,
        purchasable: false,
        purchasing: false
    }

    updatePurchaseState(ingredients) {
        const sum = Object.keys(ingredients)
            .map(ingredientKey => {
                return ingredients[ingredientKey];
            })
            .reduce((sum, el) => {
                return sum + el;
            }, 0);
        
        this.setState({
            purchasable: sum > 0
        })
    }

    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredients = {...this.state.ingredients};
        updatedIngredients[type] = updatedCount;

        const priceAddition = INGREDIENT_PRICE[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;

        this.setState({
            totalPrice: newPrice,
            ingredients: updatedIngredients
        }, () => this.updatePurchaseState(updatedIngredients));
    }

    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];

        if(oldCount <= 0) {
            return;
        }
        const updatedCount = oldCount - 1;
        const updatedIngredients = {...this.state.ingredients};
        updatedIngredients[type] = updatedCount;

        const priceDeduction = INGREDIENT_PRICE[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceDeduction;

        this.setState({
            totalPrice: newPrice,
            ingredients: updatedIngredients
        }, () => this.updatePurchaseState(updatedIngredients));
    }

    purchasehandler = () => {
        this.setState({ purchasing: true });
    }

    purchaseCancelhandler = () => {
        this.setState({ purchasing: false });
    }

    purchaseContinuehandler = () => {
        alert('Order continued!');
    }

    render() {
        const disabledInfo = {
            ...this.state.ingredients
        };
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }
        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelhandler}>
                    <OrderSummary 
                        ingredients={this.state.ingredients}
                        purchaseContinued={this.purchaseContinuehandler}
                        purchaseCancelled={this.purchaseCancelhandler}
                        price={this.state.totalPrice}
                    />
                </Modal>
                <Burger ingredients={this.state.ingredients} />
                <BuildControls 
                    ingredientAdded={this.addIngredientHandler}
                    ingredientRemoved={this.removeIngredientHandler}
                    disabled={disabledInfo}
                    totalPrice={this.state.totalPrice}
                    purchasable={this.state.purchasable}
                    ordered={this.purchasehandler}
                />
            </Aux>
        );
    }
}

export default BurgerBuilder;