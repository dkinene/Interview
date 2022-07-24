import React, { Component } from 'react';
import { Routes, Route } from 'react-router';
import { fetchData } from './utils';
import { CATEGORIES_QUERY, CURRENCIES_QUERY, PRODUCTS_QUERY } from './constants';
import AppContext from './context/AppContext';
import Home from './components/Home';
import Cart from './components/Cart';
import './App.css';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            cart: [],
            products: [],
            currencies: [],
            categories: [],
            loading: true,
            currentCategory: null,
            currentCurrency: null,
        };
    }

    componentWillMount = () => {
        const currentCart = localStorage.getItem('cart');

        fetchData(CATEGORIES_QUERY)
            .then(({ data }) => {
                const categories = data.data.categories;
                const firstCategory = categories.at(0);
                if (firstCategory) {
                    this.fetchCategoryProducts(firstCategory.name);
                }

                this.setState({
                    categories,
                });

                fetchData(CURRENCIES_QUERY)
                    .then(({ data }) => {
                        const { data: currenciesData } = data
                        const { currencies } = currenciesData;

                        this.setState({
                            currencies,
                            cart: currentCart ? JSON.parse(currentCart): [],
                            loading: false,
                        })
                    })
                    .catch(console.error)
            })
            .catch(console.error);
    };

    fetchCategoryProducts = (category) => {
        fetchData(PRODUCTS_QUERY, { title: category }).then(
            ({ data: firstCategoryData }) => {
                const { category: productsCategory } = firstCategoryData.data;
                const { products } = productsCategory;

                this.setState({
                    products,
                    currentCategory: category,
                });
            }
        );
    };

    addToCart = (product) => {
        // if products exist in cart ignore, else add to cart
        const { cart } = this.state;
        const productInCart = cart.find((p) => p.id === product.id);
        if (productInCart) {
            return;
        }

        product.quantity = 1;

        cart.push(product);
        localStorage.setItem('cart', JSON.stringify(cart));
        this.setState({
            cart,
        });
    }

    getProductPrice = (product) => {
        const { prices } = product;
        const { currentCurrency } = this.state;
        let price = prices.at(0);
        if (currentCurrency) {
            price = prices.find((p) => p.currency.symbol === currentCurrency);
        }

        return `${price.currency.symbol}${price.amount}`;
    };

    handleCategoryChange = (category) => {
        this.fetchCategoryProducts(category);
    };

    handleCurrencyChange = (currency) => {
        this.setState({
            currentCurrency: currency,
        })
    }

    render() {
        const { cart, categories, products, currencies, loading, currentCategory } = this.state;

        if (loading) {
            return <div className='loading'>Loading...</div>;
        }

        return (
            <AppContext.Provider
                value={{
                    cart,
                    categories,
                    products,
                    currencies,
                    currentCategory,
                    addToCart: this.addToCart,
                    getProductPrice: this.getProductPrice,
                    handleCategoryChange: this.handleCategoryChange,
                    handleCurrencyChange: this.handleCurrencyChange,
                }}
            >
                <div className="App">
                    <Routes>
                        <Route exact path='/cart' element={<Cart />}/>
                        <Route path='/:category' element={<Home />} />
                        <Route index element={<Home />} />
                    </Routes>
                </div>
            </AppContext.Provider>
        );
    }
}

export default App;
