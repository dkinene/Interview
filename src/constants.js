const CATEGORIES_QUERY = `
  query {
    categories {
      name
    }
  }
`;

const PRODUCTS_QUERY = `
  query getProducts($title: String!) {
    category(input:{title: $title}){
      products{
        id
        name
        inStock
        gallery
        description
        category
        prices {
          amount
          currency {
            label
            symbol
          }
        }
        brand
      }
    }
  }
`;

const CURRENCIES_QUERY = `
  query {
    currencies {
      label
      symbol
    }
  }
`;

export { CATEGORIES_QUERY, PRODUCTS_QUERY, CURRENCIES_QUERY };
