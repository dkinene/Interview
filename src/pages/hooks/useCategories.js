
import {useQuery, gql } from "@apollo/client"

const GET_CATEGORY = gql`
query {
  categories{
    name
    products{
      id
      name
      gallery
      brand
    }
  }
}
`
export const useCategories = ()=>{
  const {error, loading, data} = useQuery(GET_CATEGORY);

  return {
    error,
    loading,
     data

  }

}