import React, { Component } from 'react';
import AppContext from '../../context/AppContext';
import Container from '../Container';
import Header from '../Header';
import './Cart.css';

class Cart extends Component {
    render() {
        return (
            <AppContext.Consumer>
                {(context) => (
                    <>
                        <Header />

                        <Container>
                            <h1>My bag: {context.cart.length} {context.cart.length === 1 ? 'Item' : 'Items'}</h1>
                            <ul className='cart-items'>
                                {context.cart.map((product) => (
                                    <li key={product.id}>
                                        {product.name}
                                    </li>
                                ))}
                            </ul>
                        </Container>
                    </>
                )}
            </AppContext.Consumer>
        );
    }
}

export default Cart;
