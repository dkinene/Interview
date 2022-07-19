import React, { Component } from 'react';
import { CATEGORIES_QUERY, PRODUCTS_QUERY } from '../../constants';
import { fetchData } from '../../utils';
import './Home.css';

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = { categories: [], products: [], currentCategory: null}
  }

  componentWillMount = () => {
    fetchData(CATEGORIES_QUERY)
      .then(({ data }) => {
        const categories = data.data.categories;
        const [firstCategory] = categories;
        if (firstCategory) {
          this.fetchCategoryProducts(firstCategory.name);
        }

        this.setState({ 
          categories,
        })
      })
      .catch(console.error);
  }

  fetchCategoryProducts = (category) => {
    console.log(category)
    fetchData(PRODUCTS_QUERY, { title: category })
      .then(({ data: firstCategoryData }) => {
        const { category: productsCategory } = firstCategoryData.data;
        const { products } = productsCategory;

        this.setState({ 
          products,
          currentCategory: category,
        })
      })
  }

  handleCategoryChange = (event) => {
    event.preventDefault();

    const { target: link } = event;
    // const category = link.getAttribute('data-category');

    this.fetchCategoryProducts(link.getAttribute('data-category'))
  }

  getProductPrice = (product) => {
    const { prices } = product;
    const { defaultCurrency } = this.state;

    if (defaultCurrency) {
      return '';
    }

    const [firstPrice] = prices;

    return `${firstPrice.currency.symbol}${firstPrice.amount}`;
  }

  render() {
    const { categories, products, currentCategory } = this.state;

    return (
      <>
        <header>
          <div className="left-navigation">
            <ul>
              {categories.map((category) => (
                <li key={category.name}>
                  <a href={`/#${category.name}`} data-category={category.name} onClick={this.handleCategoryChange}>
                    {category.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="right-navigation"></div>
        </header>

        <div className="container">
          {currentCategory && <h1>{currentCategory}</h1>}
          <div className="products">
            {products.map((product) => (
              <div key={product.id} className="product">
                <img className="product-image" src={product.gallery?.at(0)} alt={product.name} />
                <p className="product-name">{product.name}</p>
                <p className="product-price">{this.getProductPrice(product)}</p>
              </div>
            ))}
          </div>
        </div>
      </>
    )
  }
}
