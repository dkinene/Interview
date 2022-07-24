import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import AppContext from '../../context/AppContext';
import { capitalize } from '../../utils';
import CartIcon from '../CartIcon';
import './Header.css';

class Header extends Component {
    render() {
        return (
            <AppContext.Consumer>
                {(context) => (
                    <header>
                        <div className="left-navigation">
                            <ul>
                                {context.categories.map((category) => (
                                    <li key={category.name}>
                                        <Link to={`/${category.name}`}>
                                            {capitalize(category.name)}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="right-navigation">
                            <select
                                name="currencies"
                                id="currencies"
                                onChange={(e) => {
                                    context.handleCurrencyChange(
                                        e.target.value
                                    );
                                }}
                            >
                                {context.currencies.map((currency) => (
                                    <option
                                        key={currency.symbol}
                                        value={currency.symbol}
                                    >
                                        {currency.label}
                                    </option>
                                ))}
                            </select>

                            <div className="cart-container">
                                <Link to={'/cart'}>
                                    <CartIcon /> ({context.cart.length})
                                </Link>
                            </div>
                        </div>
                    </header>
                )}
            </AppContext.Consumer>
        );
    }
}

export default Header;
