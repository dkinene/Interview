import React from 'react'

import "./CategoryList.css"
import { useCategories } from './hooks/useCategories'


export default function CategoryList() {

    const {error, loading, data} = useCategories();

  if(loading) return <div>Loading .....</div>

  if(error) return <div>Something went wrong.....</div>

  return <div className = "CategoryList">
    {data.categories.map(category =>{
      return <div>
        <h2>{category.name}</h2>
      </div>
    })}
  </div>
  
}
