import React, { Component } from 'react';
import AppContext from '../../context/AppContext';
import './Home.css';

class Home extends Component {
    render() {
        return (
            <AppContext.Consumer>
                {(context) => (
                    <>
                        <header>
                            <div className="left-navigation">
                                <ul>
                                    {context.categories.map((category) => (
                                        <li key={category.name}>
                                            <a
                                                href={`/#${category.name}`}
                                                data-category={category.name}
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    context.handleCategoryChange(
                                                        e.target.getAttribute(
                                                            'data-category'
                                                        )
                                                    );
                                                }}
                                            >
                                                {category.name}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="right-navigation"></div>
                        </header>

                        <div className="container">
                            {context.currentCategory && (
                                <h1>
                                    {context.currentCategory} {context.name}
                                </h1>
                            )}
                            <div className="products">
                                {context.products.map((product) => (
                                    <div key={product.id} className="product">
                                        <img
                                            className="product-image"
                                            src={product.gallery?.at(0)}
                                            alt={product.name}
                                        />
                                        <p className="product-name">
                                            {product.name}
                                        </p>
                                        <p className="product-price">
                                            {context.getProductPrice(product)}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </>
                )}
            </AppContext.Consumer>
        );
    }
}

Home.contextType = AppContext;

export default Home;
