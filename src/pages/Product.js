import React from 'react'
import { useProduct } from './hooks/useProduct'
import "../pages/Product.css"

export default function Product() {

  const {error, loading, data} = useProduct("all");

  console.log({
    error, loading, data
  })

  if(error) return <div>Something is not right ....</div>
  if(loading) return <div>Loading ....</div>

  return <div className = "CategoryList">
  {data.category.map(categories =>{
    return <div>
      <h2>{categories.name}</h2>
    </div>
  })}
</div>
}
