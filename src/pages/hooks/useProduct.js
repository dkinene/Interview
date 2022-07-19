
import { gql, useQuery} from "@apollo/client"

const GET_PRODUCT = gql`
query GetProduct($input:String!){
  category(input:{title:$input})
  {
    products{
      gallery
      id
      name
       
    }
  }
}
`

export const useProduct = (input)=>{
  const{error, loading, data } = useQuery(GET_PRODUCT, {
    variables:{
        input
    }
  })
  return {
    error, 
    loading,
     data

  }
}