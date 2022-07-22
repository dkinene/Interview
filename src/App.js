import React, { Component } from 'react';
import { Routes, Route } from 'react-router';
import Home from './components/Home';
import AppContext from './context/AppContext';
import { fetchData } from './utils';
import { CATEGORIES_QUERY, PRODUCTS_QUERY } from './constants';
import './App.css';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            categories: [],
            products: [],
            currentCategory: null,
            currentCurrency: null,
        };
    }

    componentWillMount = () => {
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

    getProductPrice = (product) => {
        const { prices } = product;
        const { currentCurrency } = this.state;
        if (currentCurrency) {
            return '';
        }

        const firstPrice = prices.at(0);

        return `${firstPrice.currency.symbol}${firstPrice.amount}`;
    };

    handleCategoryChange = (category) => {
        this.fetchCategoryProducts(category);
    };

    render() {
        const { categories, products, currentCategory } = this.state;

        return (
            <AppContext.Provider
                value={{
                    categories,
                    products,
                    currentCategory,
                    getProductPrice: this.getProductPrice,
                    handleCategoryChange: this.handleCategoryChange,
                }}
            >
                <div className="App">
                    <Routes>
                        <Route index element={<Home />} />
                        {/* <Route path = "/" element={<CategoryList />}/>
            <Route path = "/:id" element={<Product/>}/> */}
                    </Routes>
                </div>
            </AppContext.Provider>
        );
    }
}

export default App;
