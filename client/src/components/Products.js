import React from 'react'
import { useParams } from 'react-router-dom'

const Products = () => {
    const params = useParams()

  return (
    <div>
      <h1>Hello {params.id}</h1>
    </div>
  )
}

export default Products
