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
        prices {
          amount
          currency {
            label
            symbol
          }
        }
        gallery
      }
    }
  }
`;

export { CATEGORIES_QUERY, PRODUCTS_QUERY };